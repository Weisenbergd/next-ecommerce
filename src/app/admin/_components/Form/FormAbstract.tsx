"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { addCategories } from "../../_actions/categories";
import Modal from "../Modal/Modal";
import { categoryForm } from "./FormStructure";
import ModalForm from "./ModalForm";

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
  name: string;
  light: boolean;
}

export default function FormAbstract(props: props) {
  const initialState = {
    status: "",
    message: [""],
  };

  const [state, formAction] = useFormState(props.action, initialState);

  const ref = useRef<HTMLFormElement>(null);

  const [category, setCategory] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (state && state.status === "error") {
      console.log(state);
    }
    if (state && state.status === "success") {
      console.log(state);
    }
  }, [state]);

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ModalForm closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <h2 className="capitalize mb-6">Add {props.name}</h2>
      <form ref={ref} action={formAction} className="flex flex-col gap-4">
        {props.formStructure.map((el, i) => {
          return (
            <div key={el.label + i} className="flex flex-col gap-2">
              {el.input != "selection" && (
                <>
                  <Label
                    className="dark:text-primary text-primary-foreground"
                    htmlFor={el.label}
                  >
                    {el.label}
                  </Label>
                  <Input
                    className="text-sm dark:text-primary text-primary-foreground"
                    type={el.input}
                    name={el.name}
                    id={el.label}
                    required={el.required}
                    step={el.name === "price" ? 0.01 : 1}
                  ></Input>
                </>
              )}
              {el.input === "selection" && (
                <>
                  <Label>{el.label}</Label>
                  <Select
                    open={isDropdownOpen} // Assuming `open` controls the visibility
                    onOpenChange={setIsDropdownOpen} // Hook to change visibility
                    name={el.name}
                  >
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
                            <SelectItem
                              key={el.name + j}
                              value={el.id.toString()}
                            >
                              {el.name}
                            </SelectItem>
                          );
                        })}
                      <Button
                        onClick={(e) => {
                          setIsModalOpen(true);
                          setIsDropdownOpen(false);
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        Add new category
                      </Button>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          );
        })}

        {props.name === "product" && (
          <div>
            <p>test</p>
          </div>
        )}

        <SubmitButton />
      </form>
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
