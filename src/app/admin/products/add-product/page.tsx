import { addProduct } from "../../_actions/products";
import FormAbstract from "../../_components/Form/FormAbstract";
import { productForm } from "../../_components/Form/FormStructure";
import ShowHideWrapper from "../../_components/ShowHideWrapper";
import { getCategories, getColors, getSizes } from "../../_fetches/products";

export default async function page() {
  const category = await getCategories();
  const color = await getColors();
  const size = await getSizes();

  return (
    <FormAbstract
      formStructure={productForm}
      action={addProduct}
      category={category}
      size={size}
      color={color}
      name="product"
    />
  );
}
