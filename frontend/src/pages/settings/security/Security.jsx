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

const Security = ({ setOpenBar }) => {
    const [showPassword, setShowPassword] = useState(false);

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
    .refine((data) => data.oldPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords does not match",
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
      });
    
      function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (values) {
          alert(JSON.stringify(values, null, 2));
        }
        console.log(values)
        // form.reset(); ProfileSetting.jsx
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