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
import { productForm } from "../_components/Form/FormStructure.ts";

export default async function page() {
  const products: Product[] = await getProducts();
  const categoryId = await getCategories();
  const colors = await getColors();
  const sizes = await getSizes();
  const variants = await getVariants();

  return (
    <div>
      <FormAbstract
        formStructure={productForm}
        action={addProduct}
        selections={{ categoryId: categoryId }}
        name="product"
        light={false}
      />
      <DataTable columns={columns} data={products} />
    </div>
  );
}
