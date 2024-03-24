import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  MessageCircle,
  PersonStanding,
  SettingsIcon,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();

  console.log(location.pathname);

  const dashNav = [
    {
      name: "Dashboard",
      icon: <LayoutDashboardIcon />,
      path: "/dashboard",
      role: "",
    },
    {
      name: "Booking List",
      icon: <PersonStanding />,
      path: "booking",
      role: "both",
    },
    {
      name: "Chat",
      icon: <MessageCircle />,
      path: "chat",
      role: "user",
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
      role: "user",
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

export default DashboardLayout;
