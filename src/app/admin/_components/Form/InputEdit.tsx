import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  placeholder: string;
  inputName: string;
  editting: boolean;
  label: string;
  formName: string;
}

export default function InputEdit({
  placeholder,
  inputName,
  label,
  formName,
  editting,
}: Props) {
  const [state, setState] = useState(placeholder);

  return (
    <div>
      {editting ? (
        <>
          <label htmlFor={inputName}>{label}</label>
          <Input
            className="text-sm dark:text-primary text-primary-foreground"
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
        </>
      ) : (
        `${label}: ${placeholder}`
      )}
    </div>
  );
}
