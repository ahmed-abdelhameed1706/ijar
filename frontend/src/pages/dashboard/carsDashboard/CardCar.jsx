/* eslint-disable react/no-unescaped-entities */

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  // DrawerHeader,
  // DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import useScreenSize from "@/utils/useScreenSize";
import { useState } from "react";
import PropTypes from "prop-types";
import CardInfo from "./CardInfo";
import MotionTop from "@/components/motion/MotionTop";
import { Edit, Fuel, Gauge, MapPin, Trash } from "lucide-react";
import AddCar from "./addCar/AddCar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const carsInfo = [
  {
    icon: MapPin,
    title: "Map",
    bgColor: "bg-teal-100",
    color: "text-teal-800",
  },
  {
    icon: Fuel,
    title: "Gaz",
    bgColor: "bg-orange-100",
    color: "text-orange-800",
  },
  {
    icon: Gauge,
    title: "2.5km",
    bgColor: "bg-purple-100",
    color: "text-purple-800",
  },
  {
    icon: MapPin,
    title: "Map",
    bgColor: "bg-teal-100",
    color: "text-teal-800",
  },
  {
    icon: Fuel,
    title: "Gaz",
    bgColor: "bg-orange-100",
    color: "text-orange-800",
  },
  {
    icon: Gauge,
    title: "2.5km",
    bgColor: "bg-purple-100",
    color: "text-purple-800",
  },
];

const CardCar = ({ car, setCar, setCars, cars, handleDeleteCar }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useScreenSize().width > 768;
  if (isDesktop) {
    return <CardInfo car={car} setCar={setCar} />;
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <CardInfo car={car} setCar={setCar} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div
          className={`w-full relative px-4 py-8 rounded-3xl h-[90vh] bg-mapgps bg-cover bg-center bg-no-repeat overflow-y-auto no-scrollbar`}
        >
          {car && (
            <div className=" flex flex-col gap-4">
              <Dialog>
                <DialogTrigger>
                  <MotionTop duration={1.5}>
                    <div className="absolute top-6 right-8 rounded-xl p-3 cursor-pointer hover:bg-gray-800">
                      <Edit size={24} className="text-gray-300" />
                    </div>
                  </MotionTop>
                </DialogTrigger>
                <DialogContent className="max-w-[900px] w-full">
                  <AddCar
                    setOpen={setOpen}
                    setCats={setCars}
                    cars={cars}
                    car={car}
                    isUpdate={true}
                  />
                </DialogContent>
              </Dialog>
              <MotionTop duration={1.5}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="absolute top-6 right-20 rounded-xl p-3 cursor-pointer hover:bg-gray-800">
                      <Trash size={24} className="text-red-600 " />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete {car.brandName} {car.model} {car.year}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the car.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteCar}
                        className="bg-destructive hover:bg-red-400 "
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </MotionTop>

              <MotionTop duration={1}>
                <span
                  className={`absolute left-8 top-8 px-2 rounded-lg text-gray-600 text-sm font-bold ${
                    car.available ? "bg-green-400" : "bg-red-400"
                  }`}
                >
                  {car.available ? "Available" : "Not Available"}
                </span>
              </MotionTop>

              {/* owner info */}
              <MotionTop duration={2.5}>
                <div className=" p-4 shadow-md shadow-slate-600 rounded-xl bg-gray-700">
                  <div className="flex gap-4">
                    <img
                      className="rounded-xl h-20 w-28 object-cover"
                      src={
                        car.images[0]
                        // "https://firebasestorage.googleapis.com/v0/b/ijarapp-11.appspot.com/o/cars%2Feae98734-0529-452d-95fe-0ebcfd4dedd1?alt=media&token=1e2fa86f-f3e9-4527-b671-505422e6c17c"
                      }
                      alt="car"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-base font-bold text-gray-100">
                        {`${car.brandName} ${car.model} ${car.year}`}
                      </h2>
                      <h5 className="font-normal text-gray-400">
                        <span className="text-lg font-bold text-gray-300">
                          ${car.price}
                        </span>
                        /Hour
                      </h5>
                      <span className="text-sm text-gray-400 flex gap-3">
                        <MapPin
                          size={16}
                          className="text-gray-400 text-center"
                        />
                        Tanger, Maroc
                      </span>
                    </div>
                  </div>
                </div>
              </MotionTop>
              {/* car info */}
              <MotionTop duration={3}>
                <div className="w-full p-4 shadow-md shadow-slate-600 rounded-xl bg-gray-700">
                  <h1 className="text-base font-medium text-gray-200 mb-4">
                    Car Info
                  </h1>
                  <div className="flex flex-wrap gap-6 justify-between mb-6">
                    {carsInfo.map((carInfo, index) => (
                      <div
                        key={index}
                        className="flex basis-1/3 items-center gap-3"
                      >
                        <div
                          className={`flex justify-center items-center rounded-xl p-2 ${carInfo.bgColor}`}
                        >
                          <carInfo.icon className={carInfo.color} />
                        </div>
                        <span className="text-sm font-bold text-gray-400">
                          {carInfo.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <h1 className="text-base font-medium text-gray-200 mb-2">
                    Description
                  </h1>
                  <p className="text-gray-300 text-sm font-normal w-">
                    {car.description}
                  </p>
                </div>
              </MotionTop>
            </div>
          )}
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

CardCar.propTypes = {
  car: PropTypes.shape({
    color: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    brandName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  setCar: PropTypes.func.isRequired,
  setCars: PropTypes.func.isRequired,
  cars: PropTypes.array.isRequired,
  handleDeleteCar: PropTypes.func.isRequired,
};

export default CardCar;
