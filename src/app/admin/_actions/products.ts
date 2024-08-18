"use server";

import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "./_errorHandler";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { postFireBase } from "./_postFireBase";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Product Name is required" }),
  description: z.string().min(1, { message: "description required" }),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  basePrice: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0.01, { message: "price must be at least 0.01" })
  ),
  categoryId: z.string().min(1, { message: "categoryId required" }),
});

export async function addProduct(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());

  const result = productSchema.safeParse(formValues);

  if (!result.success) return schemaCheck(result.error);

  const { name, description, image, basePrice, categoryId } = result.data;

  const fbResult = await postFireBase(image);
  if (fbResult!.error != null)
    return { satus: "error", message: [fbResult?.error] };
  if (fbResult!.url == null)
    return { status: "error", message: ["something went wrong saving pic"] };

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        basePrice,
        image: fbResult!.url,
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
        basePrice,
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
