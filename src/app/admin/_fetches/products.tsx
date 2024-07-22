"use server";

import prisma from "@/lib/prisma";

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function getColors() {
  return await prisma.color.findMany({
    orderBy: {
      id: "asc",
    },
  });
}
