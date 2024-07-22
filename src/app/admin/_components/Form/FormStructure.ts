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
