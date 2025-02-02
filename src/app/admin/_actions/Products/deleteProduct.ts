"use server";
import prisma from "@/lib/prisma";
import { deleteFireBase } from "../_postFireBase";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { deleteProductSchema } from "../_zodSchemas";

export async function deleteProduct(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = deleteProductSchema.safeParse(formValues);
  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);
  const { productId } = result.data;

  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
      include: {
        variantGroups: {
          include: {
            images: true,
          },
        },
      },
    });

    // console.log(product?.variantGroups);
    if (!product) return;

    const arrayOfAllImages = [];

    for (const variantGroup of product?.variantGroups) {
      for (const imageArray of variantGroup.images) {
        arrayOfAllImages.push(imageArray.url);
      }
    }

    const deleteImagesError = [];
    for (const image of arrayOfAllImages) {
      try {
        await deleteFireBase(image);
      } catch (err) {
        deleteImagesError.push(err);
      }
    }
    if (deleteImagesError.length > 0)
      return {
        status: "success",
        message: [
          `Deleted Product ${productId}; couldn't delete pictures from db`,
          productId,
          deleteImagesError,
        ],
      };
    revalidatePath("/");
    return {
      status: "success",
      message: [`Deleted Product ${productId}`, productId],
    };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}
