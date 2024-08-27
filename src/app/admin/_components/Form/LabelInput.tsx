import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  el: {
    label: string;
    name: string;
    input: string;
    required: boolean;
    variant?: boolean;
  };
}

export default function LabelInput({ el }: Props) {
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
      ></Input>
    </>
  );
}
