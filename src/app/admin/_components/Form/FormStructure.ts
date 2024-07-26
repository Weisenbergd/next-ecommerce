export const categoryForm = [
  { label: "Name", name: "name", input: "text", required: true },
  { label: "Description", name: "description", input: "text", required: true },
];

export const colorForm = [
  { label: "Name", name: "name", input: "text", required: true },
];
export const sizeForm = [
  { label: "Name", name: "name", input: "text", required: true },
];
export const productForm = [
  { label: "Name", name: "name", input: "text", required: true },
  { label: "Description", name: "description", input: "text", required: true },
  { label: "Image", name: "image", input: "text", required: false },
  { label: "Base Price", name: "basePrice", input: "number", required: true },
  { label: "Category", name: "categoryId", input: "selection", required: true },
];

export const variantForm = [
  {
    label: "Product",
    name: "productId",
    input: "selection",
    required: true,
  },
  {
    label: "Stock",
    name: "stock",
    input: "number",
    required: true,
  },
  { label: "Price", name: "price", input: "number", required: true },
  { label: "Color", name: "colorId", input: "selection", required: true },
  { label: "Size", name: "sizeId", input: "selection", required: true },
  {
    label: "Detailed Color",
    name: "detailedColor",
    input: "text",
    required: false,
  },
];
