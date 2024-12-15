import { storage } from "@/lib/firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  list,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

interface Image {
  size: Number;
  type: String;
  name: String;
  lastModified?: Number;
}

export async function postFireBase(image: any) {
  if (!image) return null;

  // const fileData = new Blob([""], { type: image.type });

  try {
    const uniqueName = `${Date.now()}_${image.name}`;
    const storageRef = ref(storage, `images/${uniqueName}`);

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, image);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("_postFireBase success", downloadURL);
    return { url: downloadURL, status: "success" };
  } catch (error) {
    console.error("_postFireBase error, Error uploading image:", error);
    return { url: "", status: (error as Error).message };
  }
}

export async function deleteFireBase(imagePath: string) {
  const imageRef = ref(storage, imagePath);
  if (!imageRef) return;

  try {
    await deleteObject(imageRef);
    console.log(`image at ${imagePath} deleted`);
  } catch (error) {
    console.log(error);
  }
}
