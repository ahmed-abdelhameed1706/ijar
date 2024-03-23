import { ImagesSlider } from "@/components/ui/images-slider.tsx";
import { Link } from "react-router-dom";
import { slideImages } from "@/data";
import { motion } from "framer-motion";

const ImagesSliderComponent = () => {
	return (
		<section>
			<ImagesSlider className="relative p-10" images={slideImages}>
				<div className="bg-black h-full w-full z-10 absolute opacity-50"></div>
				<motion.div
					initial={{
						opacity: 0,
						y: -80,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.6,
					}}
					className="z-50 flex flex-col justify-center items-center"
				>
					<motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-slate-100 bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
						Web Application <br /> for Renting Cars
						<br />
					</motion.p>
					<Link
						to="/cars"
						className="px-10 py-2 backdrop-blur-sm border text-2xl border-primary hover:opacity-80 text-white mx-auto text-center rounded-full relative mt-4"
					>
						<span>All Cars →</span>
						<div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
					</Link>
				</motion.div>
			</ImagesSlider>
		</section>
	);
};

export default ImagesSliderComponent;
