/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import CardCar from "./CardCar";
import { Edit, Fuel, Gauge, Map, MapPin } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import axios from "@/api/axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCar from "./addCar/AddCar";
import { useEffect, useState } from "react";

const carsInfo = [
  {
    icon: Map,
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
    icon: Map,
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

const MotionTop = ({ children, duration, key }) => {
  return (
    <motion.div
      key={key}
      className="card"
      initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0, // Slide in to its original position
        transition: {
          duration: duration, // Animation duration
        },
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

const CarsDashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const user = useAuthUser();
  // console.log(user);

  const getAllCars = async () => {
    // fetch all cars from the database
    try {
      const response = await axios.get("/api/cars", {
        params: { limit: 10, ownerId: user.userId },
        headers: { "Content-Type": "application/json" },
      });
      setCars(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  console.log(car);
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">My Cars</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button> Add Car </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[900px] w-full">
            <AddCar setOpen={setOpen} setCats={setCars} cars={cars} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-wrap justify-start gap-6">
          {cars.map((car, index) => (
            <MotionTop key={index} duration={index / 2}>
              <CardCar car={car} setCar={setCar} />
            </MotionTop>
          ))}
        </div>
        <div
          className={`min-w-[450px] relative px-4 py-8 rounded-3xl h-[600px] bg-mapgps bg-cover bg-center bg-no-repeat overflow-y-auto no-scrollbar`}
        >
          {car && (
            <div className=" flex flex-col gap-4 items-center">
              {/* <motion.div
                className=" flex flex-col items-center"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Slide in to its original position
                  transition: {
                    duration: 1, // Animation duration
                  },
                }}
                viewport={{ once: true }}
              >
                <MapPin size={26} className="text-gray-400 text-center" />
                <span className="text-gray-400 text-lg">Tanger, Maroc</span>
              </motion.div> */}
              <MotionTop duration={1}>
                <div className=" flex flex-col items-center">
                  <MapPin size={26} className="text-gray-400 text-center" />
                  <span className="text-gray-400 text-lg">Tanger, Maroc</span>
                </div>
              </MotionTop>

              <MotionTop duration={1.5}>
                <div className="absolute top-8 right-8 rounded-xl p-3 cursor-pointer hover:bg-gray-800">
                  <Edit size={24} className="text-gray-300" />
                </div>
              </MotionTop>
              <MotionTop duration={2}>
                <div className="w-[400px] p-4 shadow-md shadow-slate-600 rounded-xl bg-gray-700">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 ">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h2 className="text-base font-bold text-gray-100">
                        {user.fullName}
                      </h2>
                      <span className="text-sm text-gray-400">
                        All-star host
                      </span>
                      <span className="text-sm text-gray-400">
                        {cars.length} cars joined mars 2024
                      </span>
                    </div>
                  </div>
                </div>
              </MotionTop>
              {/* owner info */}
              <MotionTop duration={2.5}>
                <div className="w-[400px] p-4 shadow-md shadow-slate-600 rounded-xl bg-gray-700">
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
                <div className="w-[400px] p-4 shadow-md shadow-slate-600 rounded-xl bg-gray-700">
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
      </div>
    </div>
  );
};

export default CarsDashboardPage;
