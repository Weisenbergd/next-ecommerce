import { deleteVariant } from "@/app/admin/_actions/Variants/deleteVariant";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import EditButton from "../EditButton";
import FormButton from "../FormButton";
import { editVariant } from "@/app/admin/_actions/Variants/editVariant";
import LabelSelection from "@/app/admin/_components/Form/LabelSelection";
import InputEdit from "@/app/admin/_components/Form/InputEdit";
import { TypeIndexVariant, TypeSize, TypeVariant } from "@/lib/types";

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
};

export default function VariantInfo({
  variant,
  sizes,
  editting,
  setEditting,
  initialState,
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

  return (
    <ol>
      {variantFormat.map((name, i) => {
        return (
          <li key={name}>
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
          </li>
        );
      })}
      <li>
        <EditButton
          editting={editting}
          setEditting={setEditting}
          category="variant"
          target={variant.id}
        >
          Edit Variant
        </EditButton>
        {editting.category === "variant" && editting.target === variant.id && (
          <div>
            <FormButton
              form="editVariant"
              action={editVariantAction}
              hiddenInputNames="variantId"
              hiddenInputValues={variant.id}
            >
              Submit Changes!!!!!!
            </FormButton>
            <FormButton
              form="deleteVariant"
              action={deleteVariantAction}
              hiddenInputNames="variantId"
              hiddenInputValues={variant.id}
            >
              Delete Variant
            </FormButton>
          </div>
        )}
      </li>
    </ol>
  );
}
