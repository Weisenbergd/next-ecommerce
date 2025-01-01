"use server";
import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { deleteFireBase, postFireBase } from "../_postFireBase";
import { transformData } from "../_transformData";
import { productSchema } from "../_zodSchemas";
import { transformFormValues } from "../_transformFormValues";

export async function addProduct(prevState: any, formData: FormData) {
  const formValues = transformFormValues(formData);
  const transformedData = transformData(formValues);

  if (!transformedData)
    return {
      status: "error",
      message: ["programming error, no transformedData"],
    };

  const result = productSchema.safeParse(transformedData);

  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);

  // array to keep track of urls that get uploaded
  const postedImages: { name: number; url: string | null }[] = [];
  // post productImages to db
  // if (transformedData.images) {
  //   for (const image of transformedData.images) {
  //     const url = await postFireBase(image);
  //     if (url && url.url) postedImages.push({ name: -1, url: url.url });
  //   }
  // }
  // post groupImages to db
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

  const { name, description, categoryId, variantGroups } = result.data;

  let productId: number;

  // prisma transaction
  try {
    const status = await prisma.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          categoryId: parseInt(categoryId),
        },
      });
      productId = product.id;
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
              productId: productId,
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
