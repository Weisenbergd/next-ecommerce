import { getColors } from "../../_fetches/products";

export default async function page() {
  const colors = await getColors();

  return (
    <div>
      {colors.map((el) => {
        return <p>{el.name}</p>;
      })}
    </div>
  );
}
