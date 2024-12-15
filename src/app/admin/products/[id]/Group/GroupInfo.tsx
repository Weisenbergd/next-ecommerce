import { useEffect } from "react";
import { useFormState } from "react-dom";

import InputSelection from "@/app/admin/_components/Form/InputSelection";
import EditButton from "../EditButton";
import FormButton from "../FormButton";
import { deleteGroup } from "@/app/admin/_actions/Groups/deleteGroup";
import { editGroup } from "@/app/admin/_actions/Groups/editGroup";
interface Props {
  variantGroup: any;
  colors: any;
  editting: any;
  setEditting: any;
  initialState: any;
}

export default function GroupInfo({
  variantGroup,
  colors,
  editting,
  setEditting,
  initialState,
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

  useEffect(() => {
    if (editGroupState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }
  }, [editGroupState]);

  return (
    <div>
      {editting.category === "group" && editting.target === variantGroup.id ? (
        <div>
          <InputSelection
            inputName="colorId"
            placeholder={variantGroup.color?.name!}
            id={variantGroup.colorId!}
            selection={colors}
            form="editVariantGroup"
            label={`${variantGroup.id}`}
            editting={true}
          />
          <FormButton
            form="editVariantGroup"
            action={editGroupAction}
            hiddenInputNames="variantGroupId"
            hiddenInputValues={variantGroup.id}
          >
            Submit
          </FormButton>
          <FormButton
            form="deleteVariantGroup"
            action={deleteGroupAction}
            hiddenInputNames="variantGroupId"
            hiddenInputValues={variantGroup.id}
          >
            Delete Group
          </FormButton>
        </div>
      ) : (
        <h2>
          {variantGroup.id}. Variant{" "}
          {(variantGroup.color && variantGroup.color.name) ||
            "error -- there should variant colors"}
        </h2>
      )}
      <EditButton
        editting={editting}
        setEditting={setEditting}
        category="group"
        target={variantGroup.id}
      >
        Edit Group
      </EditButton>
    </div>
  );
}
