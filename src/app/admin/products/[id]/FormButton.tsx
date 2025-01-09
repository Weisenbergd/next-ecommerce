import { Button } from "@/components/ui/button";
import { TypeActionForm } from "@/lib/types";
import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  form: string;
  action: TypeActionForm;
  hiddenInputNames: string;
  hiddenInputValues: number;
} & HTMLAttributes<HTMLButtonElement>;

export default function FormButton({
  children,
  form,
  action,
  hiddenInputNames,
  hiddenInputValues,
  className,
}: Props) {
  return (
    <>
      <Button className={clsx(``, className)} form={form}>
        {children}
      </Button>
      <form id={form} action={action} hidden></form>
      <input
        hidden
        name={hiddenInputNames}
        defaultValue={hiddenInputValues}
        form={form}
      />
    </>
  );
}
