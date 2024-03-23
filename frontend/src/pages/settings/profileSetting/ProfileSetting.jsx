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

const ProfileSetting = ({ setOpenBar }) => {

  const signIn = useSignIn();
  const user = useAuthUser();
  const auth = useAuthHeader()
  const token = auth.split(" ")[1]

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
        brithDate: "",
        address: user.address,
      },
    });
    
    async function onSubmit(values) {
      if ((user.fullName === values.fullName && user.email === values.email && user.phoneNumber === values.phoneNumber && user.address === values.address)) {
        toast.info("Modify the information you want to update before submitting.");
        return;
      }
      try {
        const response = await axios.put(
          "/api/users",
          JSON.stringify(values),
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
            address: response.data.address,
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
                className="space-y-2"
              >
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