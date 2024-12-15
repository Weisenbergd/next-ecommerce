import { Button } from "@/components/ui/button.tsx";
import { columns } from "../_components/Table/Columns.tsx";
import { DataTable } from "../_components/Table/DataTable.tsx";
import {
  getCategories,
  getColors,
  getProducts,
  getSizes,
  getVariants,
} from "../_fetches/products";
import FormAbstract from "../_components/Form/FormAbstract.old/index.ts";
import { addProduct } from "../_actions/productAdd.ts";
import { productForm, variantForm } from "../_components/Form/FormStructure.ts";
// import { addVariant } from "../_actions/variants.ts";
import ShowHideWrapper from "../_components/ShowHideWrapper.tsx";
import prisma from "@/lib/prisma.ts";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { useEffect } from "react";
import { LightProduct } from "@/lib/types.ts";

export default async function page() {
  // await prisma.category.deleteMany({});
  // await prisma.color.deleteMany({});
  // await prisma.size.deleteMany({});

  // await prisma.variant.deleteMany({});
  // await prisma.product.deleteMany({});
  // await prisma.image.deleteMany({});
  // revalidatePath("/");

  const products: LightProduct[] = await getProducts();

  // const variants = await getVariants();

  return (
    <div>
      <Link href="./products/add-product">Add Product &gt;</Link>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
