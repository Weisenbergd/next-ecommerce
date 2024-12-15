import { deleteVariant } from "@/app/admin/_actions/Variants/deleteVariant";
import InputEdit from "@/app/admin/_components/Form/InputEdit";
import InputSelection from "@/app/admin/_components/Form/InputSelection";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import EditButton from "../EditButton";
import FormButton from "../FormButton";
import { editVariant } from "@/app/admin/_actions/Variants/editVariant";

interface Props {
  variant: any;
  sizes: any;
  editting: any;
  initialState: any;
  setEditting: any;
}

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
    <div>
      {variantFormat.map((name, i) => {
        return (
          <div key={name}>
            {name === "size" ? (
              <InputSelection
                inputName={name + "Id"}
                placeholder={
                  variant[variantFormat[variantFormat.indexOf(name)]].name
                }
                id={variant[name].id!}
                selection={name === "size" && sizes}
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
                placeholder={variant[name].toString()}
              />
            )}
          </div>
        );
      })}
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
    </div>
  );
}
