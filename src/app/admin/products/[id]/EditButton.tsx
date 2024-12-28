import { Button } from "@/components/ui/button";
import { TypeColor, TypeEditting, TypeSetEditting } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  editting: TypeEditting;
  setEditting: TypeSetEditting;
  category: string;
  target: number;
};

export default function EditButton({
  children,
  editting,
  setEditting,
  category,
  target,
}: Props) {
  return (
    <Button
      onClick={() => {
        if (editting.category === category) {
          setEditting({ category: "", target: -1 });
        } else {
          setEditting({ category, target });
        }
      }}
    >
      {editting.target === target && editting.category === category
        ? `Cancel`
        : children}
    </Button>
  );
}
