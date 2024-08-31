import Image from "next/image";
import { getFireBase } from "../../_actions/_postFireBase";
import { getImages } from "../../_actions/images";
import ImageList from "./imagelist";

export default async function page() {
  const images = await getImages();
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
