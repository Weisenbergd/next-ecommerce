import { deleteVariant } from "@/app/admin/_actions/Variants/deleteVariant";
import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useFormState } from "react-dom";
import EditButton from "../EditButton";
import FormButton from "../FormButton";
import { editVariant } from "@/app/admin/_actions/Variants/editVariant";
import LabelSelection from "@/app/admin/_components/Form/LabelSelection";
import { TypeIndexVariant, TypeSize, TypeVariant } from "@/lib/types";
import InputEdit from "@/app/admin/_components/Form/InputEdit";
import StyledDropDown from "@/app/admin/_components/StyledDropDown";
import clsx from "clsx";

type Props = {
  sizes: TypeSize[];
  setEditting: Dispatch<
    SetStateAction<{
      category: string;
      target: number;
    }>
  >;
  editting: {
    category: string;
    target: number;
  };
  initialState: {
    status: string;
    message: (string | number)[];
  };
  variant: TypeVariant;
} & HTMLAttributes<HTMLDivElement>;

export default function VariantInfo({
  variant,
  sizes,
  editting,
  setEditting,
  initialState,
  ...props
}: Props) {
  const [editVariantState, editVariantAction] = useFormState(
    editVariant,
    initialState
  );

  const [deleteVariantState, deleteVariantAction] = useFormState(
    deleteVariant,
    initialState
  );

  useEffect(() => {
    if (editVariantState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }
  }, [editVariantState]);

  const variantFormat = ["size", "price", "stock"];
  const [showAddVariant, setShowAddVariant] = useState(false);

  return (
    <div className={clsx("", props.className)}>
      <h4>
        <span className="font-bold">Variant Id: </span>
        {variant.id}
      </h4>
      {editting.category != "variant" ||
      (editting.category === "variant" && editting.target != variant.id) ? (
        <>
          <p>
            <span className="font-bold">size: </span>
            {variant.size.name}
          </p>
          <p>
            <span className="font-bold">price: </span>
            {variant.price}
          </p>
          <p>
            <span className="font-bold">stock: </span>
            {variant.stock}
          </p>
          <div className="flex justify-start">
            <StyledDropDown
              form="editVariant"
              editting={editting}
              setEditting={setEditting}
              category="variant"
              target={variant.id}
              triggerText="edit"
              deleteAction={deleteVariantAction}
              hiddenInputNames="variantId"
              hiddenInputValues={variant.id}
              showAdd={showAddVariant}
              setShowAdd={setShowAddVariant}
              menuLabel="Edit Variant"
            />
          </div>
        </>
      ) : (
        <>
          {variantFormat.map((name, i) => {
            return (
              <div key={name} className="">
                {name === "size" ? (
                  <LabelSelection
                    name={name + "Id"}
                    placeholder={variant.size.name}
                    defaultValueId={variant.size.id}
                    selection={sizes}
                    form="editVariant"
                    label={name}
                    editting={
                      editting.category === "variant" &&
                      editting.target === variant.id
                    }
                  />
                ) : (
                  <InputEdit
                    editting={
                      editting.category === "variant" &&
                      editting.target === variant.id
                    }
                    label={name}
                    inputName={name}
                    formName="editVariant"
                    placeholder={(variant as TypeIndexVariant)[name].toString()}
                  />
                )}
              </div>
            );
          })}
        </>
      )}
      {editting.category === "variant" && editting.target === variant.id && (
        <div className="pt-4 flex flex-col gap-4">
          <div className="bg-background w-fit p-2 border shadow-sm ">
            <StyledDropDown
              form="editVariant"
              editting={editting}
              setEditting={setEditting}
              category="variant"
              target={variant.id}
              triggerText="edit"
              deleteAction={deleteVariantAction}
              hiddenInputNames="variantId"
              hiddenInputValues={variant.id}
              showAdd={showAddVariant}
              setShowAdd={setShowAddVariant}
              menuLabel="Edit Variant"
            />
          </div>
          <FormButton
            form="editVariant"
            action={editVariantAction}
            hiddenInputNames="variantId"
            hiddenInputValues={variant.id}
          >
            Submit Changes!!!!!!
          </FormButton>
        </div>
      )}
    </div>
  );
}
