"use server";
import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { deleteVariantSchema } from "../_zodSchemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export async function deleteVariant(prevState: any, formData: FormData) {
  // status: compelete

  const formValues = Object.fromEntries(formData.entries());
  const result = deleteVariantSchema.safeParse(formValues);

  if (!result.success) return schemaCheck(result.error);
  const { variantId } = result.data;

  // dont delete if last one
  const variantGroup = await prisma.variantGroup.findFirst({
    where: {
      variants: {
        some: { id: variantId },
      },
    },
    include: {
      variants: true,
    },
  });
  if (variantGroup && variantGroup.variants.length <= 1) {
    console.log("can't delete sole variant");
    return {
      status: "failure",
      message: [
        `variant Group ${variantGroup.id} must contain at least one variant`,
      ],
    };
  }

  try {
    await prisma.variant.delete({
      where: {
        id: variantId,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`variant ${variantId} deleted`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    } else return { status: "failure", message: ["something went wrong"] };
  }
}
