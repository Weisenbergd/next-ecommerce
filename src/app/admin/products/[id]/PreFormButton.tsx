import { Button } from "@/components/ui/button";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FormButton from "./FormButton";
import { Input } from "@/components/ui/input";
import LabelSelection from "../../_components/Form/LabelSelection";
import {
  TypeColor,
  TypeInitialState,
  TypeSize,
  TypeVariantGroup,
} from "@/lib/types";
import VariantCheckBoxTable from "../../_components/Form/VariantCheckBoxTable";

type Props = {
  children: ReactNode;
  label: string;
  action: (payload: FormData) => void;
  form: string;
  hiddenInputNames: string;
  hiddenInputValues: number;
  selection: TypeColor[];
  onClick?: () => void;
  colors: TypeColor[];
  sizes: TypeSize[];
  groups: TypeVariantGroup[];
  state: TypeInitialState;
};

export default function PreFormButton({
  children,
  onClick,
  label,
  action,
  form,
  hiddenInputNames,
  hiddenInputValues,
  selection,
  colors,
  sizes,
  groups,
  state,
}: Props) {
  return (
    <VariantCheckBoxTable
      action={action}
      groups={groups}
      colors={colors}
      sizes={sizes}
      hasVariants={1}
      form={form}
      state={state}
    ></VariantCheckBoxTable>
  );
}
