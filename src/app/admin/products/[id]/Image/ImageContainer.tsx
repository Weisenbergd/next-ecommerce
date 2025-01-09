import { Button } from "@/components/ui/button";
import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useFormState } from "react-dom";
import ImageList from "./ImageList";
import ImageForms from "./ImageForms";
import { deleteImages } from "@/app/admin/_actions/Images/imagesDelete";
import { addImages } from "@/app/admin/_actions/Images/imagesAdd";
import EditButton from "../EditButton";
import { TypeDeepProduct, TypeVariantGroup } from "@/lib/types";

type Props = {
  setEditting: Dispatch<
    SetStateAction<{
      category: string;
      target: number;
    }>
  >;
  groupIndex: number;
  variantGroup: TypeVariantGroup;
  product: TypeDeepProduct;
  editting: {
    category: string;
    target: number;
  };
  initialState: {
    status: string;
    message: (string | number)[];
  };
} & HTMLAttributes<HTMLDivElement>;

export default function ImageContainer({
  variantGroup,
  product,
  setEditting,
  editting,
  groupIndex,
  initialState,
  ...props
}: Props) {
  const [deleteImagesState, deleteImagesAction] = useFormState(
    deleteImages,
    initialState
  );
  const [addImagesState, addImagesAction] = useFormState(
    addImages,
    initialState
  );

  const [deleteImagesArray, setDeleteImagesArray] = useState<string[]>([]);

  function imageCheckFunction(e: ChangeEvent<HTMLInputElement>, url: string) {
    if (e.target.checked === false) {
      let newArray = [];
      for (let value of deleteImagesArray) {
        if (value != url) newArray.push(value);
      }
      setDeleteImagesArray(newArray);
    }
    if (e.target.checked === true) {
      setDeleteImagesArray([...deleteImagesArray, url]);
    }
  }

  useEffect(() => {
    if (addImagesState?.status === "success") {
      setEditting({ category: "", target: -1 });
    }
  }, [addImagesState]);
  return (
    <div {...props}>
      {variantGroup.images[0] &&
        variantGroup.images[0].url &&
        variantGroup.images.map(
          (
            el: {
              url: string;
            },
            imageIndex: number
          ) => {
            return (
              <ImageList
                key={imageIndex}
                imageIndex={imageIndex}
                groupIndex={groupIndex}
                el={el}
                editting={editting}
                product={product}
                imageCheckFunction={imageCheckFunction}
              />
            );
          }
        )}
      <div>
        {editting.category === "images" && editting.target === groupIndex && (
          <Button form="deleteImages">delete images</Button>
        )}
        {editting.category === "images" && editting.target === groupIndex && (
          <ImageForms
            product={product}
            variantGroup={variantGroup}
            addImagesAction={addImagesAction}
            deleteImagesAction={deleteImagesAction}
            deleteImagesArray={deleteImagesArray}
          />
        )}
        <EditButton
          editting={editting}
          setEditting={setEditting}
          category="images"
          target={groupIndex}
        >
          edit images
        </EditButton>
      </div>
    </div>
  );
}
