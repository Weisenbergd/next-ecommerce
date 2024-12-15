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
import { Selection, SelectPlaceholders } from "./FormAbstract.old";

interface Props {
  el: {
    label: string;
    name: string;
    input: string;
    required: boolean;
    variant?: boolean;
  };
  selection: {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectionTarget: Dispatch<SetStateAction<string>>;
  placeholder?: number | string | undefined;
  name?: string;
}

export default function LabelSelection({
  el,
  selection,
  setIsModalOpen,
  setSelectionTarget,
  placeholder,
  name,
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

  // function handleState(target: string, e) {
  //   console.log(el);
  // }
  // console.log(el);

  return (
    <>
      <Label htmlFor={el.name}>{el.label}</Label>
      <Select
        open={dropdownOpen[el.name] || false} // Check the state of this specific dropdown
        onOpenChange={() => toggleDropdown(el.name)} // Toggle the state of this dropdown
        name={name ? name : el.name}
        defaultValue={placeholder?.toString()}
        // value="cat"
      >
        <SelectTrigger>
          <SelectValue placeholder="lkjasdf" />
        </SelectTrigger>
        <SelectContent>
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
