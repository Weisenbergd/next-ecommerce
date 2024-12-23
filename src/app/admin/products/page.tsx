import { columns } from "../_components/Table/Columns.tsx";
import { DataTable } from "../_components/Table/DataTable.tsx";
import { getProducts } from "../_fetches/products";
import Link from "next/link";
import { TypeLightProduct } from "@/lib/types.ts";

// for deleting everything
// import prisma from "@/lib/prisma.ts";
// import { revalidatePath } from "next/cache";

export default async function page() {
  // for deleting everything
  // await prisma.category.deleteMany({});
  // await prisma.color.deleteMany({});
  // await prisma.size.deleteMany({});

  // await prisma.variant.deleteMany({});
  // await prisma.product.deleteMany({});
  // await prisma.image.deleteMany({});
  // revalidatePath("/");

  const products: TypeLightProduct[] = await getProducts();

  // const variants = await getVariants();

  return (
    <div>
      <Link href="./products/add-product">Add Product &gt;</Link>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
