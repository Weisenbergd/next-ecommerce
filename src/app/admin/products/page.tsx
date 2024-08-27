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

export default async function page() {
  const products: Product[] = await getProducts();
  const category = await getCategories();
  const color = await getColors();
  const size = await getSizes();
  const variants = await getVariants();

  return (
    <div>
      <FormAbstract
        formStructure={productForm}
        action={addProduct}
        category={category}
        size={size}
        color={color}
        name="product"
      />

      <DataTable columns={columns} data={products} />
    </div>
  );
}
