import { Button } from "@/components/ui/button";
import { TypeActionForm } from "@/lib/types";
import clsx from "clsx";
import { HTMLAttributes, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  form: string;
  action: TypeActionForm;
  hiddenInputNames: string;
  hiddenInputValues: number;
  state: { status: string; message: any };
} & HTMLAttributes<HTMLButtonElement>;

export default function FormButton({
  children,
  form,
  action,
  hiddenInputNames,
  hiddenInputValues,
  className,
  state,
}: Props) {
  useEffect(() => console.log(state));

  // todo -- prevent submition when items remain the same

  return (
    <>
      <Button className={clsx(``, className)} form={form}>
        {children}
      </Button>
      <form id={form} action={action} hidden></form>
      {state.status === "error" &&
      state.message[0] === "unique key constraint" ? (
        form === "editVariant" ? (
          <p className="text-sm text-red-500 font-bold">
            Variant with this size already exists for group
          </p>
        ) : form === "editVariantGroup" ? (
          <p className="text-sm text-red-500 font-bold">
            Group with this color already exists for product
          </p>
        ) : (
          form === "editProduct" && (
            <p className="text-sm text-red-500 font-bold mt-2">
              Product with this name already exists
            </p>
          )
        )
      ) : (
        state.status === "error" && (
          <ul>
            {state.message.map((err: any, i: number) => {
              return <li key={i}>{err}</li>;
            })}
          </ul>
        )
      )}
      <input
        hidden
        name={hiddenInputNames}
        defaultValue={hiddenInputValues}
        form={form}
      />
    </>
  );
}
