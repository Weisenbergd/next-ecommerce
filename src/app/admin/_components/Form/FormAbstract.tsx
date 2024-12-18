"use client";
import { ChangeEvent, Key, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import React from "react";
import Modal from "../Modal/Modal";
import ModalForm from "./ModalForm";
import LabelInput from "./LabelInput";
import LabelSelection from "./LabelSelection";
import { Button } from "@/components/ui/button";
import { variantForm } from "./FormStructure";
import { redirect } from "next/navigation";
import VariantTable from "../Table/VariantTable";
import ButtonModal from "../Modal/ButtonModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface Selection {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
[];

type Placeholders = {
  name: string;
  description: string;
  baseprice: number;
  stock: number;
  price: number;
};

export type SelectPlaceholders = {
  image: string;
  category: number;
  color: number;
  size: number;
};

interface Props {
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
  hasVariants?: boolean;
  placeholders?: Placeholders;
  selectPlaceholders?: SelectPlaceholders;
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{ status: string; message: (string | number)[] }>;
  formStructure: {
    label: string;
    name: string;
    input: string;
    required: boolean;
    variant?: boolean;
  }[];
  category: {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  size: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  color: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  name?: string;
  [key: string]: any; // Index signature for string keys
}

export default function FormAbstract(props: Props) {
  const initialState = {
    status: "",
    message: [""],
  };
  const [state, formAction] = useFormState(props.action, initialState);

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
    if (props.hasVariants) {
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
    if (label === "Category") return props.category;
    if (label === "Color") return props.color;
    if (label === "Size") return props.size;
    else throw Error("programmer error -- problem with selection passing");
  }

  const [productName, setProductName] = useState("");

  return (
    <>
      {!props.edit && <h2 className="capitalize mb-6">Add {props.name}</h2>}
      <form
        ref={ref}
        id="productForm"
        action={formAction}
        className="flex flex-col gap-4"
      >
        {props.edit && <input type="hidden" name="id" value={props.edit.id} />}
        {props.edit && props.edit.variants?.length === 1 && (
          <input
            type="hidden"
            name="variantId"
            value={props.edit.variants[0].id}
          />
        )}
        <input type="hidden" name="variant" value={hasVariants} />
        {props.formStructure.map((el, i) => {
          const key: keyof Placeholders = el.label
            .toLowerCase()
            .replace(/\s/g, "") as keyof Placeholders;
          const keySelect: keyof SelectPlaceholders = el.label
            .toLowerCase()
            .replace(/\s/g, "") as keyof SelectPlaceholders;

          return (
            <div key={el.label + i} className="flex flex-col gap-2">
              {el.input !== "selection" &&
                !el.variant &&
                !(props.edit && el.label === "Images") && (
                  <LabelInput
                    setProductName={setProductName}
                    el={el}
                    placeholder={props.placeholders && props.placeholders[key]}
                  />
                )}
              {el.input === "selection" && !el.variant && (
                <LabelSelection
                  name={el.name}
                  label={el.label}
                  selection={pickSelection(el.label)}
                  setSelectionTarget={setSelectionTarget}
                  placeholder={
                    props.selectPlaceholders &&
                    props.selectPlaceholders[keySelect]
                  }
                />
              )}
            </div>
          );
        })}
        <>
          {!props.edit && (
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
              {props.formStructure.map((el, i) => {
                const key: keyof Placeholders = el.label
                  .toLowerCase()
                  .replace(/\s/g, "") as keyof Placeholders;
                const keySelect: keyof SelectPlaceholders = el.label
                  .toLowerCase()
                  .replace(/\s/g, "") as keyof SelectPlaceholders;

                return (
                  <div key={el.label + i} className="flex flex-col gap-2">
                    {el.input !== "selection" && el.variant && (
                      <LabelInput
                        el={el}
                        placeholder={
                          props.placeholders && props.placeholders[key]
                        }
                      />
                    )}
                    {el.input === "selection" && el.variant && (
                      <LabelSelection
                        name={el.name}
                        label={el.label}
                        selection={pickSelection(el.label)}
                        setSelectionTarget={setSelectionTarget}
                        placeholder={
                          props.selectPlaceholders &&
                          props.selectPlaceholders[keySelect]
                        }
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
                    {(
                      props[x] as Array<{ id: number; [key: string]: any }>
                    ).map((el, i) => {
                      return (
                        <div key={el.id}>
                          <label htmlFor={el.name}>{el.name}</label>
                          <input
                            form="variantForm"
                            name={el.name}
                            id={el.name}
                            type="checkbox"
                            onChange={(e) =>
                              handleVariant(e, variant.name, el.id.toString())
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
