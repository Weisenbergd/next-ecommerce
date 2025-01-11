import { formatDateTime } from "@/lib/functions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import EditButton from "../EditButton";
import FormButton from "../FormButton";
import { editProduct } from "@/app/admin/_actions/Products/editProduct";
import InputEdit from "@/app/admin/_components/Form/InputEdit";
import LabelSelection from "@/app/admin/_components/Form/LabelSelection";
import {
  TypeCategory,
  TypeColor,
  TypeDeepProduct,
  TypeEditting,
  TypeIndexDeepProduct,
  TypeInitialState,
  TypeSetEditting,
  TypeSize,
} from "@/lib/types";
import { deleteProduct } from "@/app/admin/_actions/Products/deleteProduct";
import { useRouter } from "next/navigation";
import PreFormButton from "../PreFormButton";
import { addGroup } from "@/app/admin/_actions/Groups/addGroup";
import { Button } from "@/components/ui/button";
import StyledDropDown from "@/app/admin/_components/StyledDropDown";
import VariantCheckBoxTable from "@/app/admin/_components/Form/VariantCheckBoxTable";
import Modal from "@/app/admin/_components/Modal/Modal";
import { useModal } from "@/app/admin/_components/Modal/ModalContext";

type Props = {
  editting: TypeEditting;
  setEditting: TypeSetEditting;
  product: TypeDeepProduct;
  categories: TypeCategory[];
  initialState: TypeInitialState;
  colors: TypeColor[];
  sizes: TypeSize[];
};

export default function ProductInfo({
  editting,
  setEditting,
  product,
  categories,
  initialState,
  colors,
  sizes,
}: Props) {
  const [editProductState, editProductAction] = useFormState(
    editProduct,
    initialState
  );

  const router = useRouter();

  const [addGroupState, addGroupAction] = useFormState(addGroup, initialState);
  const [deleteProductState, deleteProductAction] = useFormState(
    deleteProduct,
    initialState
  );

  useEffect(() => {
    if (editProductState?.status === "success") {
      setEditting({ category: "", target: -1 });
      setShowAddGroup(false);
    }
    if (deleteProductState?.status === "success") {
      router.refresh;
    }
    if (addGroupState?.status === "success") {
      setEditting({ category: "", target: -1 });
      setShowAddGroup(false);
    }
  }, [editProductState, deleteProductState, addGroupState, router]);

  const formatCreatedAt = formatDateTime(product.createdAt);
  const formatUpdatedAt = formatDateTime(product.updatedAt);

  const [showAddGroup, setShowAddGroup] = useState(false);

  const productFormat = ["name", "description", "category"];
  return (
    <div className="mt-10 text-lg relative flex flex-col gap-2">
      <div className="w-full flex justify-between px-2 items-center">
        <p className="p-2 px-4 bg-primary text-primary-foreground relative before:absolute before:top-0 before:bottom-0 before:-left-14 before:w-[calc(100%+2rem)] before:bg-primary before:-z-10">
          Product {product.id}
        </p>
      </div>
      {editting.category != "product" ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{product.name}</h1>
          <div className="flex flex-col">
            <span className="font-bold">description:</span>
            <span>{product.description}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">category:</span>{" "}
            <span>{product.category.name}</span>
          </div>
          <div>
            <p>
              <span className="font-bold">createdAt: </span>
              {formatCreatedAt.formattedDate}--
              {formatCreatedAt.formattedTime}
            </p>
            <p>
              <span className="font-bold">updatedAt: </span>{" "}
              {formatUpdatedAt.formattedDate}--
              {formatUpdatedAt.formattedTime}
            </p>
            <div className="p-2 bg-primary text-primary-foreground w-fit mt-2 px-4 rounded-sm">
              <StyledDropDown
                editting={editting}
                setEditting={setEditting}
                category="product"
                target={product.id}
                menuLabel="Edit Product"
                triggerText="edit"
                deleteAction={deleteProductAction}
                form="deleteProduct"
                hiddenInputNames="productId"
                hiddenInputValues={product.id}
                showAdd={showAddGroup}
                setShowAdd={setShowAddGroup}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {productFormat.map((name, i) => {
            return (
              <div key={name} className="">
                {editting.category === "product" &&
                  (name !== "category" ? (
                    <InputEdit
                      editting={editting.category === "product"}
                      label={name}
                      inputName={name}
                      formName="editProduct"
                      placeholder={
                        (product as TypeIndexDeepProduct)[
                          productFormat[productFormat.indexOf(name)]
                        ]
                      }
                    />
                  ) : (
                    <LabelSelection
                      name={`${name}Id`}
                      selection={categories}
                      form="editProduct"
                      label={name}
                      editting={editting.category === "product"}
                      defaultValueId={product.categoryId}
                      placeholder={product.category.name}
                    />
                  ))}
              </div>
            );
          })}
          <div className="flex flex-col gap-4">
            <div className="p-2 w-fit mt-2 px-4 border shadow-sm rounded-sm">
              <StyledDropDown
                editting={editting}
                setEditting={setEditting}
                category="product"
                target={product.id}
                menuLabel="Edit Product"
                triggerText="edit"
                deleteAction={deleteProductAction}
                form="deleteProduct"
                hiddenInputNames="productId"
                hiddenInputValues={product.id}
                showAdd={showAddGroup}
                setShowAdd={setShowAddGroup}
              />
            </div>
            {editting.category === "product" && (
              <div className="w-full flex flex-col">
                <FormButton
                  form="editProduct"
                  action={editProductAction}
                  hiddenInputNames="productId"
                  hiddenInputValues={product.id}
                >
                  Submit Changes
                </FormButton>
              </div>
            )}
          </div>
        </div>
      )}

      {showAddGroup && (
        <div className="relative border-b-2 pb-6">
          <VariantCheckBoxTable
            groups={product.variantGroups}
            colors={colors}
            sizes={sizes}
            hasVariants={1}
            form="addGroup"
            state={addGroupState}
            action={addGroupAction}
            hiddenInputNames="productId"
            hiddenInputValues={product.id}
          />
          <button
            onClick={() => {
              setEditting({ category: "", target: -1 });
              setShowAddGroup(false);
            }}
            className="absolute bottom-0 right-2"
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
}
