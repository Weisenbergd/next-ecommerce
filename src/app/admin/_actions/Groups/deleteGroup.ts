"use server";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { deleteGroupSchema } from "../_zodSchemas";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { deleteFireBase } from "../_postFireBase";

export async function deleteGroup(prevState: any, formData: FormData) {
  // status complete -- not deeply tested -- deletes and deletes the fb images under normal circumstances

  const formValues = Object.fromEntries(formData.entries());

  const result = deleteGroupSchema.safeParse(formValues);
  if (!result.success) return schemaCheck(result.error);
  const { variantGroupId } = result.data;

  const product = await prisma.product.findFirst({
    where: {
      variantGroups: {
        some: { id: variantGroupId },
      },
    },
    include: {
      variantGroups: true,
    },
  });
  if (product && product.variantGroups.length <= 1) {
    console.log("can't delete sole group");
    return {
      status: "failure",
      message: [
        `product ${product.id} must contain at least one variant group and variant`,
      ],
    };
  }

  try {
    let imageError = "";
    const variantGroup = await prisma.variantGroup.delete({
      where: {
        id: variantGroupId,
      },
      include: {
        images: true,
      },
    });

    try {
      for (const image of variantGroup.images) {
        await deleteFireBase(image.url);
      }
    } catch (err) {
      return (imageError = "problem deleting images from cloud");
    }
    revalidatePath("/");
    return {
      status: "success",
      message: [
        `group ${variantGroupId} deleted`,
        imageError.length > 0 ? imageError : null,
      ],
    };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    } else return { status: "failure", message: ["something went wrong"] };
  }
}
