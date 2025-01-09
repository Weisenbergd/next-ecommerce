import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  placeholder: string;
  inputName: string;
  editting: boolean;
  label: string;
  formName: string;
};

export default function InputEdit({
  placeholder,
  inputName,
  label,
  formName,
  editting,
}: Props) {
  const [state, setState] = useState(placeholder);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold" htmlFor={inputName}>
        {label}
      </label>
      {label != "description" ? (
        <Input
          className=""
          placeholder={placeholder?.toString()}
          type="input"
          name={inputName}
          id={inputName}
          value={placeholder && state}
          onChange={(e) => {
            placeholder && setState(e.target.value);
          }}
          form={formName}
        />
      ) : (
        <Textarea
          className=""
          placeholder={placeholder?.toString()}
          name={inputName}
          id={inputName}
          value={placeholder && state}
          onChange={(e) => {
            placeholder && setState(e.target.value);
          }}
          form={formName}
        />
      )}
    </div>
  );
}
