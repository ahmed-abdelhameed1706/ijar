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

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
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
      <Route path="/addcar" element={<AddCar />} />
      <Route
        path="/car"
        element={
          <RequireAuth fallbackPath="/login">
            <Car />
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
      <Route path="/cars" element={<Cars />} />
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
