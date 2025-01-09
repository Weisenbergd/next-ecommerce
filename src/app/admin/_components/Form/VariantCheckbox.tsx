import { TypeColor, TypeSize } from "@/lib/types";
import { productFormVar } from "./FormStructure";
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
  existingColors?: number[];
  variantTable: number;
};

export default function VariantCheckbox({
  sizes,
  colors,
  handleVariant,
  setVariantTable,
  existingColors,
  variantTable,
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

  // code to automatically check whatever color/size just added
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
      handleVariant(varName, name, id, true);
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

  const tableMeetsStandards = () => {
    const activeChecks = Object.entries(checkedState).filter(
      ([key, value]) => value.valueOf() === true
    );
    if (activeChecks.length < 2) return false;
    if (activeChecks.length >= 2) {
      let colorCheck = false;
      let sizeCheck = false;
      for (const check of activeChecks) {
        if (check[0].split("-")[0] === "color") colorCheck = true;
        if (check[0].split("-")[0] === "size") sizeCheck = true;
        if (colorCheck === true && sizeCheck === true) break;
      }
      if (colorCheck === true && sizeCheck === true) return true;
      else return false;
    }
  };

  useEffect(() => {
    const activeChecks = Object.entries(checkedState).filter(
      ([key, value]) => value.valueOf() === true
    );
    if (activeChecks.length < 2 && variantTable === 1) {
      setVariantTable(0);
    }
  });

  return (
    <div className="my-10 flex flex-col gap-4 md:gap-6">
      {isModalOpen && (
        <Modal>
          <ModalForm selectionTarget={selectionTarget} />
        </Modal>
      )}
      {productFormVar.map((variantOutline) => {
        if (variantOutline.name != "colorId" && variantOutline.name != "sizeId")
          return null;
        let x = variantOutline.label.toLowerCase();
        let mapVar = variantOutline.label === "Size" ? sizes : colors;
        return (
          <div
            className="border-border bg-secondary text-secondary-foreground py-2 flex flex-col  overflow-hidden"
            key={variantOutline.name}
          >
            <div className="md:px-6 rounded-t-md rounded-b-md pb-10">
              <div className="flex justify-between items-center p-2 pb-4 rounded-t-md">
                <h2 className="font-semibold text-xl">
                  {variantOutline.label}s
                </h2>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectionTarget(
                      variantOutline.name === "colorId" ? "color" : "size"
                    );
                    setIsModalOpen(true);
                  }}
                >
                  Add New {variantOutline.label}
                </Button>
              </div>

              <div className="max-h-96 overflow-auto flex flex-col gap-4 ">
                {mapVar.map((variant) => {
                  const key = `${variantOutline.label.toLowerCase()}-${
                    variant.id
                  }`;

                  return (
                    <div
                      className={`flex gap-1 items-center bg-card text-card-foreground shadow-sm rounded-xl py-4 px-4 left-4 ${
                        variantOutline.name === "colorId" &&
                        existingColors?.includes(variant.id) &&
                        "font-bold "
                      }`}
                      key={key}
                    >
                      <input
                        className="size-5 p-2"
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
                        disabled={
                          variantOutline.name === "colorId" &&
                          existingColors?.includes(variant.id)
                        }
                      />
                      <div className="p-2 pr-10 flex items-center">
                        <label
                          className={`peer hover:cursor-pointer hover:font-bold truncate p-2 pr-10 ${
                            variantOutline.name === "colorId" &&
                            existingColors?.includes(variant.id) &&
                            "hover:cursor-not-allowed line-through"
                          }`}
                          htmlFor={key}
                        >
                          {variant.name}
                        </label>
                        {variantOutline.name === "colorId" &&
                          existingColors?.includes(variant.id) && (
                            <p className="peer-hover:visible font-light invisible">
                              color already added
                            </p>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      {!variantTable && (
        <Button
          className="md:w-fit p-6"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (tableMeetsStandards()) setVariantTable(1);
          }}
          disabled={!tableMeetsStandards()}
        >
          {tableMeetsStandards()
            ? "Add selected properties to continue"
            : "Select at least one size and one color"}
        </Button>
      )}
    </div>
  );
}
