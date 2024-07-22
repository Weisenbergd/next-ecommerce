"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface props {
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{ status: string; message: string[] }>;
  formStructure: {
    label: string;
    name: string;
    input: string;
    required: boolean;
  }[];
  selection?: {
    id: number;
    name: string;
    description: string;
  }[];
}

export default function FormAbstract(props: props) {
  const initialState = {
    status: "",
    message: [""],
  };

  const [state, formAction] = useFormState(props.action, initialState);
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form ref={ref} action={formAction}>
      {props.formStructure.map((el, i) => {
        return (
          <div key={el.label + i}>
            {el.input != "selection" && (
              <>
                <Label htmlFor={el.label}>{el.label}</Label>
                <Input
                  type={el.input}
                  name={el.name}
                  id={el.label}
                  required={el.required}
                ></Input>
              </>
            )}
            {el.input === "selection" && (
              <Select name={el.name}>
                <SelectTrigger>
                  <SelectValue placeholder={el.label} />
                </SelectTrigger>
                <SelectContent>
                  {props.selection?.map((el) => {
                    return (
                      <SelectItem key={el.name} value={el.id.toString()}>
                        {el.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </div>
        );
      })}
      <SubmitButton />
    </form>
  );
}
