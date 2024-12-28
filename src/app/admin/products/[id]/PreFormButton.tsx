import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import FormButton from "./FormButton";
import { Input } from "@/components/ui/input";
import LabelSelection from "../../_components/Form/LabelSelection";
import { TypeColor } from "@/lib/types";

type Props = {
  children: ReactNode;
  label: string;
  action: (payload: FormData) => void;
  form: string;
  hiddenInputNames: string;
  hiddenInputValues: number;
  selection: TypeColor[];
};

export default function PreFormButton({
  children,
  label,
  action,
  form,
  hiddenInputNames,
  hiddenInputValues,
  selection,
}: Props) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setShowInput(!showInput);
        }}
      >
        {showInput ? "cancel" : children}
      </Button>
      {showInput && (
        <div>
          {/* <label htmlFor="groupName">{label}</label>
          <Input id="groupName" form={form} name={label} /> */}
          <LabelSelection
            name="colorId"
            selection={selection}
            label="color"
            form={form}
          />
          <FormButton
            form={form}
            action={action}
            hiddenInputNames={hiddenInputNames}
            hiddenInputValues={hiddenInputValues}
          >
            Add Group
          </FormButton>
        </div>
      )}
    </div>
  );
}
