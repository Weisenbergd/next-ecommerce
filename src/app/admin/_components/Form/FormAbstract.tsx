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
  ) => Promise<{ status: string; message: string[] }>;
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

  const [state, formAction] = useFormState(props.action, initialState);

  const ref = useRef<HTMLFormElement>(null);

  const [hasVariants, setHasVariants] = useState(false);

  useEffect(() => {
    if (state && state.status === "error") {
      console.log(state);
    }
    if (state && state.status === "success") {
      console.log(state);
    }
  }, [state]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectionTarget, setSelectionTarget] = useState("");

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
      <form ref={ref} action={formAction} className="flex flex-col gap-4">
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
            <Button type="button" onClick={() => setHasVariants(true)}>
              Yes
            </Button>
            <Button type="button" onClick={() => setHasVariants(false)}>
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
