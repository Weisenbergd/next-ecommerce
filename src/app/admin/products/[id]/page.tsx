"use server";
import { formatDateTime, getParams, getPath } from "@/lib/functions";
import {
  getCategories,
  getColors,
  getSingleProduct,
  getSizes,
} from "../../_fetches/products";
import {
  TypeCategory,
  TypeColor,
  TypeDeepProduct,
  TypeSize,
} from "@/lib/types";
import ProductContainer from "./Product/ProductContainer";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  if (!params) return <p>loading...</p>;

  const product: TypeDeepProduct | null | undefined = await getSingleProduct(
    parseInt(params.id)
  );
  const sizes: TypeSize[] = await getSizes();
  const categories: TypeCategory[] = await getCategories();
  const colors: TypeColor[] = await getColors();

  if (!product) return <p>product doesn't exist</p>;

  return (
    <ProductContainer
      sizes={sizes}
      categories={categories}
      colors={colors}
      product={product}
    />
  );
}
