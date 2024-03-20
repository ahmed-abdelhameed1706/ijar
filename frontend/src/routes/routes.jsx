import Home from "@/pages/home/home";
import NotFound from "@/pages/notFound/notFound";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import ForgetPassword from "@/pages/ForgetPassword/ForgetPassword";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import About from "@/pages/about/about";

const Routes = () => {
	return (
		<ReactRouterRoutes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/reset-password" element={<ForgetPassword />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<NotFound />} />
		</ReactRouterRoutes>
	);
};

export default Routes;
