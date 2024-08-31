import { Button } from "@/components/ui/button.tsx";
import { columns, Product } from "../_components/Table/Columns.tsx";
import { DataTable } from "../_components/Table/DataTable.tsx";
import {
  getCategories,
  getColors,
  getProducts,
  getSizes,
  getVariants,
} from "../_fetches/products";
import FormAbstract from "../_components/Form/FormAbstract.tsx";
import { addProduct } from "../_actions/products.ts";
import { productForm, variantForm } from "../_components/Form/FormStructure.ts";
import { addVariant } from "../_actions/variants.ts";
import ShowHideWrapper from "../_components/ShowHideWrapper.tsx";
import prisma from "@/lib/prisma.ts";

export default async function page() {
  // await prisma.variant.deleteMany({});
  // await prisma.product.deleteMany({});
  // await prisma.color.deleteMany({});
  // await prisma.category.deleteMany({});
  // await prisma.size.deleteMany({});

  const products: Product[] = await getProducts();

  // const variants = await getVariants();

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
