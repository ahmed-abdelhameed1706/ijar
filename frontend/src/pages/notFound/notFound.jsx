import { NavLink } from "react-router-dom";

const NotFound = () => {
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-7xl font-semibold text-primary">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Oops! Page not found!
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					The page you requested was not found.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<NavLink
						to="/"
						className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Back to Home
					</NavLink>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
