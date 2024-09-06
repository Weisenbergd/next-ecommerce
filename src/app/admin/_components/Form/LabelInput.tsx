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
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to File[] and update the state
      setFiles(Array.from(files));
      console.log(Array.from(files));
    }
  };

  return (
    <>
      <Label
        className="dark:text-primary text-primary-foreground"
        htmlFor={el.label}
      >
        {el.label}
      </Label>
      {el.name != "image" && (
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
          multiple={el.name === "image" ? true : false}
        />
      )}
      {el.name === "image" && (
        <Input
          className="text-sm dark:text-primary text-primary-foreground"
          type="file"
          name={el.name}
          id={el.label}
          required={el.required}
          multiple
          onChange={handleFileChange}
        />
      )}
    </>
  );
}
