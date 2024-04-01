/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "react-phone-input-2/lib/style.css";
import { useNavigate, useLocation } from "react-router-dom";
import Selector from "./Selector";
import { carBrands, carModels, types, fuels } from "./carsData";
import { useState } from "react";

const Filter = ({ handleSubmit, form }) => {
  
  const navgate = useNavigate();
  const location = useLocation();
  const [brand, setBrand] = useState('Toyota')
  const [brandOther, setBrandOther] = useState(true)
  const [modelOther, setModelOther] = useState(true)

  async function onSubmit(values) {
    if (location.pathname === "/cars") {
      handleSubmit(values);
    } else {
      navgate("/cars");
    }
  }

  const handleBrandClick = () => {
    form.setValue('model', '')
    form.setValue('brandName', '')
    setBrandOther(false)
  }

  const handleModelClick = () => {
    form.setValue('model', '')
    setModelOther(false)
  }


  const handleBrandOnBlure = () => {
    if (!form.getValues().brandName) {
      setBrandOther(true)
    }
  }

  const handleModelOnBlure = () => {
    if (brandOther && !form.getValues().model) {
      setModelOther(true)
    }
  }

  return (
    <Card className="border-none px-8 py-2 bg-inhert w-full rounded-none h-fit space-y-1">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-left">Filter</CardTitle>
        <p
          className="text-primary select-none text-base cursor-pointer text-right"
          onClick={form.reset()}
        >
          Reset
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-4 flex flex-wrap"
          >
            <div className="flex flex-wrap gap-4 flex-grow sm:min-w-[40%]">
            <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem className="flex-grow min-w-[50%] max-[550px]:w-full">
                      <FormLabel>Brand Name</FormLabel>
                      
                      {brandOther ? <div className="flex-grow"> <Selector 
                          onValueChange={val => {
                            field.onChange(val)
                            setBrand(val)
                          }}
                          handleClick={handleBrandClick}
                          defaultValue={field.value}
                          className="flex-grow max-h-8"
                          placeholder="Toyota"
                          data={carBrands}
                      />
                      </div>
                      : <FormControl>
                      <Input placeholder="Toyota" type="text" {...field}
                        autoFocus={!brandOther}
                        onBlur={handleBrandOnBlure}
                      />
                    </FormControl>}
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
                      {modelOther && brandOther ? <div className="flex-grow"> <Selector 
                          onValueChange={field.onChange}
                          handleClick={handleModelClick}
                          defaultValue={field.value}
                          className="flex-grow max-h-8"
                          placeholder={carModels[brand][0]}
                          data={carModels[brand]}
                      />
                      </div>
                      :
                      <FormControl>
                        <Input placeholder={brandOther ? carModels[brand][0] : "Camry"} type="text" {...field} 
                          autoFocus={!modelOther}
                          onBlur={handleModelOnBlure}
                        />
                      </FormControl>}
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="flex flex-wrap gap-4 flex-grow">
              {" "}
              <FormField
                control={form.control}
                name="minYear"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Min Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2021" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxYear"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Max Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2023" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap gap-4 flex-grow sm:min-w-[40%]">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-grow min-w-[50%] max-[550px]:w-full">
                    <FormLabel>Type</FormLabel>
                      <Selector 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Sedan"
                        data={types}
                      />
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
                      <Selector 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Gas"
                        data={fuels}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap gap-4 flex-grow">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Min Price per day</FormLabel>
                    <FormControl className="flex-grow">
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
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Max Price per day</FormLabel>
                    <FormControl className="flex-grow">
                      <div className="relative">
                        <span className="absolute text-slate-500 text-sm cursor-pointer  inset-y-0 end-6 flex justify-center items-center px-2.5 ">
                          $
                        </span>
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
                      <Input placeholder="City" type="text" {...field} />
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
                      <Input placeholder="Black" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full text-center pt-6">
              <Button type="submit">Search</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Filter;
