"use server";

import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "./_errorHandler";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(0.01, { message: "Product Name is required" }),
  description: z.string().min(1, { message: "description required" }),
  image: z.string(),
  basePrice: z.string().min(1, { message: "Price must be greater than 0" }),
  categoryId: z.string().min(1, { message: "categoryId required" }),
});

export async function addProduct(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = productSchema.safeParse(formValues);

  if (!result.success) return schemaCheck(result.error);

  const { name, description, image, basePrice, categoryId } = result.data;

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        basePrice: parseInt(basePrice),
        image,
        categoryId: parseInt(categoryId),
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

export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Deleted Product ${id}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}

export async function editProduct(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = productSchema.safeParse(formValues);
  if (!result.success) return schemaCheck(result.error);
  const { name, id, description, image, basePrice, categoryId } = result.data;
  if (!id) return schemaCheck(result.error);
  try {
    await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        image,
        basePrice: parseInt(basePrice),
        categoryId: parseInt(categoryId),
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Updated Product ${name}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}
