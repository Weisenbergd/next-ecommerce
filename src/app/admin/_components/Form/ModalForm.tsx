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
import { useModal } from "../Modal/ModalContext";

type Props = {
  // closeModal: () => void;
  selectionTarget: string;
  // setModalFormState: Dispatch<
  //   SetStateAction<{
  //     status: string;
  //     message: (string | number)[];
  //   }>
  // >;
};

const ModalForm = ({
  // closeModal,
  selectionTarget,
}: // setModalFormState,
Props) => {
  const initialState: {
    status: string;
    message: (string | number)[];
  } = {
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
    if (target === "category") return formActionCategory;
    if (target === "color") return formActionColor;
    if (target === "size") return formActionSize;
  }

  const modalRef = useRef<HTMLFormElement>(null);

  let state = initialState;
  function getState(target: string) {
    if (target === "category") state = stateCategory;
    if (target === "color") state = stateColor;
    if (target === "size") state = stateSize;
  }

  const { isModalOpen, setIsModalOpen, modalFormState, setModalFormState } =
    useModal();

  useEffect(() => {
    if (selectionTarget.toLowerCase() === "size") state = stateSize;
    if (selectionTarget.toLowerCase() === "color") state = stateColor;
    if (selectionTarget.toLowerCase() === "category") state = stateCategory;

    if (state && state.status === "error") {
      console.log(state);
    }

    if (state && state.status === "success") {
      setModalFormState(state);
      setIsModalOpen(false);
    }
  }, [state, setIsModalOpen, setModalFormState]);

  return (
    <>
      <h2 className="mb-4">Add New {selectionTarget}</h2>
      <form
        id="modalForm"
        ref={modalRef}
        className="flex flex-col gap-4"
        action={getAction(selectionTarget.toLowerCase())}
      >
        <Label htmlFor="name">Name</Label>
        <Input form="modalForm" name="name" id="name" required />

        <Label htmlFor="description">Description</Label>
        <Input form="modalForm" name="description" id="description" />

        <SubmitButton
          form="modalForm"
          onClick={() => {
            getState(selectionTarget.toLowerCase());
          }}
        />
      </form>
    </>
  );
};

export default ModalForm;
