import { TypeColor, TypeSize } from "@/lib/types";
import { variantForm } from "./FormStructure";
import { Button } from "@/components/ui/button";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useModal } from "../Modal/ModalContext";
import Modal from "../Modal/Modal";
import ModalForm from "./ModalForm";

type Props = {
  sizes: TypeSize[];
  colors: TypeColor[];
  handleVariant(
    varName: string,
    name: string,
    id: string,
    checked: boolean
  ): void;
  setVariantTable: Dispatch<SetStateAction<number>>;
};

export default function VariantCheckbox({
  sizes,
  colors,
  handleVariant,
  setVariantTable,
}: Props) {
  const { isModalOpen, setIsModalOpen, modalFormState, setModalFormState } =
    useModal();

  const [selectionTarget, setSelectionTarget] = useState("");

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  // Initialize checked state based on sizes and colors
  useEffect(() => {
    const initialCheckedState: Record<string, boolean> = {};
    sizes.forEach((size) => {
      initialCheckedState[`size-${size.id}`] = false;
    });
    colors.forEach((color) => {
      initialCheckedState[`color-${color.id}`] = false;
    });
    setCheckedState((prev) => ({ ...initialCheckedState, ...prev }));
  }, [sizes, colors]);

  // Sync with modalFormState
  useEffect(() => {
    if (
      modalFormState &&
      modalFormState.status === "success" &&
      modalFormState.message.length >= 4
    ) {
      const key = `${modalFormState.message[1]}-${modalFormState.message[3]}`;
      const name = modalFormState.message[1].toString(); // ex: 'color'
      const varName = modalFormState.message[2].toString(); // ex: "cool blue"
      const id = modalFormState.message[3].toString(); // ex: 80
      setCheckedState((prev) => ({
        ...prev,
        [key]: true,
      }));
      handleVariant(
        // { target: { checked: true } } as ChangeEvent<HTMLInputElement>,
        // name as string,
        // id
        varName,
        name,
        id,
        true
      );
    }
  }, [modalFormState]);

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const isChecked = e.target.checked;
    setCheckedState((prev) => ({
      ...prev,
      [key]: isChecked,
    }));
    const [name, id] = key.split("-");
    handleVariant(e.target.name, name, id, e.target.checked);
  };
  /*
message: Array(4) [ "Added color asdfasdfcc", "color", "asdfasdfcc", … ]
​​
0: "Added color asdfasdfcc"
​​
1: "color"
​​
2: "asdfasdfcc"
​​
3: 80

  */

  return (
    <div>
      {isModalOpen && (
        <Modal>
          <ModalForm selectionTarget={selectionTarget} />
        </Modal>
      )}
      {variantForm.map((variantOutline) => {
        if (variantOutline.name != "colorId" && variantOutline.name != "sizeId")
          return null;
        let x = variantOutline.label.toLowerCase();
        let mapVar = variantOutline.label === "Size" ? sizes : colors;
        return (
          <div
            className="bg-slate-800 flex flex-col gap-6 mb-10"
            key={variantOutline.name}
          >
            <h2>{variantOutline.label}s</h2>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setSelectionTarget(
                  variantOutline.name === "colorId" ? "color" : "size"
                );
                setIsModalOpen(true);
              }}
              variant="ghost"
              size="sm"
              className="absolute left-64"
              type="button"
            >
              Add new {variantOutline.label} FIx This!!!
            </Button>

            {mapVar.map((variant) => {
              const key = `${variantOutline.label.toLowerCase()}-${variant.id}`;
              return (
                <div key={key}>
                  <label htmlFor={key}>{variant.name}</label>
                  <input
                    form="variantForm"
                    name={variant.name}
                    id={key}
                    type="checkbox"
                    onChange={(e) => {
                      handleCheckboxChange(e, key);
                      handleVariant(
                        e.target.name,
                        variantOutline.name,
                        variant.id.toString(),
                        e.target.checked
                      );
                    }}
                    checked={checkedState[key] || false}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setVariantTable(1);
        }}
      >
        test
      </Button>
    </div>
  );
}
