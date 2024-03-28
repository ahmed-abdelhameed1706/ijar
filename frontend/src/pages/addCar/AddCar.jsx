/* eslint-disable react/prop-types */
import loginImg from "../../assets/images/login-img.jpg";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "react-phone-input-2/lib/style.css";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import Images from "./Images";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import uploadImages from "./uploadImages";
import { useNavigate } from "react-router-dom";

const AddCar = ({ setCars, cars }) => {
  const [images, setImages] = useState([]);
  const types = [
    "Sedan",
    "Sports",
    "Coupe",
    "Minivan",
    "Pickup",
    "Station Wagon",
  ];
  const fuels = ["Gas", "Diesel", "Electric"];
  const auth = useAuthHeader();
  const token = auth && auth.split(" ")[1];
  const navgate = useNavigate();

  const formSchema = z.object({
    brandName: z.string().min(1, { message: "Brand Name is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    year: z.string().min(1, { message: "Year is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    price: z.string().min(1, { message: "Price is required" }),
    licensePlateNumber: z
      .string()
      .min(1, { message: "License Plate Number is required" }),
    engineId: z.string().min(1, { message: "Engine Id is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    maxSpeed: z.string().min(1, { message: "Max Speed is required" }),
    fuel: z.string().min(1, { message: "Fuel is required" }),
    description: z.string(),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      model: "",
      year: "",
      type: "",
      color: "",
      price: "",
      licensePlateNumber: "",
      engineId: "",
      description: "",
      location: "",
      maxSpeed: "",
      fuel: "",
    },
  });

  async function onSubmit(values) {
    toast.promise(uploadImages(images), {
      pending: "Adding Car...",
      success: "Car Added successfully, you will be redirected to cars page.",
      error: "Failed to add car.",
    });

    const imagesUrl = await uploadImages(images);
    try {
      const response = await axios.post(
        "/api/cars",
        JSON.stringify({ ...values, images: imagesUrl }),
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      setCars([...cars, response.data]);
      toast.success("Your Car Added successfully.");
      navgate("/cars");
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
    <div className="flex min-[650px]:py-3 min-[650px]:px-2 justify-center items-center w-full h-full">
      <div className=" flex max-w-full bg-white gap-6 p-5 min-[650px]:rounded-lg  min-[650px]:shadow-lg">
        <img
          src={loginImg}
          alt="car"
          className="w-[350px] rounded-lg max-[900px]:hidden"
        />

        <Card className="w-full border-none shadow-none space-y-5">
          <CardHeader className="text-center">
            <CardTitle>Add your rental car</CardTitle>
            <CardDescription>
              Enter your car details to list it for rent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <h1 className="text-lg font-medium border-b">
              Upload Photos{" "}
              <p className="text-xs font-light inline pl-2">
                multiple selection allowed
              </p>
            </h1>
            {images.length ? <Images images={images} /> : null}
            <div className="flex flex-col items-center">
              <label
                htmlFor="photos"
                className="bg-primary/[.33] text-base/[50px] flex justify-center items-center w-full cursor-pointer text-violet-800 h-12 rounded-xl"
              >
                <span>
                  <p className="text-xl inline pr-1.5">+</p>Add Photos
                </span>
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  multiple
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) =>
                    setImages([...images, ...Array.from(e.target.files)])
                  }
                />
              </label>
            </div>
          </CardContent>
          <CardContent className="space-y-6">
            <h1 className="text-lg font-medium border-b">
              Basic Characteristics
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota" type="text" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Camry" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input placeholder="2023" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Sedan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {types.map((type, index) => (
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
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Black" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Price per day</FormLabel>
                        <FormControl className="w-full">
                          <div className="relative">
                            <span className="absolute text-slate-500 text-sm cursor-pointer  inset-y-0 end-6 flex justify-center items-center px-2.5 ">
                              $
                            </span>
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
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxSpeed"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Max Speed</FormLabel>
                        <FormControl className="w-full">
                          <div className="relative">
                            <span className="absolute text-slate-500 text-sm cursor-pointer  inset-y-0 end-6 flex justify-center items-center px-2.5 ">
                              km
                            </span>
                            <Input
                              placeholder="180"
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
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="licensePlateNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>License Plate Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ABC-1234"
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
                    name="engineId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Engine Id</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="fuel"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Fuel</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Gas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fuels.map((type, index) => (
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <p className="text-xs font-light inline pl-2">
                        Optional field
                      </p>
                      <FormControl>
                        <Textarea
                          placeholder="Description..."
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Add
                </Button>
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

export default AddCar;
