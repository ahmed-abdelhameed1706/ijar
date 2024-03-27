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

  uploadBytes(storageRef, image)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async (url) => {
          setImageUrl(url);
          try {
            const response = await axios.put(
              "/api/users",
              JSON.stringify({ ...values, imageUrl: url }),
              {
                headers: {
                  "Content-Type": "application/json",
                  authorization: token,
                },
              },
            );
            console.log(response.data);

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
          } catch (e) {
            toast.error(e.response.data.message);
            if (e.response.data.message1) {
              setTimeout(() => {
                toast.info(e.response.data.message1);
              }, 6002);
            }
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    })
    .catch((error) => {
      toast.error(error.message);
    });
}
