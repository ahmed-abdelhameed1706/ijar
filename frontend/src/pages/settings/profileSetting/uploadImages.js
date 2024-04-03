import storage from "@/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import axios from "@/api/axios";

export default async function uploadImage(
  image,
  values,
  setImageUrl,
  token,
  signIn,
) {
  const storageRef = ref(storage, `/users/${v4()}`);

  const uploadPromise = uploadBytes(storageRef, image);
  toast.promise(uploadPromise, {
    pending: "Uploading image...",
    success: "Image uploaded successfully!",
    error: "Error uploading image",
  });

  uploadPromise
    .then((snapshot) => {
      const getDownloadURLPromise = getDownloadURL(snapshot.ref);

      return getDownloadURLPromise;
    })
    .then((url) => {
      setImageUrl(url);

      const updateUserDataPromise = axios.put(
        "/api/users",
        JSON.stringify({
          ...values,
          imageUrl: url,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        },
      );

      return updateUserDataPromise;
    })
    .then((response) => {
      signIn({
        auth: {
          token: response.data.accessToken,
          expiresIn: 3600,
          tokenType: "Bearer",
        },
        userState: {
          userId: response.data.userId,
          fullName: response.data.fullName,
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
          role: response.data.role,
          brithDate: response.data.brithDate,
          address: response.data.address,
          imageUrl: response.data.imageUrl,
        },
      });
      toast.success("Account data updated successfully.");
      window.location.reload();
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);

        if (error.response.data.message1) {
          setTimeout(() => {
            toast.info(error.response.data.message1);
          }, 6002);
        }
      } else {
        toast.error(error.message);
      }
    });
}
