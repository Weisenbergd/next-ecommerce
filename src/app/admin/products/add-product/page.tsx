import { TypeCategory, TypeColor, TypeSize } from "@/lib/types";
import { addProduct } from "../../_actions/Products/addProduct";
import FormAbstract from "../../_components/Form/FormAbstract";
import { productForm } from "../../_components/Form/FormStructure";
import ShowHideWrapper from "../../_components/ShowHideWrapper";
import { getCategories, getColors, getSizes } from "../../_fetches/products";

export default async function page() {
  const category: TypeCategory[] = await getCategories();
  const color: TypeColor[] = await getColors();
  const size: TypeSize[] = await getSizes();

  return (
    <FormAbstract
      formStructure={productForm}
      action={addProduct}
      categories={category}
      sizes={size}
      colors={color}
      name="product"
    />
  );
}
