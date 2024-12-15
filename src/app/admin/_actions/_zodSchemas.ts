import { File } from "buffer";
import { z } from "zod";

// export const fileSchema = z.object({
//   size: z.number().nonnegative(),
//   type: z.string(),
//   name: z.string(),
//   lastModified: z.number().optional(),
// });

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];

export const imageSchema = z
  .instanceof(File)
  //   .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, "File size must be less than 3MB")
  .refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "File must be a PNG");

export const addImageSchema = z.object({
  productId: z.string().transform((str) => parseInt(str, 10)),
  groupId: z.string().transform((str) => parseInt(str, 10)),
  images: z.array(imageSchema),
});

export const deleteVariantSchema = z.object({
  variantId: z.string().transform((str) => parseInt(str, 10)),
});

export const editVariantSchema = z.object({
  variantId: z.string().transform((str) => parseInt(str, 10)),
  price: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0.01, { message: "price must be at least 0.01" })
  ),
  stock: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().gte(0, { message: "stock can't be less than 0" })
  ),
  sizeId: z.string().transform((str) => parseInt(str, 10)),
});

export const deleteGroupSchema = z.object({
  variantGroupId: z.string().transform((str) => parseInt(str, 10)),
});

export const editGroupSchema = z.object({
  variantGroupId: z.string().transform((str) => parseInt(str, 10)),
  colorId: z.string().transform((str) => parseInt(str, 10)),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: "Product Name is required" }),
  description: z.string().min(1, { message: "description required" }),
  // images: z.array(imageSchema),
  // basePrice: z.preprocess(
  //   (a) => parseFloat(a as string),
  //   z.number().gte(0.01, { message: "price must be at least 0.01" })
  // ),
  categoryId: z.string().min(1, { message: "categoryId required" }),
  variantGroups: z.array(
    z.object({
      colorId: z.string().min(1, { message: "colorId required" }),
      // images: imageShema.optional(),
      images: z.array(imageSchema),
      description: z.string(),
      variants: z.array(
        z.object({
          // variantName: z.string(),
          sizeId: z.string().min(1, { message: "sizeId required" }),
          inventory: z.preprocess(
            (a) => parseFloat(a as string),
            z.number().gte(0, { message: "Stock must be at least 0" })
          ),
          price: z.preprocess(
            (a) => parseFloat(a as string),
            z.number().gte(0.01, { message: "price must be at least 0.01" })
          ),
        })
      ),
    })
  ),
});

export const editProductSchema = z.object({
  productId: z.string().transform((str) => parseInt(str, 10)),
  name: z.string().min(1, { message: "Product Name is required" }),
  description: z.string(),
  categoryId: z
    .string()
    .min(1, { message: "categoryId required" })
    .transform((str) => parseInt(str, 10)),
});
