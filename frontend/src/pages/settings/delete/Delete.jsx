/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog"
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";



const Delete = ({ setOpenBar }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const auth = useAuthHeader()
  const token = auth.split(" ")[1]
  const logout = useSignOut();
	const navigate = useNavigate();


    async function onSubmit() {
      if (!password) {
        toast.info("Password is required.");
        return;
      }
      try {
        await axios.delete(
          "/api/users",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: token
            },
            data: {
              password
            }
          }
        );
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
        <Card onClick={() => setOpenBar(false)} className="w-full border-none shadow-none">
          <CardHeader className="max-[700px]:text-center">
            <CardTitle>Delete your Account</CardTitle>
            <CardDescription>
                Please enter your password to delete your Account.
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent className="pt-4">
            
              <form
                onSubmit={e => e.preventDefault}
                className="pt-2 space-y-8"
              >
              <Label>Password</Label>
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                  />
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full bg-primary text-white" variant="outline">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              </form>
          </CardContent>
        </Card>
    )
}

export default Delete;