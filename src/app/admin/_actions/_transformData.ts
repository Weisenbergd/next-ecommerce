// make this better + typescript

export function transformData(props: any) {
  interface VariantType {
    sizeId: string;
    price: string;
    inventory: string;
  }

  interface GroupType {
    description: string;
    images: File[] | null;
    colorId: string;
    variants: VariantType[];
  }
  [];

  if (parseInt(props.varNum) === 0) {
    const images = props.images ? [props.images] : [];
    const variants = [
      { inventory: props.stock, price: props.price, sizeId: props.sizeId },
    ];
    const variantGroups = [{ images, colorId: props.colorId, variants }];

    const product = {
      name: props.name,
      description: props.description,
      categoryId: props.categoryId,
      variantGroups,
    };

    if (product.variantGroups[0].images[0].size === 0) {
      product.variantGroups[0].images = [];
    }

    return product;
  }

  // // if no image -- change to empty array
  // if (props.images.size === 0) props.images = [];
  // // if only one image -- put into an array
  // else if (!props.images.length) props.images = [props.images];
  let transformedObject = {
    name: props.name,
    description: props.description,
    // images: props.images,
    categoryId: props.categoryId,
    variantGroups: <GroupType[]>[],
  };

  let allVariants = [];
  let arrayOfGroupObjects: GroupType[] = [];

  if (parseInt(props.varNum) > 0) {
    for (let i = 0; i < props.varNum; i++) {
      let singleVariant = [];
      const keys = Object.keys(props);
      for (let key of keys) {
        if (key.startsWith(i.toString())) {
          singleVariant.push(key);
        }
      }
      allVariants.push(singleVariant);
    }

    for (let variantGroup of allVariants) {
      // !! the image files come in as an array if more than one
      // but just as a file if single
      // transform to [] if no image
      if (props[variantGroup[0]].size === 0) {
        props[variantGroup[0]] = [];
      }

      let groupObject: GroupType = {
        images: props[variantGroup[0]].size
          ? [props[variantGroup[0]]]
          : props[variantGroup[0]],
        description: props[variantGroup[1]] || null,
        colorId: props[variantGroup[4]],
        variants: <VariantType[]>[],
      };

      // removes image and description (in group)
      variantGroup.shift();
      variantGroup.shift();

      // change this whenever number of inputs changes
      // current logic: aadd; sizeId; colordId; price; inventory;
      const variantInputs = 5;
      const chunk = variantGroup.length / variantInputs;

      for (let i = 0; i < chunk; i++) {
        let sizeVariantArray = [];

        for (let j = 0; j < variantInputs; j++) {
          sizeVariantArray.push(variantGroup[i * variantInputs + j]);
        }

        // if added propert === 0, then skips that variant
        if (props[sizeVariantArray[0]] === "0") continue;
        else if (props[sizeVariantArray[0]] === "1") {
          groupObject.variants.push({
            sizeId: props[sizeVariantArray[1]],
            // colorId does not go in var but group
            // colorId: props[sizeVariantArray[2]],
            price: props[sizeVariantArray[3]],
            inventory: props[sizeVariantArray[4]],
          });
        }
      }
      arrayOfGroupObjects.push(groupObject);
    }
    transformedObject.variantGroups = arrayOfGroupObjects;

    return transformedObject;
  }
}

// example output

/*
{
  name: 'asdf',
  description: 'asdf',
  images: [
    File {
      size: 822457,
      type: 'image/png',
      name: 'Screenshot 2024-09-10 at 12-55-55 Amazon.com COOFANDY Mens Button Up Shirts Long Sleeve Slim Fit Dress Shirts Wrinkle-Free Stretch Shirt Purple Clothing Shoes & Jewelry.png',
      lastModified: 1731717524327
    },
    File {
      size: 1038308,
      type: 'image/png',
      name: 'Screenshot 2024-09-10 at 12-56-04 Amazon.com COOFANDY Mens Button Up Shirts Long Sleeve Slim Fit Dress Shirts Wrinkle-Free Stretch Shirt Purple Clothing Shoes & Jewelry.png',
      lastModified: 1731717524331
    }
  ],
  basePrice: '234',
  categoryId: '269',
  variantGroups: [
    {
      images: [Array],
      description: '234',
      colorId: '30',
      variants: [Array]
    },
    {
      images: [],
      description: '234',
      colorId: '31',
      variants: [Array]
    }
  */
