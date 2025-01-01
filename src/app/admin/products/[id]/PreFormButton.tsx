import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import FormButton from "./FormButton";
import { Input } from "@/components/ui/input";
import LabelSelection from "../../_components/Form/LabelSelection";
import { TypeColor, TypeSize, TypeVariantGroup } from "@/lib/types";
import VariantCheckBoxTable from "../../_components/Form/VariantCheckBoxTable";

type Props = {
  children: ReactNode;
  label: string;
  action: (payload: FormData) => void;
  form: string;
  hiddenInputNames: string;
  hiddenInputValues: number;
  selection: TypeColor[];
  onClick?: () => void;
  colors: TypeColor[];
  sizes: TypeSize[];
  groups: TypeVariantGroup[];
};

export default function PreFormButton({
  children,
  onClick,
  label,
  action,
  form,
  hiddenInputNames,
  hiddenInputValues,
  selection,
  colors,
  sizes,
  groups,
}: Props) {
  // this is for when in editting mode an option requires new form (not just delete update whats there)
  // example: addGroup >> AddGroup Form

  const [showInput, setShowInput] = useState(false);
  const [varCheckBox, setVarCheckBox] = useState(false);

  // console.log(groups);

  const [existingColors, setExistingColors] = useState<number[]>([]);

  useEffect(() => {
    if (groups) {
      const colorIds = groups.map((group) => group.colorId);
      setExistingColors((prevColors) =>
        Array.from(new Set([...prevColors, ...colorIds]))
      );
    }
  }, [groups]);

  return (
    <div>
      <Button
        onClick={() => {
          setVarCheckBox(true);
          setShowInput(!showInput);
        }}
      >
        {showInput ? "cancel" : children}
      </Button>
      {showInput && (
        <div>
          {/* <LabelSelection
            name="colorId"
            selection={selection}
            label="color"
            form={form}
            placeholder={null}
            editting={true}
          /> */}

          <VariantCheckBoxTable
            colors={colors}
            sizes={sizes}
            hasVariants={1}
            existingColors={existingColors}
            form={form}
          />
          <FormButton
            form={form}
            action={action}
            hiddenInputNames={hiddenInputNames}
            hiddenInputValues={hiddenInputValues}
          >
            Add Groups
          </FormButton>
        </div>
      )}
    </div>
  );
}
