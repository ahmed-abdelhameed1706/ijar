import { NavLink } from "react-router-dom";
import { handleScrollToTop } from "@/helper";

const Footer = () => {
	return (
		<footer className="bg-gray-900">
			<div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
					<NavLink
						className="inline-block rounded-full p-2 text-white shadow transition sm:p-3 lg:p-4 bg-gray-700 hover:bg-gray-600"
						to="#"
						onClick={handleScrollToTop}
					>
						<span className="sr-only">Back to top</span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</NavLink>
				</div>

				<div className="lg:flex lg:items-end lg:justify-between">
					<div>
						<div className="flex justify-center lg:justify-start">
							<NavLink to="/">
								<button className="block w-auto text-gray-200 overline font-black text-xl">
									Ijar
								</button>
							</NavLink>
						</div>

						<p className="mx-auto mt-6 max-w-md text-center leading-relaxed lg:text-left text-gray-400">
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Incidunt consequuntur amet culpa cum itaque
							neque.
						</p>
					</div>

					<ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-4">
						<li>
							<NavLink
								className="transition text-white hover:text-white/75"
								to="/"
							>
								Home
							</NavLink>
						</li>

						<li>
							<NavLink
								className="transition text-white hover:text-white/75"
								to="/about"
							>
								About
							</NavLink>
						</li>

						<li>
							<NavLink
								className="transition text-white hover:text-white/75"
								to="/projects"
							>
								Projects
							</NavLink>
						</li>

						<li>
							<NavLink
								className="transition text-white hover:text-white/75"
								to="/calendar"
							>
								Calender
							</NavLink>
						</li>
					</ul>
				</div>

				<p className="mt-12 text-center text-sm lg:text-right text-gray-400">
					Copyright &copy; 2024. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
