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
import { useState, useEffect, useRef } from "react";
import axios from "@/api/axios";

const Routes = () => {
  const [cars, setCars] = useState([]);
  const fetchRef = useRef(false);

  useEffect(() => {
    if (fetchRef.current) {
      const getCars = async () => {
        try {
          const response = await axios.get("/api/cars", {
            params: { limit: 10 },
            headers: { "Content-Type": "application/json" },
          });
          setCars(response.data);
        } catch (e) {
          console.log(e.message);
        }
      };
      getCars();
    }
    if (!fetchRef.current) fetchRef.current = true;
  }, []);

  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home setCars={setCars} cars={cars} />} />
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
        path="/car/:id"
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
      <Route path="/cars" element={<Cars cars={cars} setCars={setCars} />} />
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
