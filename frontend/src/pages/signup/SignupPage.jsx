import loginImg from "../../assets/images/login-img.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import GoogleIcon from "../../assets/icons/google-icon.png";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const SignupPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	const formSchema = z
		.object({
			fullName: z.string().min(1, { message: "Name is required" }),
			email: z
				.string()
				.min(1, { message: "Email is required" })
				.email("Invalid email address"),
			password: z
				.string()
				.min(1, "Password is required")
				.min(8, "Password must be at least 8 characters long")
				.regex(
					/[A-Z]/,
					"Password must contain at least one uppercase letter"
				)
				.regex(
					/[a-z]/,
					"Password must contain at least one lowercase letter"
				)
				.regex(/\d/, "Password must contain at least one number"),
			confirmPassword: z.string().min(1, "Password is required"),
			phoneNumber: z.string().min(1, "Phone Number is required"),
			brithDate: z
				.string()
				.regex(/\d{4}-\d{2}-\d{2}$/, "Birth Date is required"),
			role: z.enum(["User", "Owner"]),
			address: z.string().min(1, { message: "Address is required" }),
		})
		.refine((data) => data.password === data.confirmPassword, {
			path: ["confirmPassword"],
			message: "Passwords does not match",
		});

	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
			phoneNumber: "",
			brithDate: "",
			role: "User",
			address: "",
		},
	});

	async function onSubmit(values) {
		try {
			const response = await axios.post(
				"/auth/signup",
				JSON.stringify(values),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response);
			toast.success(response.data.message);
			setTimeout(() => {
				toast.info(
					`We've sent a verification email to ${values.email}. Once you confirm it, you can sgin in.`
				);
			}, 6002);
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
		<div className="flex min-[650px]:py-3 min-[650px]:px-2 justify-center items-center w-full max-w-full min-[650px]:h-full">
			<div className=" flex max-w-full bg-white gap-6 p-5 min-[650px]:rounded-lg  min-[650px]:shadow-lg">
				<img
					src={loginImg}
					alt="car"
					className="w-[350px] rounded-lg max-[900px]:hidden"
				/>

				<Card className="w-full border-none shadow-none">
					<CardHeader className="text-center">
						<CardTitle>Sign up a new account</CardTitle>
						<CardDescription>
							Enter your details to create a new Ijar account
						</CardDescription>
					</CardHeader>
					<CardContent className="pb-0">
						<div className="flex flex-col gap-4 items-center  mb-5">
							<Button
								variant="ghost"
								size="lg"
								className="shadow-md py-4"
								// className="w-full max-w-xs font-bold shadow-lg rounded-lg py-5 bg-white text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
							>
								{/* <div className="bg-white p-2 rounded-full"> */}
								<img
									src={GoogleIcon}
									alt="google icon"
									className="w-8"
								/>
								{/* </div> */}
								<span className="ml-4">
									Sign Up with Google
								</span>
							</Button>

							<div className="w-full mt-4 flex items-center justify-between">
								<span className="border-b w-1/5 lg:w-1/4"></span>
								<span className="text-xs text-center text-gray-500 uppercase">
									or Sign Up with email
								</span>
								<span className="border-b w-1/5 lg:w-1/4"></span>
							</div>
						</div>

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
										name="password"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Password</FormLabel>
												<FormControl>
													<div className="relative">
														{showPassword ? (
															<Label
																className="absolute cursor-pointer inset-y-0 end-1 flex justify-center items-center px-2.5 "
																htmlFor="password"
																onClick={() =>
																	setShowPassword(
																		!showPassword
																	)
																}
															>
																<Eye
																	size={20}
																	strokeWidth={
																		2
																	}
																	absoluteStrokeWidth
																	className="text-gray-400"
																/>
															</Label>
														) : (
															<Label
																className="absolute cursor-pointer  inset-y-0 end-1 flex justify-center items-center px-2.5 "
																htmlFor="password"
																onClick={() =>
																	setShowPassword(
																		!showPassword
																	)
																}
															>
																<EyeOff
																	size={20}
																	strokeWidth={
																		2
																	}
																	absoluteStrokeWidth
																	className="text-gray-400"
																/>
															</Label>
														)}
														<Input
															placeholder="Password"
															{...field}
															type={
																showPassword
																	? "text"
																	: "password"
															}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>
													Confirm Password
												</FormLabel>
												<FormControl>
													<div className="relative">
														{showPassword ? (
															<Label
																className="absolute cursor-pointer inset-y-0 end-1 flex justify-center items-center px-2.5 "
																htmlFor="password"
																onClick={() =>
																	setShowPassword(
																		!showPassword
																	)
																}
															>
																<Eye
																	size={20}
																	strokeWidth={
																		2
																	}
																	absoluteStrokeWidth
																	className="text-gray-400"
																/>
															</Label>
														) : (
															<Label
																className="absolute  cursor-pointer  inset-y-0 end-1 flex justify-center items-center px-2.5 "
																htmlFor="password"
																onClick={() =>
																	setShowPassword(
																		!showPassword
																	)
																}
															>
																<EyeOff
																	size={20}
																	strokeWidth={
																		2
																	}
																	absoluteStrokeWidth
																	className="text-gray-400"
																/>
															</Label>
														)}
														<Input
															placeholder="Confirm Password"
															{...field}
															type={
																showPassword
																	? "text"
																	: "password"
															}
														/>
													</div>
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
												<FormLabel>
													Phone Number
												</FormLabel>
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
									<FormField
										control={form.control}
										name="role"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Role</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="User" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="User">
															User
														</SelectItem>
														<SelectItem value="Owner">
															Owner
														</SelectItem>
													</SelectContent>
												</Select>
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
												<FormLabel>
													Birth Date
												</FormLabel>
												<FormControl className="w-full">
													<Input
														max="2010-12-31"
														{...field}
														type="date"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button className="w-full" type="submit">
									Signup
								</Button>
								<hr />
								<div className="flex justify-center items-center">
									<p>
										Already have an account?
										<Link
											className="pl-1 text-indigo-600"
											to="/login"
										>
											Sign in.
										</Link>
									</p>
								</div>
							</form>
						</Form>
					</CardContent>
					{/* <CardFooter className="flex flex-col  justify-between">
          </CardFooter> */}
				</Card>
			</div>
		</div>
	);
};

export default SignupPage;
