import Home from "@/pages/home/home";
import NotFound from "@/pages/notFound/notFound";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import ResetPassword from "@/pages/resetPassword/ResetPassword";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import About from "@/pages/about/about";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import Settings from "@/pages/settings/Settings";
import Cars from "@/pages/cars/cars";

const Routes = () => {
	return (
		<ReactRouterRoutes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/cars" element={<Cars />} />
			<Route path="/dashboard" element={<DashboardLayout />} />
			<Route path="/about" element={<About />} />
			<Route path="/settings/*" element={<Settings />} />
			<Route path="*" element={<NotFound />} />
		</ReactRouterRoutes>
	);
};

export default Routes;
