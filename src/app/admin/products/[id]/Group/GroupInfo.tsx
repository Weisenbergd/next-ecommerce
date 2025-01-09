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
import { deleteGroup } from "@/app/admin/_actions/Groups/deleteGroup";
import { editGroup } from "@/app/admin/_actions/Groups/editGroup";
import LabelSelection from "@/app/admin/_components/Form/LabelSelection";
import { TypeColor, TypeDeepProduct, TypeVariantGroup } from "@/lib/types";
import PreFormButton from "../PreFormButton";
import { addGroup } from "@/app/admin/_actions/Groups/addGroup";
import { deleteProduct } from "@/app/admin/_actions/Products/deleteProduct";
import StyledDropDown from "@/app/admin/_components/StyledDropDown";
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
} & HTMLAttributes<HTMLDivElement>;

export default function GroupInfo({
  variantGroup,
  colors,
  editting,
  setEditting,
  initialState,
  product,
  ...props
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

    if (deleteGroupState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }
  }, [editGroupState, deleteGroupState]);

  const [showAddVariant, setShowAddVariant] = useState(false);

  return (
    <div {...props}>
      <div className="flex items-center justify-between ">
        <h3>
          <span className="font-bold">Group Id: </span>
          {variantGroup.id}
        </h3>
        <div className="bg-primary text-primary-foreground rounded-lg p-2">
          <StyledDropDown
            form="editVariantGroup"
            editting={editting}
            setEditting={setEditting}
            category="group"
            target={variantGroup.id}
            triggerText="edit group"
            deleteAction={deleteGroupAction}
            hiddenInputNames="variantGroupId"
            hiddenInputValues={variantGroup.id}
            showAdd={showAddVariant}
            setShowAdd={setShowAddVariant}
            menuLabel="Edit Group"
          />
        </div>
      </div>
      {editting.category === "group" && editting.target === variantGroup.id ? (
        <div className="flex flex-col gap-4">
          <LabelSelection
            name="colorId"
            placeholder={variantGroup.color.name}
            selection={colors}
            label="color"
            editting={true}
            form="editVariantGroup"
            defaultValueId={variantGroup.color.id}
          />

          <FormButton
            className="w-full"
            form="editVariantGroup"
            action={editGroupAction}
            hiddenInputNames="variantGroupId"
            hiddenInputValues={variantGroup.id}
          >
            Submit Change
          </FormButton>
        </div>
      ) : (
        <div>
          <p>
            <span className="font-bold">color: </span>
            {variantGroup.color.name}
          </p>
          {showAddVariant && <p>ass</p>}
        </div>
      )}
    </div>
  );
}
