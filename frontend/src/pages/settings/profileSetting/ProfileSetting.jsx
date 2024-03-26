/* eslint-disable react/prop-types */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useState } from "react";
import uploadImage from "./uploadImages";

const ProfileSetting = ({ setOpenBar }) => {

  const signIn = useSignIn();
  const user = useAuthUser();
  const auth = useAuthHeader()
  const token = auth.split(" ")[1]
  const [image, setImage] = useState()
  const [imageUrl, setImageUrl] = useState(user.imageUrl)

  const formSchema = z
  .object({
    fullName: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    brithDate: z
      .string()
      .regex(/\d{4}-\d{2}-\d{2}$/, "Birth Date is required"),
    address: z.string().min(1, { message: "Address is required" }),
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        brithDate: user.brithDate,
        address: user.address,
      },
    });
    
    async function onSubmit(values) {
      if (image) {
        const url = await uploadImage(image);
        setImageUrl(url)
        console.log(imageUrl);
      }
      if ((user.fullName === values.fullName && user.email === values.email && user.phoneNumber === values.phoneNumber && user.address === values.address && !image)) {
        toast.info("Modify the information you want to update before submitting.");
        return;
      }
      try {
        const response = await axios.put(
          "/api/users",
          JSON.stringify({...values, imageUrl}),
          {
            headers: {
              "Content-Type": "application/json",
              authorization: token
            },
          }
        );

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
    }

    return (
        <Card onClick={() => setOpenBar(false)} className="w-full border-none shadow-none">
          <CardHeader className="max-[700px]:text-center">
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
            Review and modify your personal information.
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
              >
              <div className="flex items-center justify-center pb-4 relative">
                <img
                  className="h-[130px] w-[130px] rounded-full object-cover mr-4 outline-none"
                  src={imageUrl ? imageUrl : "https://firebasestorage.googleapis.com/v0/b/ijarapp-11.appspot.com/o/cars%2F98a33308-44eb-4409-93fb-2ae2662f38b3?alt=media&token=12ef59dd-dfdf-4d1c-9e35-c9b7944a1df1"}
                  alt="Profile photo"
                />
                <label className="absolute bottom-2 mr-20
                 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white
                 border
                group-hover:bg-gray-400/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none cursor-pointer">
                  <svg className="w-4 h-4 text-black rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                  <input
                    type="file"
                    id="photos"
                    name="photos"
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      setImage(e.target.files[0])
                      setImageUrl(URL.createObjectURL(e.target.files[0]))
                    }}
                  />
                </label>
              </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@company.com"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            country={"ye"}
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Country City Street"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brithDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Birth Date</FormLabel>
                        <FormControl className="w-full">
                          <Input max="2010-12-31" {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Update
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    )
}

export default ProfileSetting;