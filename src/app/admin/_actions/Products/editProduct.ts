"use server";
import { errorHandler, schemaCheck } from "../_errorHandler";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { transformFormValues } from "../_transformFormValues";
import { transformData } from "../_transformData copy";
import { editProductSchema } from "../_zodSchemas";

export async function editProduct(prevState: any, formData: FormData) {
  const formValues = transformFormValues(formData);
  const transformedData = transformData(formValues);
  if (!transformedData)
    return {
      status: "error",
      message: ["programming error, no transformedData"],
    };

  const result = editProductSchema.safeParse(transformedData);

  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);
  const { productId, name, description, categoryId } = result.data;

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        categoryId,
      },
    });
    revalidatePath("/");
    return { status: "success", message: ["product was updated"] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    } else return { status: "failure", message: ["something went wrong"] };
  }
}
