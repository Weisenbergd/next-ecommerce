import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import EditButton from "../EditButton";
import FormButton from "../FormButton";
import { deleteGroup } from "@/app/admin/_actions/Groups/deleteGroup";
import { editGroup } from "@/app/admin/_actions/Groups/editGroup";
import LabelSelection from "@/app/admin/_components/Form/LabelSelection";
import { TypeColor, TypeDeepProduct, TypeVariantGroup } from "@/lib/types";
import PreFormButton from "../PreFormButton";
import { addGroup } from "@/app/admin/_actions/Groups/addGroup";
type Props = {
  variantGroup: TypeVariantGroup;
  colors: TypeColor[];
  editting: {
    category: string;
    target: number;
  };
  initialState: {
    status: string;
    message: (string | number)[];
  };
  setEditting: Dispatch<
    SetStateAction<{
      category: string;
      target: number;
    }>
  >;
  product: TypeDeepProduct;
};

export default function GroupInfo({
  variantGroup,
  colors,
  editting,
  setEditting,
  initialState,
  product,
}: Props) {
  // status working

  const [editGroupState, editGroupAction] = useFormState(
    editGroup,
    initialState
  );
  const [deleteGroupState, deleteGroupAction] = useFormState(
    deleteGroup,
    initialState
  );

  const [addGroupState, addGroupAction] = useFormState(addGroup, initialState);

  useEffect(() => {
    if (editGroupState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }

    if (addGroupState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }

    if (deleteGroupState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }
  }, [editGroupState, addGroupState, deleteGroupState]);

  return (
    <ol>
      {variantGroup.id}.
      {editting.category === "group" && editting.target === variantGroup.id ? (
        <>
          <li>
            <LabelSelection
              name="colorId"
              placeholder={variantGroup.color.name}
              selection={colors}
              label="color"
              editting={true}
              form="editVariantGroup"
              defaultValueId={variantGroup.color.id}
            />
          </li>
          <li>
            <FormButton
              form="editVariantGroup"
              action={editGroupAction}
              hiddenInputNames="variantGroupId"
              hiddenInputValues={variantGroup.id}
            >
              Submit Change
            </FormButton>
            <FormButton
              form="deleteVariantGroup"
              action={deleteGroupAction}
              hiddenInputNames="variantGroupId"
              hiddenInputValues={variantGroup.id}
            >
              Delete Group
            </FormButton>
            <div>
              <PreFormButton
                label="color"
                action={addGroupAction}
                form="addGroup"
                hiddenInputNames="productId"
                hiddenInputValues={product.id}
                selection={colors}
              >
                Add Group
              </PreFormButton>
            </div>
          </li>
        </>
      ) : (
        <li>color: {variantGroup.color.name}</li>
      )}
      <EditButton
        editting={editting}
        setEditting={setEditting}
        category="group"
        target={variantGroup.id}
      >
        Edit Group
      </EditButton>
    </ol>
  );
}
