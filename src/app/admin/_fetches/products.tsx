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
      image: {
        select: {
          url: true,
        },
      },
    },
  });
}

export async function getSingleProduct(id: number) {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      image: {
        select: {
          url: true,
        },
      },
      variants: {
        select: {
          id: true,
          stock: true,
          price: true,
          color: {
            select: {
              id: true,
              name: true,
            },
          },
          size: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function getVariants(id: number) {
  return await prisma.variant.findMany({
    where: {
      productId: id,
    },
  });
}
