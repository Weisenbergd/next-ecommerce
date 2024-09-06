"use client";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/functions";
import Image from "next/image";
import { useState } from "react";
import FormAbstract from "../../_components/Form/FormAbstract";
import { productForm } from "../../_components/Form/FormStructure";
import { editProduct } from "../../_actions/products";
import Link from "next/link";
import { getURL } from "next/dist/shared/lib/utils";
import { useSearchParams } from "next/navigation";

interface Props {
  product: {
    category: {
      name: string;
    };
    image: {
      url: string;
    }[];
    variants: {
      id: number;
      color: {
        name: string;
      };
      size: {
        name: string;
      };
      stock: number;
    }[];
  } & {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    basePrice: number;
    categoryId: number;
    hasVariants: boolean;
  };
}

export default function ProductView({ product }: Props) {
  const formatCreatedAt = formatDateTime(product.createdAt);
  const formatUpdatedAt = formatDateTime(product.updatedAt);

  const [edit, setEdit] = useState(false);

  const url = getURL();

  return (
    <>
      <div>
        <h1>{product.name}</h1>
        <p>description: {product.description}</p>
        <p>category: {product.category.name}</p>
        <p>base price: {product.basePrice}</p>
        <p></p>
        <p>
          createdAt: {formatCreatedAt.formattedDate}--
          {formatCreatedAt.formattedTime}
        </p>
        <p>
          updatedAt {formatUpdatedAt.formattedDate}--
          {formatUpdatedAt.formattedTime}
        </p>
        <div className="w-64">
          {product.image[0].url &&
            product.image.map((el) => {
              return (
                <Image
                  key={el.url}
                  alt={`${product.name} picture`}
                  src={el.url}
                  width={700}
                  height={900}
                />
              );
            })}
          <Link href={`./${product.id}/images?variants=${product.hasVariants}`}>
            Edit Add Images
          </Link>
          {!product.image[0].url && <p>no images</p>}
        </div>
        {product.hasVariants === false ? (
          <div>
            <p>color: {product.variants[0].color.name}</p>
            <p>size: {product.variants[0].size.name}</p>
            <p>stock: {product.variants[0].stock}</p>
          </div>
        ) : (
          <p>right</p>
        )}
      </div>
    </>
  );
}
