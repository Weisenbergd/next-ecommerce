"use server";

import prisma from "@/lib/prisma";
import { errorHandler, schemaCheck } from "../_errorHandler";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// export async function addVariant(prevState: any, formData: FormData) {
//   const formValues = Object.fromEntries(formData.entries());

//   const result = variantSchema.safeParse(formValues);

//   if (!result.success) return schemaCheck(result.error);

//   const { variantId, sizeId, price, stock } = result.data;

//   try {
//     await prisma.variant.create({
//       data: {
//         productId: parseInt(productId),
//         price: price,
//         stock: stock,
//         colorId: parseInt(colorId),
//         sizeId: parseInt(sizeId),
//       },
//     });
//     revalidatePath("/");
//     return { status: "success", message: [`Added Variant ${productId}`] };
//   } catch (error: unknown) {
//     if (error instanceof PrismaClientKnownRequestError) {
//       return errorHandler(error);
//     }
//     console.log(error);
//     return { status: "error", message: ["not Prisma error"] };
//   }
// }

// export async function deleteVariant(id: number) {
//   try {
//     await prisma.variant.delete({
//       where: {
//         id: id,
//       },
//     });
//     revalidatePath("/");
//     return { status: "success", message: [`Deleted Variant ${id}`] };
//   } catch (error: unknown) {
//     if (error instanceof PrismaClientKnownRequestError) {
//       return errorHandler(error);
//     }
//     return { status: "error", message: ["not Prisma error"] };
//   }
// }
