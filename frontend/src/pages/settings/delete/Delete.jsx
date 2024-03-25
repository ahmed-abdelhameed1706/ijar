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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Delete = ({ setOpenBar }) => {
  const auth = useAuthHeader();
  const token = auth.split(" ")[1];
  const logout = useSignOut();
  const navigate = useNavigate();

  const formSchema = z.object({
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values) {
    if (!values.password) {
      toast.info("Password is required.");
      return;
    }
    try {
      await axios.delete("/api/users", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: {
          ...values,
        },
      });
      toast.success("Your account has been successfully deleted.");
      await logout();
      navigate("/");
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
    <Card
      onClick={() => setOpenBar(false)}
      className="w-full border-none shadow-none"
    >
      <CardHeader className="max-[700px]:text-center">
        <CardTitle>Delete your Account</CardTitle>
        <CardDescription>
          Please enter your password to delete your Account.
        </CardDescription>
      </CardHeader>
      <hr />
      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault} className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full bg-primary text-white"
                  variant="outline"
                >
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Delete;
