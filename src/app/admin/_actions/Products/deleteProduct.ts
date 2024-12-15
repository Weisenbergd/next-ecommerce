import prisma from "@/lib/prisma";
import { deleteFireBase } from "../_postFireBase";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errorHandler } from "../_errorHandler";

export async function deleteProduct(id: number) {
  try {
    const product = await prisma.product.delete({
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
