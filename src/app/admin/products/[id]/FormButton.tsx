import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  form: string;
  action: any;
  hiddenInputNames: string;
  hiddenInputValues: number;
}

export default function FormButton({
  children,
  form,
  action,
  hiddenInputNames,
  hiddenInputValues,
}: Props) {
  return (
    <div>
      <Button form={form}>{children}</Button>
      <form id={form} action={action} hidden></form>
      <input
        hidden
        name={hiddenInputNames}
        defaultValue={hiddenInputValues}
        form={form}
      />
    </div>
  );
}
