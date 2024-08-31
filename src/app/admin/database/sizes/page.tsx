import { getSizes } from "../../_fetches/products";

export default async function page() {
  const sizes = await getSizes();

  return (
    <div>
      {sizes.map((el) => {
        return <p>{el.name}</p>;
      })}
    </div>
  );
}
