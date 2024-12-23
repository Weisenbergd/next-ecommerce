import {
  TypeColor,
  TypeDeepProduct,
  TypeSize,
  TypeVariant,
  TypeVariantGroup,
} from "@/lib/types.ts";
import ImageContainer from "../Image/ImageContainer";
import VariantContainer from "../Variant/VariantContainer";
import GroupInfo from "./GroupInfo.tsx";
import { Dispatch, SetStateAction } from "react";

type Props = {
  sizes: TypeSize[];
  setEditting: Dispatch<
    SetStateAction<{
      category: string;
      target: number;
    }>
  >;
  groupIndex: number;
  variantGroup: TypeVariantGroup;
  product: TypeDeepProduct;
  colors: TypeColor[];
  editting: {
    category: string;
    target: number;
  };
  initialState: {
    status: string;
    message: (string | number)[];
  };
};

export default function GroupContainer({
  sizes,
  setEditting,
  editting,
  groupIndex,
  variantGroup,
  product,
  colors,
  initialState,
}: Props) {
  return (
    <>
      <GroupInfo
        variantGroup={variantGroup}
        colors={colors}
        editting={editting}
        setEditting={setEditting}
        initialState={initialState}
      />
      <ImageContainer
        editting={editting}
        setEditting={setEditting}
        product={product}
        variantGroup={variantGroup}
        groupIndex={groupIndex}
        initialState={initialState}
      />
      {variantGroup.variants.map(
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
    </>
  );
}
