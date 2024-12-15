import { formatDateTime } from "@/lib/functions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import InputSelection from "@/app/admin/_components/Form/InputSelection";
import InputEdit from "@/app/admin/_components/Form/InputEdit";
import EditButton from "../EditButton";
import FormButton from "../FormButton";
import { editProduct } from "@/app/admin/_actions/Products/editProduct";

interface Props {
  editting: any;
  setEditting: any;
  product: any;
  categories: any;
}

export default function ProductInfo({
  editting,
  setEditting,
  product,
  categories,
}: Props) {
  const [initialState, setInitialState] = useState({
    status: "",
    message: [""],
  });
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
    <div className="mb-10">
      <EditButton
        editting={editting}
        setEditting={setEditting}
        category="product"
        target={-1}
      >
        Edit Proudct
      </EditButton>

      <ul>
        {productFormat.map((name, i) => {
          return (
            <li key={name}>
              {name != "category" ? (
                <InputEdit
                  editting={editting.category == "product"}
                  label={name}
                  inputName={name}
                  formName="editProduct"
                  placeholder={product.name}
                />
              ) : (
                <InputSelection
                  inputName={name + "Id"}
                  placeholder={
                    product[productFormat[productFormat.indexOf(name)]].name
                  }
                  id={product[name].id!}
                  selection={name === "category" && categories}
                  form="editProduct"
                  label={name}
                  editting={editting.category == "product"}
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
      </ul>
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
  );
}
