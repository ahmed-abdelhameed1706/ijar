import { useState } from "react";

const Images = () => {
  const carData = [
    {
      imageUrl: "https://source.unsplash.com/500x400/?car",
      title: "2023 Toyota Camry",
    },
    {
      imageUrl: "https://source.unsplash.com/500x400/?red+car",
      title: "2022 Ford Mustang",
    },
    {
      imageUrl: "https://source.unsplash.com/500x400/?blue+car",
      title: "2021 Honda Accord",
    },
    {
      imageUrl: "https://source.unsplash.com/500x400/?black+car",
      title: "2021 Honda Accord",
    },
  ];

  const [next, setNext] = useState(1);
  const [prev, setPrev] = useState(carData.length - 1);
  const [cur, setCur] = useState(0);

  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg xl:h-96">
        {carData.map((image, index) => (
          <div className="duration-700 ease-in-out" key={index}>
            <img
              src={image.imageUrl}
              className={
                index === cur
                  ? "absolute rounded-lg block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  : "hidden"
              }
              alt=""
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setNext(cur);
          setCur(prev);
          prev > 0 ? setPrev(prev - 1) : setPrev(carData.length - 1);
        }}
        className="cursor-pointer absolute h-56 top-0 start-12 flex items-center justify-center px-4 group focus:outline-noclassNane rounded-lg w-20 max-[800px]:start-0 max-[800px]:top-[37%] max-[800px]:h-10 max-[800px]:w-15 max-[800px]:rounded-full xl:h-96 "
      >
        <img
          src={carData[prev].imageUrl}
          className="absolute h-full block max-w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-fit rounded-lg object-cover max-[800px]:hidden"
          alt=""
        />
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400/35 group-hover:bg-gray-400/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none min-[800px]:hidden">
          <svg
            className="w-4 h-4 text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => {
          setPrev(cur);
          setCur(next);
          next < carData.length - 1 ? setNext(next + 1) : setNext(0);
        }}
        className="cursor-pointer absolute h-56 top-0 end-12 flex items-center justify-center px-4 group focus:outline-none rounded-lg w-20 max-[800px]:end-0 max-[800px]:top-[37%] max-[800px]:h-10 max-[800px]:w-15 max-[800px]:rounded-full xl:h-96 "
      >
        <img
          src={carData[next].imageUrl}
          className="absolute h-full block max-w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg object-cover max-[800px]:hidden"
          alt=""
        />
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400/35 group-hover:bg-gray-400/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none min-[800px]:hidden">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
      <div className="flex justify-center items-center space-x-3 pt-4">
        {carData.map((_, index) => (
          <button
            key={index}
            type="button"
            className={
              cur === index
                ? "w-2 h-2 rounded-full bg-gray-400"
                : "w-2 h-2 rounded-full bg-gray-300"
            }
            onClick={() => {
              setCur(index);
              index > 0 ? setPrev(index - 1) : setPrev(carData.length - 1);
              index < carData.length - 1 ? setNext(index + 1) : setNext(0);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Images;
