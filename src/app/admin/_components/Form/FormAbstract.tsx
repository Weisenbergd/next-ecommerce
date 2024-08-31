"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";

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

interface Props {
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
  name: string;
}

export default function FormAbstract(props: Props) {
  const initialState = {
    status: "",
    message: [""],
  };
  const [state, formAction] = useFormState(addProduct, initialState);
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
      <h2 className="capitalize mb-6">Add {props.name}</h2>
      <form
        ref={ref}
        id="productForm"
        action={formAction}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="variant" value={hasVariants} />
        {props.formStructure.map((el, i) => {
          return (
            <div key={el.label + i} className="flex flex-col gap-2">
              {el.input !== "selection" && !el.variant && (
                <LabelInput el={el} />
              )}
              {el.input === "selection" && !el.variant && (
                <LabelSelection
                  setIsModalOpen={setIsModalOpen}
                  el={el}
                  selection={pickSelection(el.label)}
                  setSelectionTarget={setSelectionTarget}
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
              return (
                <div key={el.label + i} className="flex flex-col gap-2">
                  {el.input != "selection" && el.variant && (
                    <LabelInput el={el} />
                  )}
                  {el.input === "selection" && el.variant && (
                    <LabelSelection
                      setIsModalOpen={setIsModalOpen}
                      el={el}
                      selection={pickSelection(el.label)}
                      setSelectionTarget={setSelectionTarget}
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

// {category && (
//   <div>
//     <Label form="category">name</Label>
//     <Input
//       className="text-sm"
//       name="name"
//       id="name"
//       required={true}
//       form="category"
//     />
//     <Label form="category">description</Label>
//     <Input
//       className="text-sm"
//       name="description"
//       id="description"
//       required={true}
//       form="category"
//     />
//     <button form="category">submit</button>
//   </div>
// )}
