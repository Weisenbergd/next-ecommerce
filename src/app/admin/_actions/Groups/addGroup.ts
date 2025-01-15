"use server";
import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { addGroupSchema } from "../_zodSchemas";
import { transformFormValues } from "../_transformFormValues";
import { transformData } from "../_transformData";
import { deleteFireBase, postFireBase } from "../_postFireBase";

export async function addGroup(prevState: any, formData: FormData) {
  const formValues = transformFormValues(formData, "group");
  const transformedData = transformData(formValues, "group");

  if (!transformedData)
    return {
      status: "error",
      message: ["programming error, no transformedData"],
    };

  const result = addGroupSchema.safeParse(transformedData);

  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);

  // array to keep track of urls that get uploaded
  const postedImages: { name: number; url: string | null }[] = [];
  let i = -1;
  for (const variant of transformedData.variantGroups) {
    i++;
    if (variant.images) {
      for (const image of variant.images) {
        const url = await postFireBase(image);
        if (url && url.url) postedImages.push({ name: i, url: url.url });
      }
    } else postedImages.push({ name: i, url: null });
  }

  const { variantGroups, productId } = result.data;

  try {
    const status = await prisma.$transaction(async (prisma) => {
      // Create each variantGroup individually to get their IDs

      for (const variantGroup of variantGroups) {
        const dbVarGroup = await prisma.variantGroup.create({
          data: {
            productId,
            colorId: parseInt(variantGroup.colorId),
          },
        });
        for (const image of postedImages) {
          if (
            image.name === variantGroups.indexOf(variantGroup) &&
            image.url != null
          ) {
            await prisma.image.create({
              data: {
                url: image.url,
                productId,
                variantGroupId: dbVarGroup.id,
              },
            });
          }
        }
        for (const variant of variantGroup.variants) {
          const dbVariant = await prisma.variant.create({
            data: {
              price: variant.price,
              stock: variant.inventory,
              sizeId: parseInt(variant.sizeId),
              variantGroupId: dbVarGroup.id,
            },
          });
        }
      }
      revalidatePath("/");
      return {
        status: "success",
        message: ["product and variants created", productId],
      };
    });
    revalidatePath("/");
    return status;
  } catch (error: unknown) {
    for (const image of postedImages) {
      image.url && (await deleteFireBase(image.url));
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    } else return { status: "failure", message: ["something went wrong"] };
  }
}
