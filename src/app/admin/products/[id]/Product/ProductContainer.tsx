"use client";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import { Category, Color, DeepProduct, Size } from "@/lib/types";
import GroupContainer from "../Group/GroupContainer";

interface Props {
  product: DeepProduct;
  sizes: Size[];
  categories: Category[];
  colors: Color[];
}
export default function ProductContainer({
  product,
  sizes,
  categories,
  colors,
}: Props) {
  // const [editting, setEditting] = useState(false);

  // editting, setEditting, initialState get passed down to all the groups > variants
  const [editting, setEditting] = useState({
    category: "",
    target: -1,
  });
  const [initialState, setInitialState] = useState({
    status: "",
    message: [""],
  });

  return (
    <>
      <div>
        <ProductInfo
          product={product}
          categories={categories}
          editting={editting}
          setEditting={setEditting}
        />
        {product.variantGroups[0] && (
          <div>
            {product.variantGroups.map((el, groupIndex) => {
              return (
                <GroupContainer
                  key={groupIndex}
                  product={product}
                  colors={colors}
                  groupIndex={groupIndex}
                  variantGroup={el}
                  sizes={sizes}
                  editting={editting}
                  setEditting={setEditting}
                  initialState={initialState}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
