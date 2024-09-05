import { formatDateTime } from "@/lib/functions";
import { getCategories, getSingleProduct } from "../../_fetches/products";
import ProductView from "./ProductView";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
  setSearchParams: () => {};
}

export default async function page(props: Props) {
  let product;
  try {
    product = await getSingleProduct(parseInt(props.params.id));
  } catch (error) {
    // console.log(error);
  }

  if (!product) return <p>product doesn't exist</p>;

  return (
    <div>
      <Link href={`./${product.id}/edit`}>Edit</Link>
      <ProductView product={product} />
    </div>
  );
}
