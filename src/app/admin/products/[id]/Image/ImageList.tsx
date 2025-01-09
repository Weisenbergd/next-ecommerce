import ImageWithFallback from "@/app/admin/_components/ImageWithFallback";
import { TypeDeepProduct } from "@/lib/types";
import { ChangeEvent } from "react";

type Props = {
  imageIndex: number;
  groupIndex: number;
  el: {
    url: string;
  };
  editting: {
    category: string;
    target: number;
  };
  imageCheckFunction(e: ChangeEvent<HTMLInputElement>, url: string): void;
  product: TypeDeepProduct;
};

export default function ImageList({
  imageIndex,
  groupIndex,
  el,
  editting,
  imageCheckFunction,
  product,
}: Props) {
  return (
    <div key={imageIndex}>
      {editting.category === "images" && editting.target === groupIndex && (
        <input
          onChange={(e) => imageCheckFunction(e, el.url)}
          type="checkbox"
        />
      )}
      <ImageWithFallback
        key={imageIndex + el.url}
        alt={`${product.name} picture`}
        src={el.url}
        width={400}
        height={400}
      />
    </div>
  );
}
