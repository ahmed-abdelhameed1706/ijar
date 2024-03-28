import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
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
import "react-phone-input-2/lib/style.css";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCar = ({ setCars }) => {
    const types = ["Sedan", "Sports", "Coupe", "Minivan", "Pickup", "Station Wagon"];
    const fuels = ["Gas", "Diesel", "Electric"];
	const navgate = useNavigate()

	const formSchema = z
		.object({
			brandName: z.string(),
			model: z.string(),
			minYear: z.string(),
			maxYear: z.string(),
			type: z.string(),
			color: z.string(),
			minPrice: z.string(),
			maxPrice: z.string(),
			location: z.string(),
			fuel: z.string(),
		})

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			brandName: "",
			model: "",
			minYear: "",
			maxYear: "",
			type: "",
			color: "",
			minPrice: '',
			maxPrice: "",
			location: "",
			fuel: "",
		},
	});

	async function onSubmit(values) {
		try {
			const response = await axios.get(
				"/search",
				{
					headers: {
						"Content-Type": "application/json",
					},
					params: {...values},
				}
			);
			console.log(response.data);
			setCars(response.data);
			toast.success("Your Car Added successfully.");
			navgate('/cars');
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
				<Card className="border-none px-8 py-2 bg-inhert w-full rounded-none h-fit space-y-1">
					<CardHeader className="flex flex-row justify-between">
                        <CardTitle className="text-left">Filter</CardTitle>
						<p className="text-primary text-base cursor-pointer text-right" onClick={() => form.reset()}>Reset</p>
					</CardHeader>
                        <CardContent>						
                            <Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="gap-4 flex flex-wrap"
							>
								<div className="flex flex-wrap gap-4 flex-grow">
									<FormField
										control={form.control}
										name="brandName"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>Brand Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Toyota"
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
										name="model"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>Model</FormLabel>
												<FormControl>
													<Input
														placeholder="Camry"
														type="text"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
                                <div className="flex flex-wrap gap-4 flex-grow">                                    <FormField
										control={form.control}
										name="year"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>Min Year</FormLabel>
												<FormControl>
													<Input
														placeholder="2021"
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
										name="year"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>Max Year</FormLabel>
												<FormControl>
													<Input
														placeholder="2023"
														type="text"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
                                </div>
								<div className="flex flex-wrap gap-4 flex-grow">
									<FormField
										control={form.control}
										name="type"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>Type</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="h-10">
															<SelectValue placeholder="Sedan" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
                                                        { types.map((type, index) => (
                                                            <SelectItem key={index} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
                                    <FormField
									control={form.control}
									name="fuel"
									render={({ field }) => (
										<FormItem className="flex-grow">
											<FormLabel>Fuel</FormLabel>
											<Select
												onValueChange={
													field.onChange
												}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="h-10">
														<SelectValue placeholder="Gas" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{ fuels.map((type, index) => (
														<SelectItem key={index} value={type}>
															{type}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								</div>
								<div className="flex flex-wrap gap-4 flex-grow">
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>
                                                    Min Price per day
												</FormLabel>
												<FormControl className="flex-grow">
                                                    <div className="relative">
                                                        <span className="absolute text-slate-500 text-sm cursor-pointer  inset-y-0 end-6 flex justify-center items-center px-2.5 ">$</span>
                                                        <Input
                                                            placeholder="20"
                                                            {...field}
                                                            type="number"
                                                            id="user_price"
                                                            name="price"
                                                            className="pr-2"
                                                        />
                                                    </div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
                                    <FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem className="flex-grow flex-grow">
												<FormLabel>
                                                    Max Price per day
												</FormLabel>
												<FormControl className="flex-grow">
                                                    <div className="relative">
                                                        <span className="absolute text-slate-500 text-sm cursor-pointer  inset-y-0 end-6 flex justify-center items-center px-2.5 ">$</span>
                                                        <Input
                                                            placeholder="50"
                                                            {...field}
                                                            type="number"
                                                            id="user_price"
                                                            name="price"
                                                            className="pr-2"
                                                        />
                                                    </div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex flex-wrap gap-4 flex-grow">
									<FormField
										control={form.control}
										name="location"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>Location</FormLabel>
												<FormControl>
													<Input
														placeholder="City"
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
										name="color"
										render={({ field }) => (
											<FormItem className="flex-grow">
												<FormLabel>Color</FormLabel>
												<FormControl>
													<Input
														placeholder="Black"
														type="text"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-full text-center pt-6">
								<Button type="submit">
									Search
								</Button>
								</div>
							</form>
						</Form>
					</CardContent>
					{/* <CardFooter className="flex flex-col  justify-between">
          </CardFooter> */}
				</Card>
    );
};

export default AddCar;
