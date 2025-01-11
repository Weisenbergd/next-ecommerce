"use client";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import {
  TypeCategory,
  TypeColor,
  TypeDeepProduct,
  TypeSize,
  TypeVariant,
} from "@/lib/types";
import GroupContainer from "../Group/GroupContainer";
import GroupInfo from "../Group/GroupInfo";
import ImageContainer from "../Image/ImageContainer";
import VariantContainer from "../Variant/VariantContainer";

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

  /*  
    h1 -- Product Name
    h2 -- "Product Groupings"
    h3 -- productGrouping
    h5 -- variants
  
  */

  return (
    <div className="flex flex-col gap-8">
      <ProductInfo
        product={product}
        categories={categories}
        editting={editting}
        setEditting={setEditting}
        initialState={initialState}
        colors={colors}
        sizes={sizes}
      />

      <div className="bg-secondary py-4 md:px-10 md:py-6 rounded-xl ">
        <h2 className="px-4 md:px-0 text-2xl mb-3 md:mb-6">
          Product Groupings
        </h2>
        <div className="flex flex-col gap-4">
          {product.variantGroups[0] &&
            product.variantGroups.map((el, groupIndex) => {
              return (
                <GroupContainer
                  className="flex flex-col gap-4 p-4 pb-8 bg-muted odd:bg-muted rounded-xl "
                  key={groupIndex}
                  product={product}
                  colors={colors}
                  groupIndex={groupIndex}
                  variantGroup={el}
                  sizes={sizes}
                  editting={editting}
                  setEditting={setEditting}
                  initialState={initialState}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-8">
                      {el.variants.map(
                        (variant: TypeVariant, variantIndex: number) => {
                          return (
                            <VariantContainer
                              key={variantIndex}
                              editting={editting}
                              setEditting={setEditting}
                              sizes={sizes}
                              variant={variant}
                              initialState={initialState}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                </GroupContainer>
              );
            })}
        </div>
      </div>
    </div>
  );
}
