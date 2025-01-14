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

      <div className="bg-background py-4 md:px-0 md:py-6 rounded-xl ">
        <h2 className="px-4 md:px-0 text-2xl mb-3 md:mb-6">
          Product Groupings
        </h2>
        <div className="flex flex-col gap-8">
          {product.variantGroups[0] &&
            product.variantGroups.map((el, groupIndex) => {
              return (
                <GroupContainer
                  className="flex flex-col gap-4 p-4 md:px-8 pb-8 rounded-xl bg-secondary shadow-md"
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
                    <div
                      className="grid grid-cols-2 gap-4 py-2 md:px-0 auto-rows-[minmax(auto, max-content)] w-full"
                      style={{
                        gridAutoRows: "minmax(auto, max-content)", // Ensures rows grow dynamically
                      }}
                    >
                      {el.variants.map(
                        (variant: TypeVariant, variantIndex: number) => {
                          return (
                            <VariantContainer
                              className={`bg-background p-4 shadow-md h-fit
                                `}
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
