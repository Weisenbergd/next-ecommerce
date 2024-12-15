interface OriginalObject {
  [key: string]: any;
}

interface Variant {
  name?: string;
  description?: string;
  stock?: string;
  price?: string;
  colorId?: string;
  sizeId?: string;
  images?: File[]; // Handle images as an array of File objects
}

interface TransformedObject {
  [key: string]: any;
  image?: File[]; // Product images array
  variants?: Variant[];
}

export function transformData(original: {
  [key: string]: any;
}): TransformedObject {
  const data: { [key: string]: any } = {};
  const variants: Variant[] = [];
  const productImages: File[] = []; // Use File type for images
  const varNum = parseInt(original.varNum, 10); // Get the number of variants

  // Initialize empty variant objects based on varNum
  for (let i = 0; i < varNum; i++) {
    variants.push({});
  }

  // Process the object
  for (const [key, values] of Object.entries(original)) {
    // Convert values to an array if it's a single value
    const valueArray = Array.isArray(values) ? values : [values];

    // Flatten array if it contains nested arrays
    const flattenedArray = valueArray.flat();

    // Handle variant images
    const match = key.match(/^(\d+)variant_(.*)$/); // Matches keys like '0variant_name' or '1variant_price'
    if (match) {
      const index = parseInt(match[1]); // Get the variant index (0, 1, etc.)
      const property = match[2]; // Get the property name (name, description, etc.)

      if (!variants[index]) {
        variants[index] = {} as Variant;
      }

      // Handle the specific variant properties
      switch (property) {
        case "name":
          variants[index].name = flattenedArray[0];
          break;
        case "description":
          variants[index].description = flattenedArray[0];
          break;
        case "stock":
          variants[index].stock = flattenedArray[0];
          break;
        case "price":
          variants[index].price = flattenedArray[0];
          break;
        case "colorId":
          variants[index].colorId = flattenedArray[0];
          break;
        case "sizeId":
          variants[index].sizeId = flattenedArray[0];
          break;
        case "image":
          if (!variants[index].images) {
            variants[index].images = [];
          }
          variants[index].images.push(...flattenedArray); // Add all images to the variant
          break;
        default:
          break;
      }
    } else if (key.startsWith("product_image_")) {
      const indexStr = key.split("_")[1];
      const index = parseInt(indexStr);

      // Assign product images
      if (index < productImages.length) {
        productImages[index] = flattenedArray[0]; // Assuming value is File
      } else {
        productImages.push(...flattenedArray); // Add remaining images
      }
    } else if (key === "image") {
      // Handle image property as an array
      if (!data.image) {
        data.image = [];
      }
      data.image.push(...flattenedArray); // Add all images to the array
    } else {
      // Handle non-variant, non-image properties
      data[key] =
        flattenedArray.length === 1 ? flattenedArray[0] : flattenedArray;
    }
  }

  // Add variants array to the data
  data.variants = variants;

  // Ensure the product images array is correctly assigned
  if (productImages.length > 0) {
    data.image = data.image || [];
    data.image.push(...productImages);
  }

  return data;
}
