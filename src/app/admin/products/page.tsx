import {
  getCategories,
  getColors,
  getProducts,
  getSizes,
  getVariants,
} from "../_fetches/products";
import ShowHideWrapper from "../_components/ShowHideWrapper";
import FormAbstract from "../_components/Form/FormAbstract";
import {
  categoryForm,
  colorForm,
  productForm,
  sizeForm,
  variantForm,
} from "../_components/Form/FormStructure";
import TableAbstract from "../_components/Table/TableAbstract";
import {
  categoryHead,
  colorHead,
  productHead,
  sizeHead,
  variantHead,
} from "../_components/Table/TableStructure";
import {
  addCategories,
  deleteCategories,
  editCategories,
} from "../_actions/categories";
import { addColor, deleteColor, editColor } from "../_actions/colors";
import { addSize, deleteSize, editSize } from "../_actions/size";
import { addProduct, deleteProduct, editProduct } from "../_actions/products";
import { addVariant, deleteVariant, editVariant } from "../_actions/variants";

export default async function page() {
  const categoryId = await getCategories();
  const colors = await getColors();
  const sizes = await getSizes();
  const products = await getProducts();
  const variants = await getVariants();

  console.log(variants);
  console.log(products);
  // for (let product of products) {
  //   console.log(product.variants);
  // }

  return (
    <div>
      <div>
        <ShowHideWrapper x="Categories">
          <FormAbstract formStructure={categoryForm} action={addCategories} />
          <TableAbstract
            deleteAction={deleteCategories}
            editAction={editCategories}
            head={categoryHead}
            rows={categoryId}
            name="categories"
          />
        </ShowHideWrapper>
      </div>
      <div>
        <ShowHideWrapper x="Colors">
          <FormAbstract formStructure={colorForm} action={addColor} />
          <TableAbstract
            deleteAction={deleteColor}
            editAction={editColor}
            head={colorHead}
            rows={colors}
            name="colors"
          />
        </ShowHideWrapper>
      </div>
      <div>
        <ShowHideWrapper x="Sizes">
          <FormAbstract formStructure={sizeForm} action={addSize} />
          <TableAbstract
            deleteAction={deleteSize}
            editAction={editSize}
            head={sizeHead}
            rows={sizes}
            name="sizes"
          />
        </ShowHideWrapper>
      </div>
      <div>
        <ShowHideWrapper x="Products">
          <FormAbstract
            formStructure={productForm}
            action={addProduct}
            selections={{ categoryId: categoryId }}
          />
          <TableAbstract
            deleteAction={deleteProduct}
            editAction={editProduct}
            head={productHead}
            rows={products}
            name="products"
            selections={{ categoryId: categoryId }}
          />
        </ShowHideWrapper>
      </div>
      <div>
        <ShowHideWrapper x="Variants">
          <FormAbstract
            formStructure={variantForm}
            action={addVariant}
            selections={{ colorId: colors, sizeId: sizes, productId: products }}
          />
          <TableAbstract
            deleteAction={deleteVariant}
            editAction={editVariant}
            head={variantHead}
            rows={variants}
            name="variants"
            selections={{ colorId: colors, sizeId: sizes, productId: products }}
          />
        </ShowHideWrapper>
      </div>
    </div>
  );
}
