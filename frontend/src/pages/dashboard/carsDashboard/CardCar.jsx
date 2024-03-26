import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fuel, Gauge, Map, MapPin } from "lucide-react";

const CardCar = () => {
  return (
    <Card className="w-[280px] rounded-3xl">
      <CardHeader className="flex-row justify-between p-4">
        <CardTitle className="text-lg">
          Mercedes <br />
          <span className="text-base text-gray-600">2021</span>
        </CardTitle>
        <CardTitle className="text-lg text-gray-500">
          <span className="text-xl font-bold text-gray-800">$100</span> /Day
          <CardDescription className="flex gap-1">
            <MapPin size={16} /> Lagos
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        {/* <div> */}
        <img
          className="rounded-xl w-full h-40 object-cover"
          src="https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg"
          alt="car"
        />
        {/* </div> */}
      </CardContent>
      <CardFooter className="flex justify-around">
        <div className="flex flex-col items-center gap-1">
          <div className="flex justify-center items-center rounded-lg p-2 bg-orange-100">
            <Fuel className="text-orange-800" />
          </div>
          <span className="text-sm font-bold text-gray-600">Gaz</span>
        </div>
        <div>
          <div className="flex justify-center items-center rounded-lg p-2 bg-purple-100">
            <Gauge className="text-purple-800" />
          </div>
          <span className="text-sm font-bold text-gray-600">2.5km</span>
        </div>
        <div>
          <div className="flex justify-center items-center rounded-lg p-2 bg-teal-100">
            <Map className="text-teal-800" />
          </div>
          <span className="text-sm font-bold text-gray-600">Map</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardCar;
