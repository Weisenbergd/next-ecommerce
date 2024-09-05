import { editProduct } from "@/app/admin/_actions/products";
import FormAbstract from "@/app/admin/_components/Form/FormAbstract";
import { productForm } from "@/app/admin/_components/Form/FormStructure";
import {
  getCategories,
  getColors,
  getSingleProduct,
  getSizes,
} from "@/app/admin/_fetches/products";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
  setSearchParams: () => {};
}

export default async function page(props: Props) {
  let product;
  try {
    product = await getSingleProduct(parseInt(props.params.id));
  } catch (error) {}

  if (!product) return <p>product doesn't exist</p>;

  const categories = await getCategories();
  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <div>
      <Link href={`./`}>Cancel edit</Link>
      <FormAbstract
        edit={{ edit: "true", id: product.id, variants: product.variants }}
        action={editProduct}
        hasVariants={product.hasVariants}
        category={categories}
        size={sizes}
        color={colors}
        formStructure={productForm}
        placeholders={{
          name: product.name,
          description: product.description,
          baseprice: product.basePrice,
          stock: product.variants[0].stock,
          price: product.variants[0].price,
        }}
        selectPlaceholders={{
          image: product.image[0].url,
          category: product.category.id,
          color: product.variants[0].color.id,
          size: product.variants[0].size.id,
        }}
      />
    </div>
  );
}
