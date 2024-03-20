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
import { Input } from "@/components/ui/input";

const ForgetPassword = () => {

    const formSchema = z.object({
        email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Invalid email address"),
    });

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
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
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex max-w-full bg-white gap-6  p-8 min-[650px]:rounded-lg  min-[650px]:shadow-lg">
        <Card className="w-[350px] border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle>Password Reset Request</CardTitle>
            <CardDescription>
              Enter your email below to to request a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>

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
                <Button className="w-full" type="submit">
                  Send
                </Button>
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

export default ForgetPassword;
