import { Button } from "@/components/ui/button";
import { TypeActionForm } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  form: string;
  action: TypeActionForm;
  hiddenInputNames: string;
  hiddenInputValues: number;
};

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
