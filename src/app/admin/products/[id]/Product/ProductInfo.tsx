import { formatDateTime } from "@/lib/functions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
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
    }
    if (deleteProductState?.status === "success") {
      router.refresh;
    }
    if (addGroupState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }
  }, [editProductState, deleteProductState, addGroupState, router]);

  const formatCreatedAt = formatDateTime(product.createdAt);
  const formatUpdatedAt = formatDateTime(product.updatedAt);

  const productFormat = ["name", "description", "category"];
  return (
    // everything inside <ol>
    <>
      {productFormat.map((name, i) => {
        return (
          <li key={name}>
            {name != "category" ? (
              <InputEdit
                editting={editting.category == "product"}
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
                name={name + "Id"}
                selection={categories}
                form="editProduct"
                label={name}
                editting={editting.category == "product"}
                defaultValueId={product.categoryId}
                placeholder={product.category.name}
              />
            )}
          </li>
        );
      })}
      <li>
        createdAt: {formatCreatedAt.formattedDate}--
        {formatCreatedAt.formattedTime}
      </li>
      <li>
        updatedAt {formatUpdatedAt.formattedDate}--
        {formatUpdatedAt.formattedTime}
      </li>
      <li>
        <div>
          <div className="w-64"></div>
        </div>
      </li>
      <li>
        <div>
          {editting.category === "product" && (
            <>
              <FormButton
                form="editProduct"
                action={editProductAction}
                hiddenInputNames="productId"
                hiddenInputValues={product.id}
              >
                Submit Changes
              </FormButton>
              <FormButton
                form="deleteProduct"
                hiddenInputNames="productId"
                hiddenInputValues={product.id}
                action={deleteProductAction}
              >
                Delete Product
              </FormButton>
              <PreFormButton
                label="color"
                action={addGroupAction}
                form="addGroup"
                hiddenInputNames="productId"
                hiddenInputValues={product.id}
                selection={colors}
                colors={colors}
                sizes={sizes}
                groups={product.variantGroups}
              >
                Add Groups
              </PreFormButton>
            </>
          )}
          <EditButton
            editting={editting}
            setEditting={setEditting}
            category="product"
            target={-1}
          >
            Edit Product
          </EditButton>
        </div>
      </li>
    </>
  );
}
