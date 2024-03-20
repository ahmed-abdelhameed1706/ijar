import loginImg from "../../assets/images/login-img.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import GoogleIcon from "../../assets/icons/google-icon.png";
import { Eye, EyeOff } from "lucide-react";


const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values) {
      alert(values);
    }
  }
  return (
    <div className="flex p-8 justify-center items-center w-full">
      <div className="flex max-w-full  bg-white gap-6 p-8 min-[650px]:rounded-lg  min-[650px]:shadow-lg">
        <img
          src={loginImg}
          alt="car"
          className="w-[250px] rounded-lg max-[800px]:hidden"
        />

        <Card className="w-[350px] border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle>Signin in to your account</CardTitle>
            <CardDescription>
              Enter your details to procede further
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 items-center  mb-5">
              <Button
                variant="ghost"
                size="lg"
                className="shadow-md py-4"
                // className="w-full max-w-xs font-bold shadow-lg rounded-lg py-5 bg-white text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
              >
                {/* <div className="bg-white p-2 rounded-full"> */}
                <img src={GoogleIcon} alt="google icon" className="w-8" />
                {/* </div> */}
                <span className="ml-4">Login with Google</span>
              </Button>

              <div className="w-full mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <span className="text-xs text-center text-gray-500 uppercase">
                  or login with email
                </span>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pb-0.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                              placeholder="Password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                            />
                          </div>
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <Link className="pl-1.5 leading-1 text-indigo-700 text-xs" to="/reset-password">
                  Forget password?
                </Link>
                <div className="flex items-center space-x-2 space-y-0">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Button className="w-full" type="submit">
                  Login
                </Button>
                <hr />
                <div  className="flex justify-center items-center">
                  <p>Don&apos;t have an account? 
                  <Link className="pl-1 text-indigo-600" to="/signup">
                    Sign Up.
                  </Link></p>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
