"use client";

import Image from "next/image";
import Link from "next/link";
import ImageButtonAction from "./ImageButtonAction";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { deleteImages } from "@/app/admin/_actions/images";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  productId: number;
  hasVariants: boolean;
  images: {
    id: number;
    url: string;
    isUsed: boolean;
    productId: number | null;
    variantId: number | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

interface deleteImage {
  id: string;
  url: string;
}

export default function ImageList({ productId, images, hasVariants }: Props) {
  const initialState = {
    status: "",
    message: [""],
  };
  const [state, formAction] = useFormState(deleteImages, initialState);

  const [deleteArray, setDeleteArray] = useState<deleteImage[]>([]);
  useEffect(() => {
    if (state && state.status === "error") {
      console.log(state);
    }
    if (state && state.status === "success") {
      //   if (ref.current) ref.current.reset();
      //   setSelectionTarget("");
      //   console.log(state);
      //   if (state.message.length > 1) {
      //     redirect(`./${state.message[1]}`);
      //   }
    }
  }, [state]);

  const handleChecked = (checked: boolean, url: string, id: string) => {
    if (checked) {
      setDeleteArray((prevArray) => [...prevArray, { id, url }]);
    } else {
      setDeleteArray((prevArray) =>
        prevArray.filter((item) => item.url !== url || item.id !== id)
      );
    }
  };

  useEffect(() => {
    console.log(deleteArray);
  });

  return (
    <div>
      <h2>Product Images:</h2>
      <ul className="mb-10">
        {images.map((el, i) => {
          return (
            <li key={el.url}>
              <input
                onChange={(e) =>
                  handleChecked(e.target.checked, el.url, el.id.toString())
                }
                id="image"
                name="image"
                type="checkbox"
              />
              <div>
                <Link target="_blank" href={el.url}>
                  <Image
                    className="w-[300px] h-auto bg-gray-500"
                    alt={i === 0 ? "main picture" : "product picture"}
                    src={el.url}
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
            </li>
          );
        })}

        {images.length === deleteArray.length && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  className="absolute opacity-0 cursor-not-allowed"
                >
                  Delete Images
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cannot delete all</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <form id="deleteImage" action={formAction}>
          <input
            type="hidden"
            name="images"
            form="deleteImage"
            value={JSON.stringify(deleteArray)}
          />
          <input
            type="hidden"
            name="productId"
            form="deleteImage"
            value={productId}
          />
          <Button
            disabled={images.length === deleteArray?.length}
            form="deleteImage"
          >
            Delete Images
          </Button>
        </form>
      </ul>

      {hasVariants && (
        <div>
          <h2>Variant Images:</h2>
          <ul>
            {images.map((el) => {
              if (!el.variantId) return null;
              return (
                <li key={el.url}>
                  <div>
                    <Link target="_blank" href={el.url}>
                      <Image
                        className="w-[300px] h-auto bg-red-500"
                        alt={`${el.productId} pic`}
                        src={el.url}
                        width={300}
                        height={300}
                      />
                    </Link>
                    <p>{el.productId}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
