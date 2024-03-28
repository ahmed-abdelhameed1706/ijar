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
import AddCar from "@/pages/addCar/AddCar";
import Car from "@/pages/car/Car";
import BookingList from "@/pages/dashboard/bookingList/BookingList";
import Chat from "@/pages/dashboard/chat/Chat";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import CarsDashboardPage from "@/pages/dashboard/carsDashboard/CarsDashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Admin from "@/pages/admin/Admin";
import AdminCars from "@/pages/admin/cars/AdminCars";
import AdminCarts from "@/pages/admin/carts/AdminCarts";
import AdminUsers from "@/pages/admin/users/AdminUsers";
import AdminTickets from "@/pages/admin/tickets/AdminTickets";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Routes = () => {
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
    <ReactRouterRoutes>
      <Route path="/" element={<Home setCars={setCars} cars={cars} form={form} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/settings/*"
        element={
          <RequireAuth fallbackPath="/login">
            <Settings />
          </RequireAuth>
        }
      />
      <Route
        path="/addcar"
        element={<AddCar setCars={setCars} cars={cars} />}
      />
      <Route
        path="/cars/:id"
        element={
          <RequireAuth fallbackPath="/login">
            <Car setCars={setCars} cars={cars} />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {" "}
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route
          path="cars"
          element={
            <ProtectedRoute>
              <AdminCars />
            </ProtectedRoute>
          }
        />
        <Route
          path="carts"
          element={
            <ProtectedRoute>
              <AdminCarts />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets"
          element={
            <ProtectedRoute>
              <AdminTickets />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/cars" element={<Cars cars={cars} setCars={setCars} form={form} />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth fallbackPath="/login">
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route
          path="booking"
          element={
            <RequireAuth fallbackPath="/login">
              <BookingList />
            </RequireAuth>
          }
        />
        <Route
          path="mycars"
          element={
            <RequireAuth fallbackPath="/login">
              <CarsDashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="chat"
          element={
            <RequireAuth fallbackPath="/login">
              <Chat />
            </RequireAuth>
          }
        />
        <Route
          path=""
          element={
            <RequireAuth fallbackPath="/login">
              <DashboardPage />
            </RequireAuth>
          }
        />
      </Route>
    </ReactRouterRoutes>
  );
};

export default Routes;
