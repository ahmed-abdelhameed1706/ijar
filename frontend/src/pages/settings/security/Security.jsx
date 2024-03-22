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
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const Security = ({ setOpenBar }) => {
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuthHeader()
  const token = auth.split(" ")[1]

  const formSchema = z
  .object({
      oldPassword: z.string().min(1, "Password is required"),
      newPassword: z
          .string()
          .min(1, "Password is required")
          .min(8, "Password must be at least 8 characters long")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/\d/, "Password must contain at least one number"),
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
          oldPassword: "",
          newPassword: "",
      },
    });
    
    async function onSubmit(values) {
      try {
        const response = await axios.put(
          "/api/users/update_password",
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
              authorization: token
            },
          }
        );
        toast.success(response.data.message);
        form.reset();
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
            <CardTitle>Update your Password</CardTitle>
            <CardDescription>
                Please enter your exisiting password and your new password.
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >                
              <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            {showPassword ? (
                              <Label
                                className="absolute cursor-pointer inset-y-0 end-1 flex justify-center items-center px-2.5 "
                                htmlFor="password"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Eye
                                  size={20}
                                  strokeWidth={2}
                                  absoluteStrokeWidth
                                  className="text-gray-400"
                                />
                              </Label>
                            ) : (
                              <Label
                                className="absolute cursor-pointer  inset-y-0 end-1 flex justify-center items-center px-2.5 "
                                htmlFor="password"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <EyeOff
                                  size={20}
                                  strokeWidth={2}
                                  absoluteStrokeWidth
                                  className="text-gray-400"
                                />
                              </Label>
                            )}
                            <Input
                              placeholder="Current Password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            {showPassword ? (
                              <Label
                                className="absolute cursor-pointer inset-y-0 end-1 flex justify-center items-center px-2.5 "
                                htmlFor="password"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Eye
                                  size={20}
                                  strokeWidth={2}
                                  absoluteStrokeWidth
                                  className="text-gray-400"
                                />
                              </Label>
                            ) : (
                              <Label
                                className="absolute  cursor-pointer  inset-y-0 end-1 flex justify-center items-center px-2.5 "
                                htmlFor="password"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <EyeOff
                                  size={20}
                                  strokeWidth={2}
                                  absoluteStrokeWidth
                                  className="text-gray-400"
                                />
                              </Label>
                            )}
                            <Input
                              placeholder="New Password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <Button className="w-full" type="submit">
                  Update Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    )
}

export default Security;