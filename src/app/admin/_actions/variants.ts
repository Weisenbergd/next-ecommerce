"use server";

import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "./_errorHandler";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const variantSchema = z.object({
  id: z.string().optional(),
  productId: z.string().min(1, { message: "Product Name is required" }),
  price: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0.01, { message: "price must be at least 0.01" })
  ),
  stock: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0, { message: "stock can't be less than 0" })
  ),
  colorId: z.string().min(1, { message: "color required" }),
  sizeId: z.string().min(1, { message: "size required" }),
  // detailedColor: z.string(),
});

export async function addVariant(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());

  const result = variantSchema.safeParse(formValues);

  if (!result.success) return schemaCheck(result.error);

  const { productId, price, stock, colorId, sizeId } = result.data;

  try {
    await prisma.variant.create({
      data: {
        productId: parseInt(productId),
        price: price,
        stock: stock,
        colorId: parseInt(colorId),
        sizeId: parseInt(sizeId),
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Added Variant ${productId}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    console.log(error);
    return { status: "error", message: ["not Prisma error"] };
  }
}

export async function deleteVariant(id: number) {
  try {
    await prisma.variant.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Deleted Variant ${id}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}

export async function editVariant(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = variantSchema.safeParse(formValues);
  console.log(result);
  if (!result.success) return schemaCheck(result.error);
  const { id, productId, price, stock, colorId, sizeId } = result.data;

  if (!id) return schemaCheck(result.error);
  try {
    console.log("test");
    await prisma.variant.update({
      where: {
        id: parseInt(id),
      },
      data: {
        productId: parseInt(productId),
        price,
        stock,
        colorId: parseInt(colorId),
        sizeId: parseInt(sizeId),
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Updated Variant ${id}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    console.log(error);
    return { status: "programming error", message: ["check server logs"] };
  }
}
