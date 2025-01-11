"use server";
import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { addVariantSchema } from "../_zodSchemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { transformFormValues } from "../_transformFormValues";
import { transformData } from "../_transformData";

export async function addVariant(prevState: any, formData: FormData) {
  const formValues = transformFormValues(formData, "variant");
  const transformedData = transformData(formValues, "variant");

  const result = addVariantSchema.safeParse(transformedData);

  if (!result.success) return schemaCheck(result.error);
  const { groupId, variants } = result.data;

  // dont delete if last one

  try {
    for (const variant of variants) {
      const dbVariant = await prisma.variant.create({
        data: {
          price: variant.price,
          stock: variant.inventory,
          sizeId: parseInt(variant.sizeId),
          variantGroupId: groupId,
        },
      });
      revalidatePath("/");
      return { status: "success", message: [`variants created`] };
    }
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    } else return { status: "failure", message: ["something went wrong"] };
  }
}
