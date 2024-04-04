/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import CardCar from "./CardCar";
import { Edit, Fuel, Gauge, Map, MapPin, Trash } from "lucide-react";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "@/api/axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
import AddCar from "./addCar/AddCar";
import { useEffect, useState } from "react";
import useScreenSize from "@/utils/useScreenSize";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";

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

// db.cars.updateMany({ownerId: })

const MotionTop = ({ children, key, className }) => {
  return (
    <motion.div
      key={key}
      className={className}
      initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0, // Slide in to its original position
        transition: {
          duration: 0.5, // Animation duration
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
  const auth = useAuthHeader();
  const token = auth && auth.split(" ")[1];

  const isDesktop = useScreenSize().width;

  // console.log(user);

  const getAllCars = async () => {
    // fetch all cars from the database
    try {
      const response = await axios.get("/api/cars", {
        params: { limit: 10, ownerId: user.userId },
        headers: { "Content-Type": "application/json" },
      });
      setCars(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCar = () => {
    return async () => {
      try {
        await axios.delete(`/api/cars/${car.id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        toast.success("Car deleted successfully");
        setCars(cars.filter((c) => c.id !== car.id));
        setCar(null);
      } catch (error) {
        toast.error("Error deleting car");
        console.error(error);
      }
    };
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">My Cars</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button> Add Car </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[900px] w-full">
            <AddCar setOpen={setOpen} setCars={setCars} cars={cars} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-wrap justify-start gap-6">
          {cars.map((car, index) => (
            <MotionTop key={index} duration={2 / 3}>
              <CardCar
                car={car}
                setCar={setCar}
                setCars={setCars}
                cars={cars}
                handleDeleteCar={handleDeleteCar}
              />
            </MotionTop>
          ))}
        </div>
        {isDesktop > 765 ? (
          <div
            className={`min-w-[450px] relative px-4 py-8 rounded-3xl h-[600px] bg-mapgps bg-cover bg-center bg-no-repeat overflow-y-auto no-scrollbar`}
          >
            {car && (
              <div>
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
                          onClick={handleDeleteCar()}
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

                <div className=" flex flex-col gap-4 items-center w-[450px]">
                  <MotionTop duration={1}>
                    <div className=" flex flex-col items-center">
                      <MapPin size={26} className="text-gray-400 text-center" />
                      <span className="text-gray-400 text-lg">
                        Tanger, Maroc
                      </span>
                    </div>
                  </MotionTop>
                  {/* <MotionTop duration={1.5}> */}
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {car.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt="car"
                          className="w-full h-[200px] object-cover rounded-xl"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* owner info */}
                  <MotionTop duration={2.5}>
                    <div className="w-[400px] p-4 shadow-md shadow-slate-600 rounded-xl bg-gray-700">
                      <div className="flex gap-4">
                        <img
                          className="rounded-xl h-20 w-28 object-cover"
                          src={car.images[0]}
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
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CarsDashboardPage;
