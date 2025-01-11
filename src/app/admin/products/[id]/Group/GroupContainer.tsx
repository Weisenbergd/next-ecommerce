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
import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react";

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
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function GroupContainer({
  sizes,
  setEditting,
  editting,
  groupIndex,
  variantGroup,
  product,
  colors,
  initialState,
  children,
  ...props
}: Props) {
  return (
    <div {...props}>
      <GroupInfo
        variantGroup={variantGroup}
        colors={colors}
        editting={editting}
        setEditting={setEditting}
        initialState={initialState}
        product={product}
      />
      <ImageContainer
        className="flex flex-col gap-2"
        editting={editting}
        setEditting={setEditting}
        product={product}
        variantGroup={variantGroup}
        groupIndex={groupIndex}
        initialState={initialState}
      />
      {children}
    </div>
  );
}
