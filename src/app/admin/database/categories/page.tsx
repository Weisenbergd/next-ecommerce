import { getCategories } from "../../_fetches/products";

export default async function page() {
  const categories = await getCategories();

  return (
    <ul>
      {categories.map((el) => {
        return (
          <li>
            {el.name} --- {el.description}
          </li>
        );
      })}
    </ul>
  );
}
