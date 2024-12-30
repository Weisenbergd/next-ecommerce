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
export const productFormBase = [
  { label: "Name", name: "name", input: "text", required: true },
  { label: "Description", name: "description", input: "text", required: true },
  { label: "Category", name: "categoryId", input: "selection", required: true },
];

export const productFormVar = [
  {
    label: "Stock",
    name: "stock",
    input: "number",
    required: true,
    variant: true,
  },
  {
    label: "Price",
    name: "price",
    input: "number",
    required: true,
    variant: true,
  },
  {
    label: "Color",
    name: "colorId",
    input: "selection",
    required: false,
    variant: true,
  },
  {
    label: "Size",
    name: "sizeId",
    input: "selection",
    required: false,
    variant: true,
  },
  {
    label: "Images",
    name: "images",
    input: "file",
    required: false,
    variant: true,
  },
];

// export const productFormVar = [
//   {
//     label: "Color",
//     name: "colorId",
//     input: "selection",
//     required: false,
//     variant: true,
//   },
//   {
//     label: "Size",
//     name: "sizeId",
//     input: "selection",
//     required: false,
//     variant: true,
//   },
//   { label: "Images", name: "images", input: "file", required: false },
//   {
//     label: "Stock",
//     name: "stock",
//     input: "number",
//     required: true,
//     variant: true,
//   },
//   {
//     label: "Price",
//     name: "price",
//     input: "number",
//     required: true,
//     variant: true,
//   },
// ];
