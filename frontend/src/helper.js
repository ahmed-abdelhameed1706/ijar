import axios from "axios";
import { url } from "./data";
import { toast } from "react-toastify";

const signOut = (cookieValue) => {
	console.log(cookieValue);
	axios
		.post(`${url}/auth/logout`, {
			withCredentials: true,
			Headers: {
				authorization: cookieValue,
			},
		})
		.then((data) => {
			toast(data.data.message);
			console.log(data);
		})
		.catch((err) => console.log(err));
};

const setActiveNav = (navigation, setNavigation, location) => {
	const newNave = navigation.map((el) => {
		if (el.href === location.pathname) el.current = true;
		else el.current = false;
		return el;
	});
	setNavigation(newNave);
};

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

export { signOut, setActiveNav, classNames };
