import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ModalForm from "./ModalForm";
import {
  TypeCategory,
  TypeColor,
  TypeInitialState,
  TypeSize,
} from "@/lib/types";

type Props = {
  name: string;
  label: string;
  selection: TypeCategory[] | TypeColor[] | TypeSize[];
  setSelectionTarget?: Dispatch<SetStateAction<string>>;
  placeholder?: number | string | undefined;
  editting?: boolean;
  form: string;
  defaultValueId?: number;
};

export default function LabelSelection({
  name,
  label,
  selection,
  setSelectionTarget,
  placeholder,
  editting,
  form,
  defaultValueId,
}: Props) {
  // selected is the id of whats selected
  const [selected, setSelected] = useState<string | undefined>(
    defaultValueId?.toString()
  );
  ////
  // Modal Stuff -- for embedded modal forms
  // for these message: [message, name of category, id#]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormState, setModalFormState] = useState<TypeInitialState>({
    status: "",
    message: [""],
  });

  ////
  // Drop Down Stuff -- this component
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const toggleDropdown = (name: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  ////
  // Controlled State so that placeholder updates to the most recent modalForm submission
  const [placeHolderAfterSubmit, setPlaceHolderAfterSubmit] = useState<
    Record<string, string>
  >({
    category: "",
    color: "",
    size: "",
  });

  useEffect(() => {
    if (modalFormState.status === "success") {
      const key: string = modalFormState.message[1].toString();
      const value: string = modalFormState.message[2].toString();
      setPlaceHolderAfterSubmit((prevState) => ({
        ...prevState,
        [key]: value,
      }));
      setSelected(modalFormState.message[3].toString());
      setIsModalOpen(false);
    } else console.log(modalFormState);
  }, [modalFormState.message, modalFormState.status]);

  // do i need this?
  if (editting === undefined) editting = true;

  return (
    <>
      {form != "addProduct" && (
        <input hidden form={form} name={name} value={selected} readOnly />
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ModalForm
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
            required
            open={dropdownOpen[name] || false}
            onOpenChange={() => toggleDropdown(name)}
            name={name}
            defaultValue={modalFormState.message[3]?.toString() || ""}
            value={selected}
            onValueChange={(e) => {
              setSelected(e);
            }}
          >
            <SelectTrigger value={"test"} defaultValue={"test"}>
              <SelectValue
                placeholder={
                  modalFormState.status === "success" &&
                  modalFormState.message[1] === label.toLowerCase()
                    ? placeHolderAfterSubmit[label.toLowerCase()]
                    : placeholder
                }
              ></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {selection &&
                selection.map(
                  (el: TypeCategory | TypeSize | TypeColor, j: number) => {
                    return (
                      <SelectItem key={el.name + j} value={el.id.toString()}>
                        {el.name}
                      </SelectItem>
                    );
                  }
                )}
              <Button
                onClick={(e) => {
                  setIsModalOpen(true);
                  setDropdownOpen({});
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
