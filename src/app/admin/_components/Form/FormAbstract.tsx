"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, useEffect, useRef } from "react";
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
  selections?: {
    [key: string]: {
      id: number;
      name: string;
      description?: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
}

export default function FormAbstract(props: props) {
  const initialState = {
    status: "",
    message: [""],
  };

  const [state, formAction] = useFormState(props.action, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    state && state.status === "error" && console.log(state);
  }, [state]);

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
                  step={el.name === "price" ? 0.01 : 1}
                ></Input>
              </>
            )}
            {el.input === "selection" && (
              <Select name={el.name}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      props.selections &&
                      props.selections[el.name] &&
                      props.selections[el.name].length > 0
                        ? el.label
                        : `No Items! Please add an item to the ${el.label} table for selection!`
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {props.selections &&
                    Object.keys(props.selections).includes(el.name) &&
                    props.selections[el.name] &&
                    props.selections[el.name].map((el, j) => {
                      return (
                        <SelectItem key={el.name + j} value={el.id.toString()}>
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
