import { Input } from "@/components/ui/input";
import { useState } from "react";
import StyledLabel from "./StyledLabel";
import { StyledInput } from "./StyledInput";
import StyledLabelInputDiv from "./StyledLabelInputDiv";
import { Textarea } from "@/components/ui/textarea";
import ImageInput from "./ImageInput";

type Props = {
  el: {
    label: string;
    name: string;
    input: string;
    required: boolean;
    variant?: boolean;
  };
  placeholder?: string | number;
  name?: string;
  state: {
    status: string;
    message: (string | number)[];
  };
};

export default function LabelInput({ el, placeholder, name, state }: Props) {
  const [productName, setProductName] = useState("");
  const [controlState, setControlState] = useState(placeholder);

  return (
    <StyledLabelInputDiv>
      <StyledLabel htmlFor={el.label}>{el.label}</StyledLabel>
      {el.name != "images" && el.name != "description" && (
        <StyledInput
          type={el.input}
          name={name ? name : el.name}
          id={el.label}
          required={el.required}
          step={el.name === "price" ? 0.01 : 1}
          min={el.name === "price" ? 0.01 : ""}
          placeholder={placeholder?.toString()}
          value={placeholder && controlState}
          onChange={(e) => {
            placeholder && setControlState(e.target.value);
            setProductName && setProductName(e.target.value);
          }}
        />
      )}
      {el.name === "description" && (
        <Textarea
          id={el.label}
          required={el.required}
          name={name ? name : el.name}
          className="border-border"
          placeholder={
            placeholder?.toString() ||
            "Max length 1000 characters. Preserves line breaks"
          }
          maxLength={1000}
          onChange={(e) => {
            placeholder && setControlState(e.target.value);
            setProductName && setProductName(e.target.value);
          }}
        ></Textarea>
      )}

      {["images", "variantImages"].includes(el.name) && (
        <ImageInput
          className=""
          state={state}
          index={0}
          type="file"
          name={name ? name : el.name}
          id={el.label}
          required={el.required}
          multiple
        />
      )}
    </StyledLabelInputDiv>
  );
}
