import { Button } from "@/components/ui/button";
import {
  BookText,
  CarFront,
  LayoutDashboardIcon,
  MessageCircle,
  SettingsIcon,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useScreenSize from "../../utils/useScreenSize";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DashboardLayout = () => {
  const user = useAuthUser();
  const location = useLocation();
  const screenSize = useScreenSize();

  const dashNav = [
    {
      name: "Dashboard",
      icon: <LayoutDashboardIcon />,
      path: "/dashboard",
      role: "both",
    },
    {
      name: "Booking List",
      icon: <BookText />,
      path: "booking",
      role: "both",
    },
    user?.role === "Owner" && {
      name: "My Cars",
      icon: <CarFront />,
      path: "mycars",
      role: "owner",
    },
    {
      name: "Chat",
      icon: <MessageCircle />,
      path: "chat",
      role: "both",
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
      role: "both",
    },
  ].filter(Boolean);
  return (
    <div className="h-full bg-white">
      <nav className="px-4 py-6">
        <TooltipProvider>
          <ul className="flex justify-evenly items-center">
            {dashNav.map((item, index) =>
              screenSize.width > 768 ? (
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
              ) : (
                <Tooltip key={`tooltip-${index}`} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <li key={item.name}>
                      <Link to={item.path}>
                        <Button
                          className={`w-fit h-fit p-4 rounded-full flex-col text-gray-600 ${
                            location.pathname.endsWith(item.path) &&
                            "border-primary text-primary"
                          }`}
                          variant={"outline"}
                        >
                          {item.icon}
                          {/* {item.name} */}
                        </Button>
                      </Link>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span>{item.name}</span>
                  </TooltipContent>
                </Tooltip>
              )
            )}
          </ul>
        </TooltipProvider>
      </nav>
      <main className="m-4 p-6 rounded-lg bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
