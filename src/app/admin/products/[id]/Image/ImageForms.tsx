import { Button } from "@/components/ui/button";
import { TypeDeepProduct, TypeVariantGroup } from "@/lib/types";

type Props = {
  variantGroup: TypeVariantGroup;
  product: TypeDeepProduct;
  addImagesAction: (payload: FormData) => void;
  deleteImagesAction: (payload: FormData) => void;
  deleteImagesArray: string[];
};

export default function ImageForms({
  variantGroup,
  product,
  addImagesAction,
  deleteImagesAction,
  deleteImagesArray,
}: Props) {
  return (
    <div>
      <Button form="addImages">add Images</Button>
      <input form="addImages" type="file" multiple name="images" />
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

      <input
        form="deleteImages"
        hidden
        name="deleteImageArray"
        defaultValue={deleteImagesArray}
      />
      <form id="deleteImages" hidden action={deleteImagesAction} />
    </div>
  );
}
