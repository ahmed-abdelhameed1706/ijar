import { url } from "@/data";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [cookieValue, setCookieValue] = useState("");

	useEffect(() => {
		const cookie = Cookies.get("authorization");
		if (cookie) {
			setCookieValue(cookie);
			axios
				.get(`${url}/api/users`, {
					withCredentials: true,
					Headers: {
						authorization: cookieValue,
					},
				})
				.then((data) => {
					setUser(data);
					console.log(data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, cookieValue }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
