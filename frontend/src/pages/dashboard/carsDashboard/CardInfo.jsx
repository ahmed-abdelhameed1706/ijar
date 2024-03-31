import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fuel, Gauge, Map, MapPin } from "lucide-react";
import PropTypes from "prop-types";

const CardInfo = ({ car, setCar }) => {
  return (
    <Card
      className="w-[280px] relative rounded-3xl h-fit cursor-pointer hover:shadow-lg"
      // key={key}
      onClick={() => {
        setCar(car);
      }}
    >
      <span
        className={`absolute right-6 -top-2 px-2 rounded-lg text-gray-600 text-sm font-bold ${
          car.available ? "bg-green-400" : "bg-red-400"
        }`}
      >
        {car.available ? "Available" : "Not Available"}
      </span>
      <CardHeader className="flex-row justify-between p-4 capitalize">
        <CardTitle className="text-lg font-semibold">
          {car.brandName} <br />
          <span className="text-sm font-bold text-gray-500">
            {car.model} {car.year}
          </span>
        </CardTitle>
        <CardTitle className="text-lg text-gray-500">
          <span className="text-xl font-bold text-gray-800">${car.price}</span>{" "}
          /Hour
          <CardDescription className="flex gap-1">
            <MapPin size={16} /> Lagos
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 capitalize">
        {/* <div> */}
        <img
          className="rounded-xl w-full h-40 shadow-md object-cover"
          src={car.images[0]}
          alt={car.brandName}
        />
        {/* </div> */}
      </CardContent>
      <CardFooter className="flex justify-around">
        <div className="flex flex-col items-center gap-1">
          <div className="flex justify-center items-center shadow-md rounded-lg p-2 bg-orange-100">
            <Fuel className="text-orange-800" />
          </div>
          <span className="text-sm font-bold text-gray-600">{car.color}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex justify-center items-center shadow-md rounded-lg p-2 bg-purple-100">
            <Gauge className="text-purple-800" />
          </div>
          <span className="text-sm font-bold text-gray-600">2.5km</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex justify-center items-center shadow-md rounded-lg p-2 bg-teal-100">
            <Map className="text-teal-800" />
          </div>
          <span className="text-sm font-bold text-gray-600">Map</span>
        </div>
      </CardFooter>
    </Card>
  );
};
CardInfo.propTypes = {
  car: PropTypes.shape({
    color: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    brandName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  setCar: PropTypes.func.isRequired,
};

export default CardInfo;
