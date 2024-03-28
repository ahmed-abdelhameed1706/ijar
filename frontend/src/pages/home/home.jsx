/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import ImagesSliderComponent from "@/components/Home/ImagesSlider";
import PopularCars from "@/components/Home/PopularCars";

const Home = ({setCars, cars}) => {
	return (
		<div className="">
			<ImagesSliderComponent />
			<PopularCars isHome={true} setCars={setCars} cars={cars} />
		</div>
	);
};

export default Home;
