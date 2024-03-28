/* eslint-disable react/prop-types */
import PopularCars from "@/components/Home/PopularCars";
import { useEffect, useRef } from "react";
import axios from "@/api/axios";

const Cars = ({ setCars, cars, form }) => {

	const fetchRef = useRef(false);

	useEffect(() => {
		if (fetchRef.current) {
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
				console.log(e.message);
			}
			};
			getCars();
		}
		if (!fetchRef.current) fetchRef.current = true;
	}, []);

	return <PopularCars setCars={setCars} cars={cars} form={form} />;
};

export default Cars;
