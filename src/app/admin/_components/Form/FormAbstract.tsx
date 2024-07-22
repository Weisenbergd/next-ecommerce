"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import { ZodIssue } from "zod";

interface props {
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<
    | { status: string; errors: ZodIssue[]; message?: undefined }
    | { status: string; message: string; errors?: undefined }
  >;
  formStructure: {
    label: string;
    input: string;
    required: boolean;
  }[];
}

export default function FormAbstract(props: props) {
  const initialState = {
    status: "",
    message: "",
  };
  const [state, formAction] = useFormState(props.action, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state.status === "success") ref.current?.reset();
    if (state && state.status != "success" && state.status != "")
      console.log(state);
  }, [state]);

  return (
    <form ref={ref} action={formAction}>
      {props.formStructure.map((el, i) => {
        return (
          <div key={el.label + i}>
            <Label htmlFor={el.label}>{el.label}</Label>
            {el.input != "select" && (
              <Input
                type={el.input}
                name={el.label.toLowerCase()}
                id={el.label}
                required={el.required}
              ></Input>
            )}
          </div>
        );
      })}
      <SubmitButton />
    </form>
  );
}
