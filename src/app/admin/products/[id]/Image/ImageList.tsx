import ImageWithFallback from "@/app/admin/_components/ImageWithFallback";

interface Props {
  imageIndex: number;
  groupIndex: number;
  el: any;
  editting: any;
  imageCheckFunction: any;
  product: any;
}

export default function ImageList({
  imageIndex,
  groupIndex,
  el,
  editting,
  imageCheckFunction,
  product,
}: Props) {
  return (
    <div>
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
