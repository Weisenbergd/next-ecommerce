import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Props {
  el: {
    label: string;
    name: string;
    input: string;
    required: boolean;
    variant?: boolean;
  };
  placeholder?: string | number;
}

export default function LabelInput({ el, placeholder }: Props) {
  const [state, setState] = useState(placeholder);

  return (
    <>
      <Label
        className="dark:text-primary text-primary-foreground"
        htmlFor={el.label}
      >
        {el.label}
      </Label>
      <Input
        className="text-sm dark:text-primary text-primary-foreground"
        type={el.input}
        name={el.name}
        id={el.label}
        required={el.required}
        step={el.name === "price" ? 0.01 : 1}
        placeholder={placeholder?.toString()}
        value={placeholder && state}
        onChange={(e) => {
          placeholder && setState(e.target.value);
        }}
      ></Input>
    </>
  );
}
