"use server";
import prisma from "@/lib/prisma";
import { addImageSchema } from "../_zodSchemas";
import { deleteFireBase, postFireBase } from "../_postFireBase";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errorHandler, schemaCheck } from "../_errorHandler";

export async function addImages(prevState: any, formData: FormData) {
  const files = formData.getAll("images") as File[];

  if (!files || files.length === 0) {
    return { status: "error", message: ["no image files uploaded"] };
  }
  const dataObject = {
    productId: formData.get("productId"),
    groupId: formData.get("groupId"),
    isVariant: formData.get("isVariant"),
    images: files,
  };

  const result = addImageSchema.safeParse(dataObject);

  if (!result.success) return schemaCheck(result.error);

  const { productId, groupId, images } = result.data;

  const urlArray: {
    status: string;
    url: string;
  }[] = [];

  for (const image of images) {
    const url = await postFireBase(image);
    url && urlArray.push(url);
  }

  try {
    const transaction = await prisma.$transaction(async (prisma) => {
      const createPromises = urlArray
        .filter((image) => image.status === "success")
        .map((image) => {
          return prisma.image.create({
            data: {
              url: image.url,
              variantGroupId: result.data.groupId,
              productId: result.data.productId,
            },
          });
        });
      await Promise.all(createPromises);
    });
    revalidatePath("/");
    return { status: "success", message: ["images created in db and cloud"] };
  } catch (error) {
    for (let image of urlArray) {
      try {
        await deleteFireBase(image.url);
      } catch (error: unknown) {
        for (const image of urlArray) {
          image.url && (await deleteFireBase(image.url));
        }
        if (error instanceof PrismaClientKnownRequestError) {
          return errorHandler(error);
        } else return { status: "failure", message: ["something went wrong"] };
      }
    }
  }
}
