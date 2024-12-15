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
  });
}

export async function getSingleProduct(id: number) {
  // throws a bunch of consoles error otherwise
  if (!id) return;

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
      variantGroups: {
        orderBy: {
          id: "asc",
        },
        include: {
          images: {
            select: {
              url: true,
            },
            orderBy: {
              id: "asc",
            },
          },
          color: {
            select: {
              id: true,
              name: true,
            },
          },
          variants: {
            orderBy: {
              id: "asc",
            },
            include: {
              size: {
                select: {
                  id: true,
                  name: true,
                },
              },
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
    orderBy: {
      variantGroupId: "asc",
    },
  });
}
