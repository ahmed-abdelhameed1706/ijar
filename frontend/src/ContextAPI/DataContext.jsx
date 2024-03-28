/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    const formSchema = z
		.object({
			brandName: z.string(),
			model: z.string(),
			minYear: z.string(),
			maxYear: z.string(),
			type: z.string(),
			color: z.string(),
			minPrice: z.string(),
			maxPrice: z.string(),
			location: z.string(),
			fuel: z.string(),
		})

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			brandName: "",
			model: "",
			minYear: "",
			maxYear: "",
			type: "",
			color: "",
			minPrice: '',
			maxPrice: "",
			location: "",
			fuel: "",
		},
	});

    return (
        <DataContext.Provider value={{ cars, setCars, form }}>
            {children}
        </DataContext.Provider>
    )
};

export default  DataContext;
