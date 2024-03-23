import { Link } from "react-router-dom";
import { Rate } from "antd";

const Card = ({ cars }) => {
	const id = 1;

	return (
		<>
			{cars &&
				cars.map((car) => (
					<Link
						key={car.id}
						to={`/cars/${id}`}
						className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
					>
						<img
							alt=""
							src={car.src}
							className="h-56 w-full rounded-md object-cover"
						/>

						<div className="mt-2">
							<dl className="flex justify-between flex-wrap">
								<div>
									<div>
										<dt className="sr-only">Price</dt>
										<dd className="text-sm text-gray-500">
											${car.price}
										</dd>
									</div>

									<div>
										<dt className="sr-only">Brand Name</dt>
										<dd className="font-medium">
											{car.brandName}
										</dd>
									</div>
								</div>
								<div>
									<div>
										<dt className="sr-only">Price</dt>
										<dd className="text-sm text-gray-500">
											Average Rate
										</dd>
									</div>

									<div>
										<dt className="sr-only">Brand Name</dt>
										<dd className="font-medium">
											<Rate
												allowHalf
												disabled
												defaultValue={car.averageRate}
											/>
										</dd>
									</div>
								</div>
							</dl>

							<div className="mt-6 flex items-center justify-center gap-4 text-xs flex-wrap">
								<div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
									<div className="mt-1.5 sm:mt-0">
										<p className="text-gray-500">Type</p>
										<p className="font-medium">
											{car.type}
										</p>
									</div>
								</div>

								<div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
									<div className="mt-1.5 sm:mt-0">
										<p className="text-gray-500">Model</p>
										<p className="font-medium">
											{car.model}
										</p>
									</div>
								</div>

								<div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
									<div className="mt-1.5 sm:mt-0">
										<p className="text-gray-500">Year</p>
										<p className="font-medium">
											{car.year}
										</p>
									</div>
								</div>

								<div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
									<div className="mt-1.5 sm:mt-0">
										<p className="text-gray-500">Color</p>
										<p className="font-medium">
											{car.color}
										</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
		</>
	);
};

export default Card;
