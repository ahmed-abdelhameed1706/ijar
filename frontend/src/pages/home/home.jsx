import ImagesSliderComponent from "@/components/Home/ImagesSlider";
import PopularCars from "@/components/Home/PopularCars";

const Home = () => {
	return (
		<div className="">
			<ImagesSliderComponent />
			<PopularCars isHome={true} />
		</div>
	);
};

export default Home;
