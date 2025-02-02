import { columns } from "../_components/Table/Columns.tsx";
import { DataTable } from "../_components/Table/DataTable.tsx";
import { getProducts } from "../_fetches/products";
import Link from "next/link";
import { TypeLightProduct } from "@/lib/types.ts";
import prisma from "@/lib/prisma.ts";
import { revalidatePath } from "next/cache";

// for deleting everything
// import prisma from "@/lib/prisma.ts";
// import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function page() {
  // for deleting everything

  // await prisma.variant.deleteMany({});
  // await prisma.product.deleteMany({});
  // await prisma.image.deleteMany({});

  // await prisma.category.deleteMany({});
  // await prisma.color.deleteMany({});
  // await prisma.size.deleteMany({});
  // revalidatePath("/");

  const products: TypeLightProduct[] = await getProducts();

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
