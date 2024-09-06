"use server";
import prisma from "@/lib/prisma";
import { deleteFireBase } from "./_postFireBase";
import { z } from "zod";
import { schemaCheck } from "./_errorHandler";
import { revalidatePath } from "next/cache";

export async function getAllImages() {
  const images = await prisma.image.findMany({});
  return images;
}

export async function getProductImages(id: number | string) {
  let formatId;
  if (typeof id === "string") {
    formatId = parseInt(id);
  } else formatId = id;

  const images = await prisma.image.findMany({
    where: {
      productId: formatId,
    },
  });

  return images;
}

const productSchema = z.object({
  images: z.string(),
  productId: z.string(),
});

export async function deleteImages(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData.entries());

  const jsonImages = formValues.images;

  interface Image {
    id: string;
    url: string;
  }

  const images: Image[] = JSON.parse(jsonImages.toString());

  const result = productSchema.safeParse(formValues);
  if (!result.success) return schemaCheck(result.error);

  const productId = formValues.productId.toString();

  let transactionArray = [];

  for (let image of images) {
    transactionArray.push(
      prisma.image.delete({
        where: {
          id: parseInt(image.id),
        },
      })
    );
  }
  await prisma.$transaction(transactionArray);
  revalidatePath("/");

  for (let image of images) {
    try {
      await deleteFireBase(image.url);
    } catch (error) {
      revalidatePath("/");
      return { status: "error", message: ["problem deleting from cloud"] };
    }
  }

  revalidatePath("/");
  return { status: "success", message: ["images deleted in db and cloud"] };
}
