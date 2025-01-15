import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeActionForm, TypeEditting } from "@/lib/types";
import clsx from "clsx";
import { Dispatch, HtmlHTMLAttributes, ReactNode, SetStateAction } from "react";

type Props = {
  children?: ReactNode;
  triggerText: string;
  menuLabel: string;
  editting: TypeEditting;
  setEditting: (value: SetStateAction<TypeEditting>) => void;
  category: string;
  target: number;
  deleteAction: (payload: FormData) => void;
  form: string;
  hiddenInputNames: string;
  hiddenInputValues: number;
  showAdd: boolean;
  setShowAdd: Dispatch<SetStateAction<boolean>>;
} & HtmlHTMLAttributes<HTMLDivElement>;

export default function StyledDropDown({
  triggerText,
  menuLabel,
  editting,
  setEditting,
  category,
  target,
  deleteAction,
  form,
  hiddenInputNames,
  hiddenInputValues,
  showAdd,
  setShowAdd,
  className,
  ...props
}: Props) {
  return (
    <>
      {(editting.category === category && editting.target === target) ||
      showAdd ? (
        <button
          className={`p-2 text-highlight rounded-lg shadow-sm border border-highlight  ${
            category === "group" ? "bg-background" : "bg-secondary"
          }`}
          onClick={() => {
            setEditting({ category: "", target: -1 });
            setShowAdd(false);
          }}
        >
          cancel
        </button>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className={
                  category === "group" || category === "variant"
                    ? "text-highlight"
                    : ""
                }
              >
                {triggerText}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="capitalize">
              <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setEditting({ category, target })}
              >
                {`edit ${category}`}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form id="deleteForm" action={deleteAction} hidden></form>
                <input
                  hidden
                  name={hiddenInputNames}
                  defaultValue={hiddenInputValues}
                  form="deleteForm"
                />
                <button
                  className="capitalize"
                  form="deleteForm"
                >{`delete ${category}`}</button>
              </DropdownMenuItem>
              {category != "variant" && (
                <DropdownMenuItem
                  onClick={() => {
                    setShowAdd(true);
                  }}
                >
                  {`add new ${
                    category === "product"
                      ? "group"
                      : category === "group"
                      ? "variants"
                      : ""
                  }`}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}
