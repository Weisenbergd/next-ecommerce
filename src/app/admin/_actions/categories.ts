"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { z } from "zod";
import { errorHandler, schemaCheck } from "./_errorHandler";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Category Name is required" }),
  description: z
    .string()
    .min(1, { message: "Category Description is required" }),
});

export async function addCategories(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = categorySchema.safeParse(formValues);

  if (!result.success) return schemaCheck(result);

  const { name, description } = result.data;

  try {
    await prisma.category.create({
      data: {
        name: name,
        description: description,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Added category ${name}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}

export async function deleteCategories(id: number) {
  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Deleted category ${id}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}

export async function editCategories(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = categorySchema.safeParse(formValues);
  if (!result.success) return schemaCheck(result);
  const { name, description, id } = result.data;
  if (!id) return schemaCheck(result);
  try {
    await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Updated Category ${name}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}
