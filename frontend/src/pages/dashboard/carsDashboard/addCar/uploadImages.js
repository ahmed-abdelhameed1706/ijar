import storage from "@/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

async function uploadImage(image) {
  const storageRef = ref(storage, `/cars/${v4()}`);

  const response = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(response.ref);
  return url;
}

export default async function uploadImages(images) {
  const imagePromises = Array.from(images, (image) => uploadImage(image));

  const imageRes = await Promise.all(imagePromises);
  return imageRes;
}
