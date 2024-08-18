import { columns, Product } from "../_components/Table/Columns.tsx";
import { DataTable } from "../_components/Table/DataTable";
import { getProducts } from "../_fetches/products";

export default async function page() {
  const products: Product[] = await getProducts();

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
