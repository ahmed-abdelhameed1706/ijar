import storage from "@/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default async function uploadImage(image) {
  const storageRef = ref(storage, `/users/${v4()}`);

  const response = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(response.ref);
  return url;
}
