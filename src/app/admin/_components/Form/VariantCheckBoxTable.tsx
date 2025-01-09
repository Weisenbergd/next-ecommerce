import { TypeColor, TypeSize, TypeVariantGroup } from "@/lib/types";
import VariantTable from "../Table/VariantTable";
import VariantCheckbox from "./VariantCheckbox";
import { useEffect, useState } from "react";
import StyledLabelInputDiv from "./StyledLabelInputDiv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StyledLabel from "./StyledLabel";
import FormButton from "../../products/[id]/FormButton";
import SubmitButton from "../SubmitButton";

type Props = {
  hasVariants: number;
  colors: TypeColor[];
  sizes: TypeSize[];
  setHasVariants?: React.Dispatch<React.SetStateAction<number>>;
  state: {
    status: string;
    message: any[];
  };
  form?: string;
  groups?: TypeVariantGroup[];
  action?: (payload: FormData) => void;
  hiddenInputNames?: string;
  hiddenInputValues?: number;
};

export default function VariantCheckBoxTable({
  hasVariants,
  colors,
  sizes,
  setHasVariants,
  form,
  state,
  groups,
  action,
  hiddenInputNames,
  hiddenInputValues,
}: Props) {
  const [variantTable, setVariantTable] = useState(0);
  const [variantColors, setVariantColors] = useState<
    { color: string; id: string }[]
  >([]);
  const [variantSizes, setVariantSizes] = useState<
    { size: string; id: string }[]
  >([]);

  const [existingColors, setExistingColors] = useState<number[]>([]);

  useEffect(() => {
    if (groups) {
      const colorIds = groups.map((group) => group.colorId);
      setExistingColors((prevColors) =>
        Array.from(new Set([...prevColors, ...colorIds]))
      );
    }
  }, [groups]);

  function handleVariant(
    varName: string, // "cool blue"
    name: string, // "color" or "colorId"
    id: string, // 83984
    checked: boolean
  ) {
    if (checked === true) {
      if (name === "sizeId" || name === "size") {
        setVariantSizes([...variantSizes, { size: varName, id }]);
      }
      if (name === "colorId" || name === "color") {
        setVariantColors([...variantColors, { color: varName, id }]);
      }
    } else {
      if (name === "sizeId" || name === "size") {
        const updatedSizes = variantSizes.filter((el) => el.size !== varName);
        setVariantSizes(updatedSizes);
      }
      if (name === "colorId" || name === "color") {
        const updatedColors = variantColors.filter(
          (el) => el.color !== varName
        );
        setVariantColors(updatedColors);
      }
    }
  }

  return (
    <div className="">
      <div>
        {setHasVariants ? (
          <StyledLabelInputDiv>
            <StyledLabel>Will this product have multiple variants?</StyledLabel>
            <div>
              <Select
                required
                onValueChange={(e) => {
                  if (e === "no") setHasVariants(0);
                  if (e === "yes") setHasVariants(1);
                }}
                defaultValue="no"
              >
                <SelectTrigger className="border-border">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </StyledLabelInputDiv>
        ) : null}
      </div>
      {hasVariants ? (
        // notes -- has variants is number (can't use && without output '0')
        // todo -- change to boolean -- check backend
        <VariantCheckbox
          colors={colors}
          sizes={sizes}
          handleVariant={handleVariant}
          setVariantTable={setVariantTable}
          existingColors={existingColors}
          variantTable={variantTable}
        />
      ) : null}
      {variantTable ? (
        <div className="flex flex-col gap-6">
          <VariantTable
            variantColors={variantColors}
            variantSizes={variantSizes}
            form={form}
            state={state}
          />

          {form && action && hiddenInputNames && hiddenInputValues ? (
            // this for adding groups in already existing products
            <FormButton
              form={form}
              action={action}
              hiddenInputNames={hiddenInputNames}
              hiddenInputValues={hiddenInputValues}
            >
              Add Group(s)
            </FormButton>
          ) : (
            <SubmitButton className="w-full">Add Product</SubmitButton>
          )}
        </div>
      ) : null}

      <input
        type="hidden"
        name="varNum"
        value={variantColors.length}
        form={form}
      />
    </div>
  );
}
