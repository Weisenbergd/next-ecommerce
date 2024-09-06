import { getAllImages } from "../../_actions/images";
import ImageList from "./imagelist";

export default async function page() {
  const images = await getAllImages();
  // console.log(images);

  return !images ? (
    <p>no images</p>
  ) : (
    <div>
      {images.map((el) => {
        return <ImageList el={el} />;
      })}
    </div>
  );
}
