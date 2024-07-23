"use server";

import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "./_errorHandler";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const variant = z.object({
  id: z.string().optional(),
  productId: z.string().min(1, { message: "Product Name is required" }),
  price: z.string().min(1, { message: "Price must be greater than 0" }),
  stock: z.string().min(1, { message: "must have an initial stock" }),
  colorId: z.string().min(1, { message: "color required" }),
  sizeId: z.string().min(1, { message: "size required" }),
  detailedColor: z.string(),
});

export async function addVariant(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = variant.safeParse(formValues);

  console.log("0-------------", formValues);
  if (!result.success) return schemaCheck(result.error);

  const { productId, price, stock, colorId, sizeId, detailedColor } =
    result.data;

  try {
    await prisma.variant.create({
      data: {
        productId: parseInt(productId),
        price: parseInt(price),
        stock: parseInt(stock),
        colorId: parseInt(colorId),
        sizeId: parseInt(sizeId),
        detailedColor,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Added Product ${name}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}
