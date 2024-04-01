/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Filter from "@/components/filter/Filter";
import { toast } from "react-toastify";
import MotionTop from "@/components/motion/MotionTop";
import Pagenation from "@/components/pagenation/Pagenation";
import CarCard from "@/components/card/CarCard";

const Cars = ({ setCars, cars, form }) => {
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPage] = useState(0);

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get("/search", {
          headers: {
            "Content-Type": "application/json",
          },
          params: { ...form.getValues(), page },
        });
        setCars(response.data.cars);
        setNumberPage(response.data.numberPages);
      } catch (e) {
        toast.error(e.response.data.message);
      }
    };
    getCars();
  }, [page]);

  async function handleSubmit(values) {
    setPage(0);
    try {
      const response = await axios.get("/search", {
        headers: {
          "Content-Type": "application/json",
        },
        params: { ...values, page },
      });
      setCars(response.data.cars);
      setNumberPage(response.data.numberPages);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <section className="flex flex-col gap-10 justify-evenly">
      <MotionTop>
        <div className="mx-auto max-w-lg text-center pt-10">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Find Your Perfect Car
          </h2>
          <p className="mt-4">
            Narrow down your search and find the car that&apos;s perfect for
            you! Use our convenient filters to specify your desired features,
            location, and rental price range ...
          </p>
        </div>
      </MotionTop>
      <div className="bg-gray-100 border-y">
        <Filter form={form} handleSubmit={handleSubmit} />
      </div>
      <div className="flex flex-wrap gap-10 justify-evenly flex-grow py-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <Pagenation
        cars={cars}
        setPage={setPage}
        page={page}
        number={numberPages}
      />
    </section>
  );
};

export default Cars;
