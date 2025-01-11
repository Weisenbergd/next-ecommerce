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
import StyledDropDown from "@/app/admin/_components/StyledDropDown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SubmitButton from "@/app/admin/_components/SubmitButton";
import LabelInput from "@/app/admin/_components/Form/LabelInput";
import { Input } from "@/components/ui/input";

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
  const [showAddImage, setShowAddImage] = useState(false);
  const [addingImages, setAddingImages] = useState(false);
  const [deletingImages, setDeletingImages] = useState(false);

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
      setAddingImages(false);
      setDeletingImages(false);
    }

    if (deleteImagesState?.status === "success") {
      setEditting({ category: "", target: -1 });
      setAddingImages(false);
      setDeletingImages(false);
    }
  }, [addImagesState, deleteImagesState]);
  return (
    <div {...props}>
      <div className="grid md:grid-cols-2 gap-2 xl:grid-cols-3">
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
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <div>
          {addingImages || deletingImages ? (
            <button
              className="p-2 w-fit bg-background text-foreground border shadow-sm"
              onClick={() => {
                setDeletingImages(false);
                setAddingImages(false);
                setShowAddImage(false);
              }}
            >
              cancel
            </button>
          ) : (
            <div className="p-2 w-fit bg-primary text-primary-foreground rounded-sm">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="">Edit Images</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="capitalize">
                  <DropdownMenuLabel>Edit Images</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setAddingImages(true)}>
                    Add Image(s)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setDeletingImages(true);
                      setEditting({ category: "images", target: groupIndex });
                    }}
                  >
                    Delete Image(s)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {addingImages && (
          <div className="flex flex-col gap-4">
            <Input
              form="addImages"
              className="bg-background"
              type="file"
              multiple
              name="images"
            />

            <input
              form="addImages"
              hidden
              name="isVariant"
              defaultValue={variantGroup ? 1 : 0}
            />
            <input
              form="addImages"
              hidden
              name="productId"
              defaultValue={product.id}
            />
            <input
              form="addImages"
              hidden
              name="groupId"
              defaultValue={variantGroup.id}
            />
            <form id="addImages" hidden action={addImagesAction} />
            <SubmitButton form="addImages" className="w-full">
              Submit
            </SubmitButton>
          </div>
        )}
        {deletingImages && (
          <div>
            <input
              form="deleteImages"
              hidden
              name="deleteImageArray"
              defaultValue={deleteImagesArray}
            />
            <form id="deleteImages" hidden action={deleteImagesAction} />
            <SubmitButton form="deleteImages" className="w-full">
              Delete Selected
            </SubmitButton>
          </div>
        )}
      </div>
    </div>
  );
}
