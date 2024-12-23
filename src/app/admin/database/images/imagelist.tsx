"use client";
import Image from "next/image";

type Props = {
  el: {
    id: number;
    url: string;
    isUsed: boolean;
    productId: number | null;
    variantId: number | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function ImageList({ el }: Props) {
  return (
    <div className="relative w-64">
      <Image
        className="w-full h-auto"
        alt={`image ${el.productId}`}
        src={el.url}
        width={500}
        height={500}
      />
    </div>
  );
}
