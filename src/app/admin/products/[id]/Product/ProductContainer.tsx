"use client";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import {
  TypeCategory,
  TypeColor,
  TypeDeepProduct,
  TypeSize,
} from "@/lib/types";
import GroupContainer from "../Group/GroupContainer";

type Props = {
  product: TypeDeepProduct;
  sizes: TypeSize[];
  categories: TypeCategory[];
  colors: TypeColor[];
};
export default function ProductContainer({
  product,
  sizes,
  categories,
  colors,
}: Props) {
  // editting, setEditting, initialState get passed down to all the groups > variants
  const [editting, setEditting] = useState({
    category: "",
    target: -1,
  });
  const [initialState, setInitialState] = useState<{
    status: string;
    message: (string | number)[];
  }>({
    status: "",
    message: [""],
  });

  return (
    <>
      <div className="bg-gray-800">
        <ol className="ProductUL">
          <ProductInfo
            product={product}
            categories={categories}
            editting={editting}
            setEditting={setEditting}
            initialState={initialState}
            colors={colors}
            sizes={sizes}
          />
          {product.variantGroups[0] && (
            <li>
              <ol className="GroupUL">
                {product.variantGroups.map((el, groupIndex) => {
                  return (
                    <li key={groupIndex}>
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
                    </li>
                  );
                })}
              </ol>
            </li>
          )}
        </ol>
      </div>
    </>
  );
}
