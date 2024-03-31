/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fuel, Gauge, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import MotionTop from "../motion/MotionTop";

const CarCard = ({ car }) => {
  return (
    <MotionTop>
      <Link to={`/car/${car.id || car._id}`}>
        <Card className=" relative w-[280px] rounded-3xl cursor-pointer hover:shadow-xl hover:scale-[1.01]">
          <span
            className={`absolute -top-2 right-3 px-2 rounded-lg ${
              car.available ? "bg-green-400" : "bg-red-400"
            } text-sm text-gray-600`}
          >
            {car.available ? "Available" : "Not Available"}
          </span>
          <CardHeader className="flex-row justify-between p-4">
            <CardTitle className="text-lg">
              {car.brandName} <br />
              <span className="text-base text-gray-600">{car.year}</span>
            </CardTitle>
            <CardTitle className="text-lg text-gray-500">
              <span className="text-xl font-bold text-gray-800">
                ${car.price}
              </span>{" "}
              /Day
              <CardDescription className="flex gap-1">
                <MapPin size={16} /> {car.location}
              </CardDescription>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            {/* <div> */}
            <img
              className="rounded-xl w-full h-40 object-cover"
              src={
                car.images[0] ||
                "https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg"
              }
              alt="car"
            />
            {/* </div> */}
          </CardContent>
          <CardFooter className="flex justify-around">
            <div className="flex flex-col items-center gap-1">
              <div className="flex justify-center items-center rounded-lg p-2 bg-orange-100">
                <Fuel className="text-orange-800" />
              </div>
              <span className="text-sm font-bold text-gray-600">
                {car.fuel}
              </span>
            </div>
            <div>
              <div className="flex justify-center items-center rounded-lg p-2 bg-purple-100">
                <Gauge className="text-purple-800" />
              </div>
              <span className="text-sm font-bold text-gray-600">
                {car.maxSpeed}km
              </span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </MotionTop>
  );
};

export default CarCard;
