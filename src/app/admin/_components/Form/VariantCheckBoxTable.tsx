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
    e: ChangeEvent<HTMLInputElement>,
    name: string,
    id: string
  ) {
    if (e.target.checked === true) {
      if (name === "sizeId") {
        console.log("this is in the sizeid");
        setVariantSizes([...variantSizes, { size: e.target.name, id }]);
      }
      if (name === "colorId") {
        console.log("this is in the colorid");
        setVariantColors([...variantColors, { color: e.target.name, id }]);
      }
    } else {
      if (name === "sizeId") {
        const updatedSizes = variantSizes.filter(
          (el) => el.size !== e.target.name
        );
        setVariantSizes(updatedSizes);
      }
      if (name === "colorId") {
        const updatedColors = variantColors.filter(
          (el) => el.color !== e.target.name
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
