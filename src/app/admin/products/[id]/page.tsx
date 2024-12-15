"use server";
import { formatDateTime, getParams, getPath } from "@/lib/functions";
import {
  getCategories,
  getColors,
  getSingleProduct,
  getSizes,
} from "../../_fetches/products";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DeepProduct } from "@/lib/types";
import ProductContainer from "./Product/ProductContainer";

interface Props {
  params: {
    id: string;
  };
  setSearchParams: () => {};
}

export default async function page({ params, setSearchParams }: Props) {
  if (!params) return <p>loading...</p>;

  const product: DeepProduct | undefined | null = await getSingleProduct(
    parseInt(params.id)
  );
  const sizes = await getSizes();
  const categories = await getCategories();
  const colors = await getColors();

  if (!product) return <p>product doesn't exist</p>;

  return (
    <div>
      {/* <Link href={`./${product.id}/edit`}>Edit</Link> */}
      <ProductContainer
        sizes={sizes}
        categories={categories}
        colors={colors}
        product={product}
      />
    </div>
  );
}
