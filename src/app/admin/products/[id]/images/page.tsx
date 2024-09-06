import { getProductImages } from "@/app/admin/_actions/images";
import { getSingleProduct } from "@/app/admin/_fetches/products";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ImageButtonAction from "./ImageButtonAction";
import ImageList from "./ImageList";

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params }: Props) {
  const images = await getProductImages(params.id);
  const product = await getSingleProduct(parseInt(params.id));

  if (!product) return <p>product doesn't exist</p>;

  return (
    <>
      <ImageList
        images={images}
        hasVariants={product.hasVariants}
        productId={product.id}
      />
    </>
  );
}
