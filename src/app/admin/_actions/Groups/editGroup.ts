"use server";
import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { deleteFireBase, postFireBase } from "../_postFireBase";
import { transformData } from "../_transformData";
import {
  editGroupSchema,
  editProductSchema,
  productSchema,
} from "../_zodSchemas";
import { transformFormValues } from "../_transformFormValues";

export async function editGroup(prevState: any, formData: FormData) {
  const formValues = transformFormValues(formData);
  // const transformedData = transformData(formValues);
  // if (!transformedData)
  //   return {
  //     status: "error",
  //     message: ["programming error, no transformedData"],
  //   };

  const result = editGroupSchema.safeParse(formValues);

  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);

  const { colorId, variantGroupId } = result.data;

  try {
    await prisma.variantGroup.update({
      where: {
        id: variantGroupId,
      },
      data: {
        colorId,
      },
    });
    revalidatePath("/");
    return { status: "success", message: ["group was updated"] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    } else return { status: "failure", message: ["something went wrong"] };
  }
}
