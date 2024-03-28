/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import CardCar from "../Card/CarCard";
import CarFilterForm from "../filter/Filter";

const PopularCars = ({ isHome, setCars, cars}) => {

	return (
		<section className="flex flex-col gap-10 justify-evenly">
				{isHome ? (<div className="mx-auto max-w-lg text-center  pt-8">
						<h2 className="text-3xl font-bold sm:text-4xl">
							Rent or List <br /> Your Car, Your Way
						</h2>
						<p className="mt-4">
							Drive adventures, share your wheels. <strong>Ijar</strong> is the all-in-one car rental platform that connects drivers with the perfect car and car owners with a hassle-free way to earn.
						</p>
					</div>)
					: (<div className="mx-auto max-w-lg text-center pt-10">
					<h2 className="text-3xl font-bold sm:text-4xl">
						Find Your Perfect Car
					</h2>
					<p className="mt-4">
					Narrow down your search and find the car that&apos;s perfect for you!  Use our convenient filters to specify your desired features, location, and rental price range ... 
					</p>
				</div>)}
				<div className="bg-gray-100 border-y">
					<CarFilterForm setCars={setCars} />
				</div>
				{isHome && (<div className="mx-auto max-w-lg text-center">
						<h2 className="text-2xl font-bold sm:text-3xl">
							Explore Most Popular Cars
						</h2>
						<p className="mt-4">
						Find the perfect ride for you and discover the most in-demand cars on the road today, from fuel-efficient commuters to spacious family haulers.
						</p>
					</div>)}
				<div className={isHome ? "bg-gray-100 flex flex-wrap gap-10 justify-evenly flex-grow py-6" : "flex flex-wrap gap-10 justify-evenly flex-grow py-6"}>
					{ cars.map(car => (
						<CardCar key={car.id} car={car} />
					))}
					{isHome && (
					<div className="mt-12 w-full text-center">
						<Link
							to="/cars"
							className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
						>
							Go to All Cars
						</Link>
					</div>
					)}
				</div>
		</section>
	);
};

export default PopularCars;
