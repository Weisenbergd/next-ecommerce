import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return <Input className="border-border" type={type} ref={ref} {...props} />;
  }
);
Input.displayName = "Input";

export { StyledInput };
