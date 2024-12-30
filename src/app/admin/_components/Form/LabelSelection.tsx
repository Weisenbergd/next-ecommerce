import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ModalForm from "./ModalForm";
import { TypeCategory, TypeColor, TypeSize } from "@/lib/types";
import { useModal } from "../Modal/ModalContext";

type Props = {
  name: string;
  label: string;
  selection: TypeCategory[] | TypeColor[] | TypeSize[];
  placeholder?: number | string | undefined;
  editting: boolean;
  form: string;
  defaultValueId?: number;
};

export default function LabelSelection({
  name,
  label,
  selection,
  placeholder,
  editting,
  form,
  defaultValueId,
}: Props) {
  // selected is the id of whats selected
  const [selected, setSelected] = useState<string | undefined>(
    defaultValueId?.toString()
  );
  const { isModalOpen, setIsModalOpen, modalFormState, setModalFormState } =
    useModal();
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const toggleDropdown = (name: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Controlled State so that placeholder updates to the most recent modalForm submission
  const [placeHolderAfterSubmit, setPlaceHolderAfterSubmit] = useState<
    Record<string, string>
  >({
    category: "",
    color: "",
    size: "",
  });
  // removes  modalstate when unmounting
  // otherwise will populate after changing page
  useEffect(() => {
    return () => {
      setModalFormState({
        status: "",
        message: [""],
      });
    };
  }, []);

  // Updates placeholder and modal status after successful modal form submit
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
    } else if (modalFormState.status === "failure") console.log(modalFormState);
  }, [modalFormState.message, modalFormState.status]);

  // do i need this?

  // so that only one of the modals is open at a time
  const [modalTarget, setModalTarget] = useState("");

  useEffect(() => {
    if (isModalOpen === false) setModalTarget("");
  }, [isModalOpen]);

  return (
    <>
      {form != "addProduct" && (
        <input hidden form={form} name={name} value={selected} readOnly />
      )}
      {isModalOpen && modalTarget === label && (
        <Modal>
          <ModalForm selectionTarget={label} />
        </Modal>
      )}

      {editting === false ? (
        // this is what appears when viewing existing products while not editting
        <p>
          {label}: {placeholder}
        </p>
      ) : (
        <>
          <Label htmlFor={name}>{label}</Label>
          <Select
            required
            open={dropdownOpen[name] || false}
            onOpenChange={(e) => {
              toggleDropdown(name);
              e === true && setModalTarget(label);
            }}
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
                    : ""
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
