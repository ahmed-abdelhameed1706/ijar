import { Button } from "@/components/ui/button";
import CardCar from "./CardCar";
import { Edit, Fuel, Gauge, Map, MapPin } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

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

const CarsDashboardPage = () => {
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

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">My Cars</h1>
        <Dialog className="">
          <DialogTrigger asChild>
            <Button> Add Car </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[900px] w-full">
            <AddCar />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex">
        <div className="flex flex-wrap justify-center gap-6">
          <CardCar />
          <CardCar />

          <CardCar />
          <CardCar />
        </div>
        <div
          className={`min-w-[450px] relative flex flex-col gap-4 items-center px-4 py-8 rounded-3xl h-[600px] bg-mapgps bg-cover bg-center bg-no-repeat overflow-y-auto no-scrollbar`}
        >
          <div className=" flex flex-col items-center">
            <MapPin size={26} className="text-gray-400 text-center" />
            <span className="text-gray-400 text-lg">Tanger, Maroc</span>
          </div>

          <div className="absolute top-8 right-8 rounded-xl p-3 cursor-pointer hover:bg-gray-800">
            <Edit size={24} className="text-gray-300" />
          </div>
          <div className="w-[400px] p-4 rounded-xl bg-gray-700">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 ">
                <AvatarImage src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-gray-100">Ayoub</h2>
                <span className="text-sm text-gray-400">All-star host</span>
                <span className="text-sm text-gray-400">
                  25 cars joined mars 2024
                </span>
              </div>
            </div>
          </div>
          {/* owner info */}
          <div className="w-[400px] p-4 rounded-xl bg-gray-700">
            <div className="flex gap-4">
              <img
                className="rounded-xl h-20 w-28 object-cover"
                src="https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg"
                alt="car"
              />
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-gray-100">
                  Mercedes 2021
                </h2>
                <h5 className="font-normal text-gray-400">
                  <span className="text-lg font-bold text-gray-300">$100</span>
                  /Day
                </h5>
                <span className="text-sm text-gray-400 flex gap-3">
                  <MapPin size={16} className="text-gray-400 text-center" />
                  Tanger, Maroc
                </span>
              </div>
            </div>
          </div>
          {/* car info */}
          <div className="w-[400px] p-4 rounded-xl bg-gray-700">
            <h1 className="text-base font-medium text-gray-200 mb-4">
              Car Info
            </h1>
            <div className="flex flex-wrap gap-6 justify-between mb-6">
              {carsInfo.map((carInfo, index) => (
                <div key={index} className="flex basis-1/3 items-center gap-3">
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, illo
              ut dolorum unde sint nobis similique expedita asperiores deserunt
              ipsam!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsDashboardPage;
