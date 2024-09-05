"use server";

import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "./_errorHandler";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { deleteFireBase, postFireBase } from "./_postFireBase";
import { getVariants } from "../_fetches/products";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const productSchema = z.object({
  variant: z.preprocess((a) => parseInt(a as string), z.number().gte(0).lte(1)),
  id: z.string().optional(),
  variantId: z.string().optional(),
  name: z.string().min(1, { message: "Product Name is required" }),
  description: z.string().min(1, { message: "description required" }),
  image: z

    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
  basePrice: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0.01, { message: "price must be at least 0.01" })
  ),
  categoryId: z.string().min(1, { message: "categoryId required" }),
  stock: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0, { message: "Stock must be at least 0" })
  ),
  price: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0.01, { message: "price must be at least 0.01" })
  ),
  colorId: z.string().min(1, { message: "colorId required" }),
  sizeId: z.string().min(1, { message: "sizeId required" }),
});

const productWithVariantsSchema = z.object({
  variant: z.preprocess((a) => parseInt(a as string), z.number().gte(0).lte(1)),
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

  let result;
  if (formValues.variant === "0") result = productSchema.safeParse(formValues);
  if (formValues.variant === "1") result = productSchema.safeParse(formValues);

  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);
  let productId;

  if (result.data.variant == 0) {
    const {
      name,
      description,
      image,
      basePrice,
      categoryId,
      stock,
      price,
      colorId,
      sizeId,
      variant,
    } = result.data;

    const fbResult = await postFireBase(image);
    if (fbResult!.error != null)
      return { status: "error", message: [fbResult!.error] };
    if (fbResult!.url == null)
      return { status: "error", message: ["something went wrong saving pic"] };

    try {
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          basePrice,
          categoryId: parseInt(categoryId),
          hasVariants: false,
        },
      });
      productId = newProduct.id;

      await prisma.image.create({
        data: {
          url: fbResult!.url,
          isUsed: true,
          productId,
        },
      });
      await prisma.variant.create({
        data: {
          productId,
          price: price,
          stock: stock,
          colorId: parseInt(colorId),
          sizeId: parseInt(sizeId),
        },
      });
    } catch (error: unknown) {
      fbResult && deleteFireBase(fbResult.url);
      if (error instanceof PrismaClientKnownRequestError) {
        return errorHandler(error);
      }
    }
  }
  revalidatePath("/");
  return {
    status: "success",
    message: [`Added New Product!`, productId],
  };
}

export async function deleteProduct(id: number) {
  try {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
      include: {
        image: true,
      },
    });

    for (let x of product.image) {
      deleteFireBase(x.url);
    }

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
  let result;
  if (formValues.variant === "0") result = productSchema.safeParse(formValues);
  if (formValues.variant === "1") result = productSchema.safeParse(formValues);

  if (!result)
    return {
      status: "error",
      message: ["programming error, no schema result"],
    };
  if (!result.success) return schemaCheck(result.error);

  if (result.data.variant == 0) {
    const {
      id,
      variantId,
      name,
      description,
      basePrice,
      categoryId,
      stock,
      price,
      colorId,
      sizeId,
    } = result.data;

    if (!id || !variantId)
      return { status: "error", message: ["programming error no product id"] };

    try {
      const product = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          description,
          basePrice,
          categoryId: parseInt(categoryId),
        },
      });

      const SingleVariant = await prisma.variant.update({
        where: {
          id: parseInt(variantId),
        },
        data: {
          stock,
          price,
          colorId: parseInt(colorId),
          sizeId: parseInt(sizeId),
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
  } else if (result.data.variant === 1) {
    return { status: "error", message: ["do thing"] };
  }
  return { status: "error", message: ["do thing"] };
}
