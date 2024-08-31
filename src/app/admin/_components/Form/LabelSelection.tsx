import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import ModalForm from "./ModalForm";
import { Selection } from "./FormAbstract";

interface Props {
  el: {
    label: string;
    name: string;
    input: string;
    required: boolean;
    variant?: boolean;
  };
  selection:
    | {
        id: number;
        name: string;
        description?: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectionTarget: Dispatch<SetStateAction<string>>;
}

export default function LabelSelection({
  el,
  selection,
  setIsModalOpen,
  setSelectionTarget,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const toggleDropdown = (name: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const ref = useRef<HTMLSelectElement>(null);

  // let name = "";
  // useEffect(() => {
  //   if (success && success == "success") {
  //     name = "test";
  //   }
  // });

  const [state, setState] = useState({ category: "", color: "", size: "" });

  // function handleState(target: string, e) {
  //   console.log(el);
  // }

  return (
    <>
      <Label>{el.label}</Label>
      <Select
        open={dropdownOpen[el.name] || false} // Check the state of this specific dropdown
        onOpenChange={() => toggleDropdown(el.name)} // Toggle the state of this dropdown
        name={el.name}
      >
        <SelectTrigger>
          <SelectValue placeholder={el.label} />
        </SelectTrigger>
        <SelectContent>
          {/* {selections &&
            Object.keys(selections).includes(el.name) &&
            selections[el.name] &&
            selections[el.name].map((el: any, j: number) => {
              return (
                <SelectItem key={el.name + j} value={el.id.toString()}>
                  {el.name}
                </SelectItem>
              );
            })} */}

          {selection &&
            selection.map((el: any, j: number) => {
              return (
                <SelectItem key={el.name + j} value={el.id.toString()}>
                  {el.name}
                </SelectItem>
              );
            })}
          <Button
            onClick={(e) => {
              setIsModalOpen(true);
              setDropdownOpen({});
              setSelectionTarget(el.label);
            }}
            variant="ghost"
            size="sm"
          >
            Add new {el.label}
          </Button>
        </SelectContent>
      </Select>
    </>
  );
}
