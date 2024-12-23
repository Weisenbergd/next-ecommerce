"use server";
import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { editVariantSchema } from "../_zodSchemas";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function editVariant(prevState: any, formData: FormData) {
  // status: complete
  const formValues = Object.fromEntries(formData.entries());

  const result = editVariantSchema.safeParse(formValues);

  if (!result.success) return schemaCheck(result.error);
  const { variantId, sizeId, price, stock } = result.data;
  if (!variantId) return schemaCheck(result.error);
  try {
    await prisma.variant.update({
      where: {
        id: variantId,
      },
      data: {
        sizeId: sizeId,
        price,
        stock,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Updated Variant ${variantId}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    console.log(error);
    return { status: "programming error", message: ["check server logs"] };
  }
}
