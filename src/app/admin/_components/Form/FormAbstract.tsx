"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import React from "react";
import LabelInput from "./LabelInput";
import LabelSelection from "./LabelSelection";
import { Button } from "@/components/ui/button";
import { variantForm } from "./FormStructure";
import { redirect } from "next/navigation";
import VariantTable from "../Table/VariantTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TypeAction,
  TypeCategory,
  TypeColor,
  TypeFormStructure,
  TypeInputPlaceholders,
  TypeSelectPlaceholders,
  TypeSize,
} from "@/lib/types";
import { useModal } from "../Modal/ModalContext";
import VariantCheckbox from "./VariantCheckbox";
import VariantCheckBoxTable from "./VariantCheckBoxTable";

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
  formStructure: TypeFormStructure;
  categories: TypeCategory[];
  sizes: TypeSize[];
  colors: TypeColor[];
  name?: string;
  [key: string]: any;
};

// important -- current code assumes only 2 properties for variants table: colors and sizes
export default function FormAbstract({
  placeholders,
  selectPlaceholders,
  action,
  formStructure,
  categories,
  sizes,
  colors,
  name,
  edit,
}: Props) {
  const initialState = {
    status: "",
    message: [""],
  };

  // don't think im using this
  // const [variantNumber, setVariantNumber] = useState<number[]>([]);
  const [state, formAction] = useFormState(action, initialState);

  // 1 == hasVariants (opens variantForm); 0 == no var
  // keep this here
  const [hasVariants, setHasVariants] = useState(0);
  // 1 == variantTable set; 0 == variantTable not set

  const ref = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   let x = 0;
  //   for (const val of variantNumber) {
  //     x += val;
  //   }
  //   if (x === 0) {
  //     setHasVariants(0);
  //   }
  // }, [variantNumber]);

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

  const [productName, setProductName] = useState("");

  const { isModalOpen, setIsModalOpen, modalFormState, setModalFormState } =
    useModal();

  return (
    <>
      {!edit && <h2 className="capitalize mb-6">Add {name}</h2>}
      <form
        name="test"
        ref={ref}
        id="productForm"
        action={formAction}
        className="flex flex-col gap-4"
      >
        {edit && <input type="hidden" name="id" value={edit.id} />}
        {edit && edit.variants?.length === 1 && (
          <input type="hidden" name="variantId" value={edit.variants[0].id} />
        )}
        <input type="hidden" name="variant" value={hasVariants} />
        {formStructure.map((el, i) => {
          const key: keyof TypeInputPlaceholders = el.label
            .toLowerCase()
            .replace(/\s/g, "") as keyof TypeInputPlaceholders;
          const keySelect: keyof TypeSelectPlaceholders = el.label
            .toLowerCase()
            .replace(/\s/g, "") as keyof TypeSelectPlaceholders;

          return (
            <div key={el.label + i} className="flex flex-col gap-2">
              {el.input !== "selection" &&
                !el.variant &&
                !(edit && el.label === "Images") && (
                  <LabelInput
                    setProductName={setProductName}
                    el={el}
                    placeholder={placeholders && placeholders[key]}
                  />
                )}
              {el.input === "selection" && !el.variant && (
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
            </div>
          );
        })}
        <>
          {!edit && (
            <VariantCheckBoxTable
              hasVariants={hasVariants}
              colors={colors}
              sizes={sizes}
              setHasVariants={setHasVariants}
            />
          )}
          {!hasVariants && (
            <>
              <div>
                <Label>Image</Label>
                <Input
                  type="file"
                  multiple
                  name={"images"}
                  form="productForm"
                />
              </div>
              {formStructure.map((el, i) => {
                const key: keyof TypeInputPlaceholders = el.label
                  .toLowerCase()
                  .replace(/\s/g, "") as keyof TypeInputPlaceholders;
                const keySelect: keyof TypeSelectPlaceholders = el.label
                  .toLowerCase()
                  .replace(/\s/g, "") as keyof TypeSelectPlaceholders;

                return (
                  <div key={el.label + i} className="flex flex-col gap-2">
                    {el.input !== "selection" && el.variant && (
                      <LabelInput
                        el={el}
                        placeholder={placeholders && placeholders[key]}
                      />
                    )}
                    {el.input === "selection" && el.variant && (
                      <LabelSelection
                        placeholder=""
                        editting={true}
                        name={el.name}
                        label={el.label}
                        selection={pickSelection(el.label)}
                        form="addProduct"
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </>
        {/* <input type="hidden" name="varNum" value={variantColors.length} /> */}
        <SubmitButton />
      </form>
    </>
  );
}
