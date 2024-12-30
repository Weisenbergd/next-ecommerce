import { TypeColor, TypeSize } from "@/lib/types";
import { variantForm } from "./FormStructure";
import { Button } from "@/components/ui/button";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  sizes: TypeSize[];
  colors: TypeColor[];
  handleVariant(
    e: ChangeEvent<HTMLInputElement>,
    name: string,
    id: string
  ): void;
  setVariantTable: Dispatch<SetStateAction<number>>;
};

export default function VariantCheckbox({
  sizes,
  colors,
  handleVariant,
  setVariantTable,
}: Props) {
  return (
    <div>
      {variantForm.map((variantOutline) => {
        if (variantOutline.name != "colorId" && variantOutline.name != "sizeId")
          return null;
        let x = variantOutline.label.toLowerCase();
        let mapVar = variantOutline.label === "Size" ? sizes : colors;
        return (
          <div
            className="bg-slate-800 flex flex-col gap-6 mb-10"
            key={variantOutline.name}
          >
            <h2>{variantOutline.label}s</h2>
            <Button
              onClick={(e) => {}}
              variant="ghost"
              size="sm"
              className="absolute left-64"
              type="button"
            >
              Add new {variantOutline.label} FIx This!!!
            </Button>

            {mapVar.map((variant) => {
              return (
                <div key={`${variantOutline.label}-${variant.id}`}>
                  <label htmlFor={variant.name}>{variant.name}</label>
                  <input
                    key={`${variantOutline.label}-${variant.id}`}
                    form="variantForm"
                    name={variant.name}
                    id={`${variantOutline.label}-${variant.id}`}
                    type="checkbox"
                    onChange={(e) =>
                      handleVariant(
                        e,
                        variantOutline.name,
                        variant.id.toString()
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setVariantTable(1);
        }}
      >
        test
      </Button>
    </div>
  );
}
