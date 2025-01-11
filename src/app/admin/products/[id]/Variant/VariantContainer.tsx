import { TypeSize, TypeVariant } from "@/lib/types.ts";
import VariantInfo from "./VariantInfo.tsx";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";

type Props = {
  sizes: TypeSize[];
  setEditting: Dispatch<
    SetStateAction<{
      category: string;
      target: number;
    }>
  >;
  editting: {
    category: string;
    target: number;
  };
  initialState: {
    status: string;
    message: (string | number)[];
  };
  variant: TypeVariant;
} & HTMLAttributes<HTMLDivElement>;

export default function VariantContainer({
  variant,
  sizes,
  editting,
  setEditting,
  initialState,
  ...props
}: Props) {
  return (
    <VariantInfo
      variant={variant}
      sizes={sizes}
      editting={editting}
      initialState={initialState}
      setEditting={setEditting}
      {...props}
    />
  );
}
