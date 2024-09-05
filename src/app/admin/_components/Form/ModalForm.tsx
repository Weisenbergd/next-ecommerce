"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addCategories } from "../../_actions/categories";
import { Button } from "@/components/ui/button";
import SubmitButton from "../SubmitButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addColor } from "../../_actions/colors";
import { addSize } from "../../_actions/size";

interface Props {
  closeModal: () => void;
  setSelectionTarget: Dispatch<SetStateAction<string>>;
  selectionTarget: string;
}

const ModalForm = ({
  closeModal,
  selectionTarget,
  setSelectionTarget,
}: Props) => {
  const initialState = {
    status: "",
    message: [""],
  };

  const [stateColor, formActionColor] = useFormState(addColor, initialState);
  const [stateCategory, formActionCategory] = useFormState(
    addCategories,
    initialState
  );
  const [stateSize, formActionSize] = useFormState(addSize, initialState);

  function getAction(target: string) {
    if (target === "Category") return formActionCategory;
    if (target === "Color") return formActionColor;
    if (target === "Size") return formActionSize;
  }

  const ref = useRef<HTMLFormElement>(null);

  let state = initialState;
  function getState(target: string) {
    if (target === "Category") state = stateCategory;
    if (target === "Color") state = stateColor;
    if (target === "Size") state = stateSize;
  }

  useEffect(() => {
    if (selectionTarget === "Size") state = stateSize;
    if (selectionTarget === "Color") state = stateColor;
    if (selectionTarget === "Category") state = stateCategory;

    if (state && state.status === "error") {
      console.log(state);
    }

    if (state && state.status === "success") {
      closeModal();
      console.log(state);
    }
  }, [state, closeModal]);

  return (
    <>
      <h2 className="mb-4">Add New {selectionTarget}</h2>
      <form
        ref={ref}
        className="flex flex-col gap-4"
        action={getAction(selectionTarget)}
      >
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" required />

        <Label htmlFor="description">Description</Label>
        <Input name="description" id="description" />

        <SubmitButton onClick={() => getState(selectionTarget)} />
      </form>
    </>
  );
};

export default ModalForm;
