import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

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
  // const [state, setState] = useState(placeholder);

  const [overwrite, setOverWrite] = useState(false);

  return (
    <div className="flex flex-col">
      <label className="font-bold" htmlFor={inputName}>
        {label}
      </label>
      {label !== "description" ? (
        label === "stock" ? (
          <div className="flex gap-4 ">
            <div className="flex flex-col border p-2 gap-4">
              <div className="flex gap-2">
                <Input
                  className="size-fit"
                  type="radio"
                  name="overwrite"
                  defaultChecked
                  onClick={() => setOverWrite(false)}
                />
                <Label>Add Stock</Label>
              </div>
              <div className="flex gap-2">
                <Input
                  className="size-fit"
                  type="radio"
                  name="overwrite"
                  onClick={() => setOverWrite(true)}
                />
                <Label>Overwrite Stock</Label>
              </div>
              <input
                name="overwriteStock"
                form={formName}
                hidden
                value={overwrite ? 1 : 0}
              />
            </div>

            {!overwrite ? (
              <div>
                <p>current: {placeholder}</p>
                <Input
                  className="w-fit"
                  placeholder={"0"}
                  name={inputName}
                  id={inputName}
                  // value={state}
                  defaultValue={0}
                  // onChange={(e) => {
                  //   placeholder && setState(e.target.value);
                  // }}
                  form={formName}
                  step={1}
                  type="number"
                />
              </div>
            ) : (
              <div>
                <p>current: {placeholder}</p>
                <Input
                  key={Math.random()}
                  className="w-fit"
                  placeholder={placeholder}
                  name={inputName}
                  id={inputName}
                  defaultValue={placeholder}
                  // onChange={(e) => {
                  //   placeholder && setState(e.target.value);
                  // }}
                  form={formName}
                  step={1}
                  type="number"
                />
              </div>
            )}
          </div>
        ) : (
          <Input
            placeholder={placeholder?.toString()}
            type="input"
            name={inputName}
            id={inputName}
            defaultValue={placeholder}
            // onChange={(e) => {
            //   placeholder && setState(e.target.value);
            // }}
            form={formName}
          />
        )
      ) : (
        <Textarea
          className=""
          placeholder={placeholder?.toString()}
          name={inputName}
          id={inputName}
          defaultValue={placeholder}
          // onChange={(e) => {
          //   placeholder && setState(e.target.value);
          // }}
          form={formName}
        />
      )}
    </div>
  );
}
