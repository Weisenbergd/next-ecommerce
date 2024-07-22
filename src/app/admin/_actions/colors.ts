"use server";
import { z } from "zod";
import { errorHandler, schemaCheck } from "./_errorHandler";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const colorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Color Name is required" }),
});

export async function addColor(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = colorSchema.safeParse(formValues);

  if (!result.success) return schemaCheck();

  const { name } = result.data;

  try {
    const newColor = await prisma.color.create({
      data: {
        name: name,
      },
    });
    revalidatePath("/");
    return { status: "success", message: `Added color ${name}` };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: "not Prisma error" };
  }
}

export async function deleteColor(id: number) {
  try {
    const dbItem = await prisma.color.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
    return { status: "success", message: `Deleted color ${id}` };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: "not Prisma error" };
  }
}

export async function editColor(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = colorSchema.safeParse(formValues);
  if (!result.success) return schemaCheck();
  const { name, id } = result.data;
  if (!id) return schemaCheck();
  try {
    const updateCategory = await prisma.color.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    revalidatePath("/");
    return { status: "success", message: `Updated Color ${name}` };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: "not Prisma error" };
  }
}
