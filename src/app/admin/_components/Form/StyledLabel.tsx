import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HTMLAttributes, LabelHTMLAttributes } from "react";

type Props = {} & LabelHTMLAttributes<HTMLLabelElement>;

export default function StyledLabel({ className, ...props }: Props) {
  return (
    <Label {...props} className={cn("text-base", className)}>
      {props.children}
    </Label>
  );
}
