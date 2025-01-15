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
import {
  TypeColor,
  TypeDeepProduct,
  TypeInitialState,
  TypeSize,
  TypeVariantGroup,
} from "@/lib/types";
import PreFormButton from "../PreFormButton";
import { addGroup } from "@/app/admin/_actions/Groups/addGroup";
import { deleteProduct } from "@/app/admin/_actions/Products/deleteProduct";
import StyledDropDown from "@/app/admin/_components/StyledDropDown";
import VariantCheckBoxTable from "@/app/admin/_components/Form/VariantCheckBoxTable";
import { addVariant } from "@/app/admin/_actions/Variants/addVariant";
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
  sizes: TypeSize[];
} & HTMLAttributes<HTMLDivElement>;

export default function GroupInfo({
  variantGroup,
  colors,
  editting,
  setEditting,
  initialState,
  product,
  sizes,
  ...props
}: Props) {
  // status working

  const state: TypeInitialState = {
    status: "",
    message: [],
  };

  const [editGroupState, editGroupAction] = useFormState(
    editGroup,
    initialState
  );

  const [deleteGroupState, deleteGroupAction] = useFormState(
    deleteGroup,
    initialState
  );

  const [addVariantState, addVariantAction] = useFormState(
    addVariant,
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

          <div className="">
            <StyledDropDown
              form="editVariantGroup"
              editting={editting}
              setEditting={setEditting}
              category="group"
              target={variantGroup.id}
              triggerText="edit"
              deleteAction={deleteGroupAction}
              hiddenInputNames="variantGroupId"
              hiddenInputValues={variantGroup.id}
              showAdd={showAddVariant}
              setShowAdd={setShowAddVariant}
              menuLabel="Edit Group"
            />
          </div>

          <FormButton
            className="w-full"
            form="editVariantGroup"
            action={editGroupAction}
            hiddenInputNames="variantGroupId"
            hiddenInputValues={variantGroup.id}
            state={editGroupState}
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
          <div className="">
            <StyledDropDown
              form="editVariantGroup"
              editting={editting}
              setEditting={setEditting}
              category="group"
              target={variantGroup.id}
              triggerText="edit"
              deleteAction={deleteGroupAction}
              hiddenInputNames="variantGroupId"
              hiddenInputValues={variantGroup.id}
              showAdd={showAddVariant}
              setShowAdd={setShowAddVariant}
              menuLabel="Edit Group"
            />
          </div>
          {showAddVariant && (
            <VariantCheckBoxTable
              form="addVariants"
              hiddenInputNames="groupId"
              hiddenInputValues={variantGroup.id}
              action={addVariantAction}
              colors={colors}
              sizes={sizes}
              hasVariants={1}
              state={state}
              sizesOnly={true}
              selectedColors={[variantGroup.color]}
              selectedSizes={variantGroup.variants.map(
                (variant) => variant.size
              )}
            />
          )}
        </div>
      )}
    </div>
  );
}
