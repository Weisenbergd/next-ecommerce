"use server";

import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "./_errorHandler";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const sizeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Color Name is required" }),
});

export async function addSize(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = sizeSchema.safeParse(formValues);

  if (!result.success) return schemaCheck(result);

  const { name } = result.data;

  try {
    const newColor = await prisma.size.create({
      data: {
        name: name,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Added Size ${name}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}

export async function deleteSize(id: number) {
  try {
    const dbItem = await prisma.size.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Deleted Size ${id}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}

export async function editSize(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());
  const result = sizeSchema.safeParse(formValues);
  if (!result.success) return schemaCheck(result);
  const { name, id } = result.data;
  if (!id) return schemaCheck(result);
  try {
    const updateSize = await prisma.size.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    revalidatePath("/");
    return { status: "success", message: [`Updated Size ${name}`] };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return errorHandler(error);
    }
    return { status: "error", message: ["not Prisma error"] };
  }
}
