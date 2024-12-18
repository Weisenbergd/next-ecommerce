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
import { Selection, SelectPlaceholders } from "./FormAbstract";

interface Props {
  name: string;
  id?: string;
  label: string;
  selection: {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  setSelectionTarget?: Dispatch<SetStateAction<string>>;
  placeholder?: number | string | undefined;
  form?: any;
  editting?: any;
  // name?: string;
}

export default function LabelSelection({
  name,
  id,
  label,
  selection,
  setSelectionTarget,
  placeholder,
  form,
  editting,
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

  const [modalFormState, setModalFormState] = useState({
    status: "",
    message: "",
  });

  if (editting === undefined) editting = true;

  const [placeHolderAfterSubmit, setPlaceHolderAfterSubmit] = useState<
    Record<string, string>
  >({
    category: "",
    color: "",
    size: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (modalFormState.status === "success") {
      const key = modalFormState.message[1];
      const value = modalFormState.message[2];
      setPlaceHolderAfterSubmit((prevState) => ({
        ...prevState,
        [key]: value,
      }));
      setSelected(modalFormState.message[3]);
      setIsModalOpen(false);
    }
  }, [modalFormState.message, modalFormState.status]);

  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ModalForm
            modalFormState={modalFormState}
            setModalFormState={setModalFormState}
            selectionTarget={label}
            closeModal={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
      {editting === false ? (
        <p>
          {label}: {placeholder}
        </p>
      ) : (
        <>
          <Label htmlFor={name}>{label}</Label>
          <Select
            // required
            open={dropdownOpen[name] || false}
            onOpenChange={() => toggleDropdown(name)}
            name={name}
            defaultValue={modalFormState.message[3]}
            value={selected}
            onValueChange={(e) => {
              setSelected(e);
            }}
          >
            <SelectTrigger value={"test"} defaultValue={"test"}>
              <SelectValue
              // placeholder={
              //   modalFormState.status === "success" &&
              //   modalFormState.message[1] === label.toLowerCase()
              //     ? placeHolderAfterSubmit[label.toLowerCase()]
              //     : placeHolderAfterSubmit[label.toLowerCase()]
              // }
              />
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
                  // setSelectionTarget(label);
                }}
                variant="ghost"
                size="sm"
              >
                Add new {label}
              </Button>
            </SelectContent>
          </Select>
        </>
      )}
    </>
  );
}
