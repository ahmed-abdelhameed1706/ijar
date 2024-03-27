import React from "react";
import { Button } from "@/components/ui/button";
import {
  CarFront,
  LayoutDashboardIcon,
  MessageCircle,
  PersonStanding,
  SettingsIcon,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const location = useLocation();

  const dashNav = [
    {
      name: "Users",
      icon: <PersonStanding />,
      path: "users",
      role: "Admin",
    },
    {
      name: "Cars",
      icon: <CarFront />,
      path: "cars",
      role: "Admin",
    },
    {
      name: "Carts",
      icon: <LayoutDashboardIcon />,
      path: "carts",
      role: "Admin",
    },
    {
      name: "Tickets",
      icon: <MessageCircle />,
      path: "tickets",
      role: "Admin",
    },
  ];
  return (
    <div className="h-full bg-white">
      <nav className="px-4 py-6">
        <ul className="flex justify-evenly items-center">
          {dashNav.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>
                <Button
                  className={`w-24 h-24 rounded-full flex-col text-gray-600 ${
                    location.pathname.endsWith(item.path) &&
                    "border-primary text-primary"
                  }`}
                  variant={"outline"}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="m-4 p-6 rounded-lg bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
