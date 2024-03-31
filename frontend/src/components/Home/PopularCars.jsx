/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import CarCard from "../card/CarCard";
import Filter from "../filter/Filter";
import MotionTop from "../motion/MotionTop";

const PopularCars = ({ isHome, setCars, cars, form }) => {
  return (
    <section className="flex flex-col gap-10 justify-evenly">
      <MotionTop>
        <div className="mx-auto max-w-lg text-center  pt-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Rent or List <br /> Your Car, Your Way
          </h2>
          <p className="mt-4">
            Drive adventures, share your wheels. <strong>Ijar</strong> is the
            all-in-one car rental platform that connects drivers with the
            perfect car and car owners with a hassle-free way to earn.
          </p>
        </div>
      </MotionTop>
      <div className="bg-gray-100 border-y">
        <Filter setCars={setCars} form={form} />
      </div>
      <MotionTop>
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Explore Most Popular Cars
          </h2>
          <p className="mt-4">
            Find the perfect ride for you and discover the most in-demand cars
            on the road today, from fuel-efficient commuters to spacious family
            haulers.
          </p>
        </div>
      </MotionTop>
      <div
        className={
          isHome
            ? "bg-gray-100 flex flex-wrap gap-10 justify-evenly flex-grow py-6"
            : "flex flex-wrap gap-10 justify-evenly flex-grow py-6"
        }
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        <div className="mt-12 w-full text-center">
          <Link
            to="/cars"
            className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            Go to All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCars;
