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

export async function getSizes() {
  return await prisma.size.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      variants: true,
    },
  });
}

export async function getVariants() {
  return await prisma.variant.findMany({
    orderBy: [
      {
        productId: "asc",
      },
      {
        id: "asc",
      },
    ],
  });
}
