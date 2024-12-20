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
import { Category, Color, IDNAMEDESC, Size } from "@/lib/types";

interface Props {
  placeholder: string;
  inputName: string;
  id: number;
  form: string;
  label: string;
  editting: boolean;
  selection: Color[] | Category[] | Size[];
  // setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  // setSelectionTarget: Dispatch<SetStateAction<string>>;
}

export default function InputSelection({
  placeholder,
  inputName,
  id,
  selection,
  form,
  label,
  editting,
}: // setIsModalOpen,
// setSelectionTarget,
Props) {
  // const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
  //   {}
  // );
  // const toggleDropdown = (name: string) => {
  //   setDropdownOpen((prev) => ({
  //     ...prev,
  //     [name]: !prev[name],
  //   }));
  // };

  const [inputValue, setInputValue] = useState(id);

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
      {/* <Select
        onValueChange={(e) => {
          console.log(e);
          setInputValue(parseInt(e));
        }}
        // open={dropdownOpen[name] || false} // Check the state of this specific dropdown
        // onOpenChange={() => toggleDropdown(name)} // Toggle the state of this dropdown
        // name={name ? name : name}
        // defaultValue={placeholder?.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
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
          // onClick={(e) => {
          //   setIsModalOpen(true);
          //   setDropdownOpen({});
          //   setSelectionTarget(el.label);
          // }}
          // variant="ghost"
          // size="sm"
          >
            Add new {name}
          </Button>
        </SelectContent>
      </Select>
      <input hidden readOnly name={name} form={form} value={inputValue}></input> */}

      {editting ? (
        <>
          <label htmlFor={inputName}>{label}</label>
          <Select
            onValueChange={(e) => {
              setInputValue(parseInt(e));
            }}
            // open={dropdownOpen[name] || false} // Check the state of this specific dropdown
            // onOpenChange={() => toggleDropdown(name)} // Toggle the state of this dropdown
            // name={name ? name : name}
            // defaultValue={placeholder?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
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
              // onClick={(e) => {
              //   setIsModalOpen(true);
              //   setDropdownOpen({});
              //   setSelectionTarget(el.label);
              // }}
              // variant="ghost"
              // size="sm"
              >
                Add new {inputName}
              </Button>
            </SelectContent>
          </Select>
          <input
            hidden
            readOnly
            name={inputName}
            form={form}
            value={inputValue}
          ></input>
        </>
      ) : (
        `${label}: ${placeholder}`
      )}
    </>
  );
}
