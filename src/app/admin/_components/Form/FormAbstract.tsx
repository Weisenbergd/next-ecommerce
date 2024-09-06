"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import React from "react";
import Dropzone from "react-dropzone";

import Modal from "../Modal/Modal";
import ModalForm from "./ModalForm";
import LabelInput from "./LabelInput";
import LabelSelection from "./LabelSelection";
import { Button } from "@/components/ui/button";
import { variantForm } from "./FormStructure";
import { addProduct } from "../../_actions/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
}

export default function FormAbstract(props: Props) {
  const initialState = {
    status: "",
    message: [""],
  };
  const [state, formAction] = useFormState(props.action, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVariants, setHasVariants] = useState(0);
  const [selectionTarget, setSelectionTarget] = useState("");

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state.status === "error") {
      console.log(state);
    }
    if (state && state.status === "success") {
      if (ref.current) ref.current.reset();
      setSelectionTarget("");
      console.log(state);
      if (state.message.length > 1) {
        redirect(`./${state.message[1]}`);
      }
    }
  }, [state]);

  function pickSelection(label: string) {
    if (label === "Category") return props.category;
    if (label === "Color") return props.color;
    if (label === "Size") return props.size;
    else throw Error("programmer error -- problem with selection passing");
  }

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ModalForm
            selectionTarget={selectionTarget}
            setSelectionTarget={setSelectionTarget}
            closeModal={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
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

          // console.log(props.selectPlaceholders[keySelect]);
          return (
            <div key={el.label + i} className="flex flex-col gap-2">
              {el.input !== "selection" &&
                !el.variant &&
                !(props.edit && el.label === "Image") && (
                  <LabelInput
                    el={el}
                    placeholder={props.placeholders && props.placeholders[key]}
                  />
                )}
              {el.input === "selection" && !el.variant && (
                <LabelSelection
                  setIsModalOpen={setIsModalOpen}
                  el={el}
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
          <h2>Will this product have different variants?</h2>
          <div>
            <Button type="button" onClick={() => setHasVariants(1)}>
              Yes
            </Button>
            <Button type="button" onClick={() => setHasVariants(0)}>
              No
            </Button>
          </div>
          {!hasVariants &&
            props.formStructure.map((el, i) => {
              const key: keyof Placeholders = el.label
                .toLowerCase()
                .replace(/\s/g, "") as keyof Placeholders;
              const keySelect: keyof SelectPlaceholders = el.label
                .toLowerCase()
                .replace(/\s/g, "") as keyof SelectPlaceholders;
              return (
                <div key={el.label + i} className="flex flex-col gap-2">
                  {el.input != "selection" && el.variant && (
                    <LabelInput
                      el={el}
                      placeholder={
                        props.placeholders && props.placeholders[key]
                      }
                    />
                  )}
                  {el.input === "selection" && el.variant && (
                    <LabelSelection
                      setIsModalOpen={setIsModalOpen}
                      el={el}
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
          {hasVariants && (
            <div>
              <p>variants</p>
            </div>
          )}
        </>
        <SubmitButton />
      </form>
      {/* <form name="variantForm" id="variantForm" hidden></form> */}
    </>
  );
}
