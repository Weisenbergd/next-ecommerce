"use server";
import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { addGroupSchema } from "../_zodSchemas";
import { transformFormValues } from "../_transformFormValues";

export async function addGroup(prevState: any, formData: FormData) {
  const formValues = transformFormValues(formData);

  const result = addGroupSchema.safeParse(formValues);

  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);

  const { productId, colorId } = result.data;

  try {
    const newGroup = await prisma.variantGroup.create({
      data: {
        product: {
          connect: { id: productId },
        },
        color: {
          connect: { id: colorId },
        },
      },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: [`group ${newGroup.id} created`, newGroup.id],
    };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    } else return { status: "failure", message: ["something went wrong"] };
  }
}
