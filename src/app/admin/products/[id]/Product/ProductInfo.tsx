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
  TypeDeepProduct,
  TypeEditting,
  TypeIndexDeepProduct,
  TypeInitialState,
  TypeSetEditting,
} from "@/lib/types";

type Props = {
  editting: TypeEditting;
  setEditting: TypeSetEditting;
  product: TypeDeepProduct;
  categories: TypeCategory[];
  initialState: TypeInitialState;
};

export default function ProductInfo({
  editting,
  setEditting,
  product,
  categories,
  initialState,
}: Props) {
  const [editProductState, editProductAction] = useFormState(
    editProduct,
    initialState
  );

  useEffect(() => {
    if (editProductState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }
  }, [editProductState]);

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
          <EditButton
            editting={editting}
            setEditting={setEditting}
            category="product"
            target={-1}
          >
            Edit Proudct
          </EditButton>
          {editting.category === "product" && (
            <FormButton
              form="editProduct"
              action={editProductAction}
              hiddenInputNames="productId"
              hiddenInputValues={product.id}
            >
              Submit Changes
            </FormButton>
          )}
        </div>
      </li>
    </>
  );
}
