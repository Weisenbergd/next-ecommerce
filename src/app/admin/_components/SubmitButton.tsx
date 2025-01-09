import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  form?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({ form, ...buttonProps }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button form={form} {...buttonProps}>
      {pending ? "Saving..." : buttonProps.children || "Submit"}
    </Button>
  );
}
