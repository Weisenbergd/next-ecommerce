import { TypeColor, TypeSize } from "@/lib/types";
import VariantTable from "../Table/VariantTable";
import VariantCheckbox from "./VariantCheckbox";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  hasVariants: number;
  colors: TypeColor[];
  sizes: TypeSize[];
  setHasVariants: React.Dispatch<React.SetStateAction<number>>;
};

export default function VariantCheckBoxTable({
  hasVariants,
  colors,
  sizes,
  setHasVariants,
}: Props) {
  const [variantTable, setVariantTable] = useState(0);
  const [variantColors, setVariantColors] = useState<
    { color: string; id: string }[]
  >([]);
  const [variantSizes, setVariantSizes] = useState<
    { size: string; id: string }[]
  >([]);

  function handleVariant(
    varName: string, // "cool blue"
    name: string, // "color" or "colorId"
    id: string, // 83984
    checked: boolean
  ) {
    if (checked === true) {
      if (name === "sizeId" || name === "size") {
        console.log("this is in the sizeid");
        setVariantSizes([...variantSizes, { size: varName, id }]);
      }
      if (name === "colorId" || name === "color") {
        console.log("this is in the colorid");
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
    <>
      <div>
        <h2>Will this product have different variants?</h2>
        <div>
          <Button
            type="button"
            onClick={() => {
              setHasVariants(1);
            }}
            disabled={hasVariants ? true : false}
          >
            Yes
          </Button>
          <Button type="button" onClick={() => setHasVariants(0)}>
            No
          </Button>
        </div>
      </div>
      {hasVariants && (
        <VariantCheckbox
          colors={colors}
          sizes={sizes}
          handleVariant={handleVariant}
          setVariantTable={setVariantTable}
        />
      )}
      {variantTable && (
        <VariantTable
          variantColors={variantColors}
          variantSizes={variantSizes}
        />
      )}
      <input type="hidden" name="varNum" value={variantColors.length} />
    </>
  );
}
