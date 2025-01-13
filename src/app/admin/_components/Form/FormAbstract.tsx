"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import React from "react";
import LabelInput from "./LabelInput";
import LabelSelection from "./LabelSelection";
import { redirect } from "next/navigation";
import {
  TypeAction,
  TypeCategory,
  TypeColor,
  TypeInputPlaceholders,
  TypeSelectPlaceholders,
  TypeSize,
} from "@/lib/types";
import VariantCheckBoxTable from "./VariantCheckBoxTable";
import { productFormBase, productFormVar } from "./FormStructure";
import StyledFormSections from "./StyledFormSections";

type Props = {
  edit?: {
    edit: string;
    id: number;
    variants?: {
      id: number;
      stock: number;
      color: {
        name: string;
      };
      size: {
        name: string;
      };
    }[];
  };
  placeholders?: TypeInputPlaceholders;
  selectPlaceholders?: TypeSelectPlaceholders;
  action: TypeAction;
  // formStructure: TypeFormStructure;
  categories: TypeCategory[];
  sizes: TypeSize[];
  colors: TypeColor[];
  name?: string;
  [key: string]: any;
};

// todo -- handle formErrors
// important -- current code assumes only 2 properties for variants table: colors and sizes
export default function FormAbstract({
  placeholders,
  selectPlaceholders,
  action,
  // formStructure,
  categories,
  sizes,
  colors,
  name,
  edit,
}: Props) {
  const initialState: {
    status: string;
    message: any[];
  } = {
    status: "",
    message: [],
  };
  const [state, formAction] = useFormState(action, initialState);
  const [hasVariants, setHasVariants] = useState(0);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (hasVariants) {
      setHasVariants(1);
    }
  }, []);
  useEffect(() => {
    if (state && state.status === "error") {
      console.log(state);
    }
    if (state && state.status === "success") {
      console.log(state);
      if (ref.current) ref.current.reset();
      redirect(`/admin/products/${state.message[1]}`);
    }
  }, [state]);
  function pickSelection(label: string) {
    if (label === "Category") return categories;
    if (label === "Color") return colors;
    if (label === "Size") return sizes;
    else throw Error("programmer error -- problem with selection passing");
  }

  return (
    <div className="md:grid md:justify-center">
      <form
        name="test"
        ref={ref}
        id="productForm"
        action={formAction}
        className="flex flex-col gap-4 md:gap-6 w-full md:w-[700px]"
      >
        {productFormBase.map((el, i) => {
          const key: keyof TypeInputPlaceholders = el.label
            .toLowerCase()
            .replace(/\s/g, "") as keyof TypeInputPlaceholders;
          const keySelect: keyof TypeSelectPlaceholders = el.label
            .toLowerCase()
            .replace(/\s/g, "") as keyof TypeSelectPlaceholders;
          return (
            <StyledFormSections key={el.label + i} className="...">
              {el.input !== "selection" ? (
                <LabelInput
                  el={el}
                  placeholder={placeholders && placeholders[key]}
                  state={state}
                />
              ) : (
                <LabelSelection
                  name={el.name}
                  label={el.label}
                  selection={pickSelection(el.label)}
                  placeholder={
                    selectPlaceholders && selectPlaceholders[keySelect]
                  }
                  form="addProduct"
                  editting={true}
                />
              )}
            </StyledFormSections>
          );
        })}
        <StyledFormSections>
          <VariantCheckBoxTable
            hasVariants={hasVariants}
            colors={colors}
            sizes={sizes}
            setHasVariants={setHasVariants}
            state={state}
          ></VariantCheckBoxTable>
        </StyledFormSections>

        {!hasVariants && (
          <>
            {productFormVar.map((el, i) => {
              const key: keyof TypeInputPlaceholders = el.label
                .toLowerCase()
                .replace(/\s/g, "") as keyof TypeInputPlaceholders;
              const keySelect: keyof TypeSelectPlaceholders = el.label
                .toLowerCase()
                .replace(/\s/g, "") as keyof TypeSelectPlaceholders;

              return (
                <StyledFormSections key={el.label + i} className="">
                  {el.input !== "selection" && (
                    <LabelInput
                      el={el}
                      placeholder={placeholders && placeholders[key]}
                      state={state}
                    />
                  )}
                  {el.input === "selection" && (
                    <LabelSelection
                      placeholder=""
                      editting={true}
                      name={el.name}
                      label={el.label}
                      selection={pickSelection(el.label)}
                      form="addProduct"
                    />
                  )}
                </StyledFormSections>
              );
            })}
            <SubmitButton className="mt-2" form="productForm" />
          </>
        )}
      </form>
    </div>
  );
}
