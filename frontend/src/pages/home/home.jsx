/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import ImagesSliderComponent from "@/components/Home/ImagesSlider";
import PopularCars from "@/components/Home/PopularCars";
import { useEffect } from "react";
import axios from "@/api/axios";

const Home = ({setCars, cars, form }) => {

	useEffect(() => {
			const getCars = async () => {
			try {
				const response = await axios.get("/api/cars", {
				params: { limit: 10 },
				headers: { "Content-Type": "application/json" },
				});
				setCars(response.data);
			} catch (e) {
				console.log(e.message);
			}
			};
			getCars();
	}, []);

	return (
		<div className="">
			<ImagesSliderComponent />
			<PopularCars isHome={true} setCars={setCars} cars={cars} form={form} />
		</div>
	);
};

export default Home;
