import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addCategories } from "../../_actions/categories";
import { Button } from "@/components/ui/button";
import SubmitButton from "../SubmitButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ModalForm {
  closeModal: () => void;
}

const ModalForm = ({ closeModal }: ModalForm) => {
  const initialState = {
    status: "",
    message: [""],
  };

  const [state, formAction] = useFormState(addCategories, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state.status === "error") {
      console.log(state);
    }

    if (state && state.status === "success") {
      closeModal();
      console.log(state);
    }
  }, [state, closeModal]);

  return (
    <form ref={ref} action={formAction} className="flex flex-col gap-4">
      <Label htmlFor="name">Name</Label>
      <Input name="name" id="name" required />

      <Label htmlFor="description">Description</Label>
      <Input name="description" id="description" />

      <SubmitButton />
    </form>
  );
};

export default ModalForm;
