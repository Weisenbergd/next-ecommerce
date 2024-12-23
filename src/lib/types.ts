import { Dispatch, SetStateAction } from "react";

export type TypeDeepProduct = {
  variantGroups: TypeVariantGroup[];
} & TypeDates &
  TypeLightProduct;

export type TypeIndexDeepProduct = TypeDeepProduct & {
  [key: string]: any;
};

export type TypeIndexVariant = TypeVariant & {
  [key: string]: any;
};

export type TypeLightProduct = {
  categoryId: number;
} & TypeDates &
  TypeIDNAMEDESC;

export type TypeVariant = {
  size: TypeSize;
  id: number;
  stock: number;
  price: number;
  productId: number;
} & TypeDates;

export type TypeVariantGroup = {
  id: number;
  productId: number;
  colorId: number;
  images: {
    url: string;
  }[];
  color: TypeColor;
  variants: TypeVariant[];
} & TypeDates;

export type TypeSize = {} & TypeIDNAMEDESC;
export type TypeCategory = {} & TypeIDNAMEDESC;
export type TypeColor = {} & TypeIDNAMEDESC;

export type TypeIDNAMEDESC = {
  id: number;
  name: string;
  description?: string;
} & Partial<TypeDates>;

export type TypeDates = {
  createdAt: Date;
  updatedAt: Date;
};

export type TypeEditting = {
  category: string;
  target: number;
};

export type TypeSetEditting = Dispatch<SetStateAction<TypeEditting>>;

export type TypeInitialState = {
  status: string;
  message: (string | number)[];
};

export type TypeActionForm<T = any> = (args: T) => void;

export type TypeAction = (
  prevState: any,
  formData: FormData
) => Promise<{ status: string; message: (string | number)[] }>;

export type TypeFormStructure = {
  label: string;
  name: string;
  input: string;
  required: boolean;
  variant?: boolean;
}[];

export type TypeInputPlaceholders = {
  name: string;
  description: string;
  baseprice: number;
  stock: number;
  price: number;
};

export type TypeSelectPlaceholders = {
  image: string;
  category: number;
  color: number;
  size: number;
};
