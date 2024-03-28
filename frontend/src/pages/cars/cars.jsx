/* eslint-disable react/prop-types */
import { useEffect } from "react";
import axios from "@/api/axios";
import CarCard from "@/components/Card/CarCard";
import Filter from "@/components/filter/Filter";
import { toast } from "react-toastify";

const Cars = ({ setCars, cars, form }) => {

	useEffect(() => {
		const getCars = async () => {
		try {
			const response = await axios.get(
				"/search",
				{
					headers: {
						"Content-Type": "application/json",
					},
					params: form.getValues(),
				}
			);
			setCars(response.data);
		} catch (e) {
			toast.error(e.response.data.message);
		}
		};
		getCars();
	}, []);

	async function handleSubmit(values) {
		try {
				const response = await axios.get(
					"/search",
					{
						headers: {
							"Content-Type": "application/json",
						},
						params: {...values},
					}
				);
				setCars(response.data);
			} catch (e) {
				toast.error(e.response.data.message);
			}
		}

	return (
		<section className="flex flex-col gap-10 justify-evenly">
			<div className="mx-auto ma
			
			x-w-lg text-center pt-10">
				<h2 className="text-3xl font-bold sm:text-4xl">
					Find Your Perfect Car
				</h2>
				<p className="mt-4">
				Narrow down your search and find the car that&apos;s perfect for you!  Use our convenient filters to specify your desired features, location, and rental price range ... 
				</p>
			</div>
		<div className="bg-gray-100 border-y">
			<Filter form={form} handleSubmit={handleSubmit}/>
		</div>
		<div className="flex flex-wrap gap-10 justify-evenly flex-grow py-6">
			{cars.map(car => (
				<CarCard key={car.id} car={car} />
			))}
		</div>
		</section>
	);
};

export default Cars;
