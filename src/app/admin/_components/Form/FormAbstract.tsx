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
  // hasVariants?: boolean;
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

// important -- this form no longer used for editting
// can refactor

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
  const [state, formAction] = useFormState(action, initialState);

  const [hasVariants, setHasVariants] = useState(0);
  const [selectionTarget, setSelectionTarget] = useState("");
  const [variantNumber, setVariantNumber] = useState<number[]>([]);
  const [variantColors, setVariantColors] = useState<
    { color: string; id: string }[]
  >([]);
  const [variantSizes, setVariantSizes] = useState<
    { size: string; id: string }[]
  >([]);
  const [variantTable, setVariantTable] = useState(0);

  const ref = useRef<HTMLFormElement>(null);

  function handleVariant(
    e: ChangeEvent<HTMLInputElement>,
    name: string,
    id: string
  ) {
    if (e.target.checked) {
      if (name === "sizeId") {
        setVariantSizes([...variantSizes, { size: e.target.name, id }]);
      }
      if (name === "colorId") {
        setVariantColors([...variantColors, { color: e.target.name, id }]);
      }
    } else {
      if (name === "sizeId") {
        const updatedSizes = variantSizes.filter(
          (el) => el.size !== e.target.name
        );
        setVariantSizes(updatedSizes);
      }
      if (name === "colorId") {
        const updatedColors = variantColors.filter(
          (el) => el.color !== e.target.name
        );
        setVariantColors(updatedColors);
      }
    }
  }

  useEffect(() => {
    let x = 0;
    for (const val of variantNumber) {
      x += val;
    }
    if (x === 0) {
      setHasVariants(0);
    }
  }, [variantNumber]);

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
      setSelectionTarget("");
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
                  setSelectionTarget={setSelectionTarget}
                  placeholder={
                    selectPlaceholders && selectPlaceholders[keySelect]
                  }
                  form="addProduct"
                />
              )}
            </div>
          );
        })}
        <>
          {!edit && (
            <>
              <h2>Will this product have different variants?</h2>
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    setHasVariants(1);
                  }}
                  disabled={hasVariants ? true : false}
                >
                  Yes
                </Button>
                <Button type="button" onClick={() => setHasVariants(0)}>
                  No
                </Button>
              </div>
            </>
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
                        setSelectionTarget={setSelectionTarget}
                        form="addProduct"
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}

          {hasVariants && (
            <div>
              {variantForm.map((variant) => {
                if (variant.name != "colorId" && variant.name != "sizeId")
                  return null;
                let x = variant.label.toLowerCase();
                let mapVar = variant.label === "Size" ? sizes : colors;
                return (
                  <div
                    className="bg-slate-800 flex flex-col gap-6 mb-10"
                    key={variant.name}
                  >
                    <h2>{variant.label}s</h2>
                    <Button
                      onClick={(e) => {
                        // setDropdownOpen({});
                        setSelectionTarget(variant.label);
                      }}
                      variant="ghost"
                      size="sm"
                      className="absolute left-64"
                      type="button"
                    >
                      Add new {variant.label}
                    </Button>

                    {mapVar.map((z) => {
                      return (
                        <div key={`1.${z.id}`}>
                          <label htmlFor={z.name}>{z.name}</label>
                          <input
                            form="variantForm"
                            name={z.name}
                            id={z.name}
                            type="checkbox"
                            onChange={(e) =>
                              handleVariant(e, variant.name, z.id.toString())
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setVariantTable(1);
                }}
              >
                test
              </Button>
            </div>
          )}
          {variantTable && (
            <VariantTable
              variantColors={variantColors}
              variantSizes={variantSizes}
            />
          )}
        </>
        <input type="hidden" name="varNum" value={variantColors.length} />
        <SubmitButton />
      </form>
    </>
  );
}
