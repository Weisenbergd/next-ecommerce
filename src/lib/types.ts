export type DeepProduct = {
  variantGroups: VariantGroup[];
} & Dates &
  LightProduct;

export type LightProduct = {
  categoryId: number;
} & Dates &
  IDNAMEDESC;

export type Variant = {
  size: Size;
  id: number;
  stock: number;
  price: number;
  productId: number;
} & Dates;

export type VariantGroup = {
  id: number;
  productId: number;
  colorId: number;
  images: {
    url: string;
  }[];
  color: Color;
  variants: Variant[];
} & Dates;

export type Size = {} & IDNAMEDESC;
export type Category = {} & IDNAMEDESC;
export type Color = {} & IDNAMEDESC;

export type IDNAMEDESC = {
  id: number;
  name: string;
  description?: string;
} & Partial<Dates>;

export type Dates = {
  createdAt: Date;
  updatedAt: Date;
};
