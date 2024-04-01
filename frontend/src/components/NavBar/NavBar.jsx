import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navData } from "@/data";
import { setActiveNav, classNames } from "@/helper";
import { cn } from "@/lib/utils";
import buttonVariants from "@/lib/buttonVariants";
import logo from "@/assets/images/logo.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, MenuIcon, Settings } from "lucide-react";

const NavBar = () => {
  const [navigation, setNavigation] = useState(navData);
  const user = useAuthUser();
  const logout = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();

  const signOut = async () => {
    await logout();
    navigate("/");
    toast.success("You have successfully signed out");
  };

  useEffect(() => {
    setActiveNav(navigation, setNavigation, location);
  }, [location]);

  return (
    <header className="flex w-full shrink-0 items-center px-4 py-3 md:px-6 bg-white sticky top-0 left-0 z-20 shadow-md max-[768px]:absolute ">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <div className="flex flex-col items-center justify-center px-2 pb-3 pt-2">
            {navigation.map((item) =>
              item.name === "Dashboard" && user === null ? null : (
                <SheetClose asChild key={item.name}>
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "text-primary border-b-2 border-primary "
                        : "text-gray-700 hover:text-primary",
                      "w-fit px-3 py-2 text-sm font-medium text-center"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                </SheetClose>
              )
            )}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center gap-20 justify-center md:items-stretch md:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <NavLink to="/">
            <img className="h-12 w-auto md:h-14" src={logo} alt="ijar logo" />
          </NavLink>
        </div>
        <div className="hidden md:ml-6 md:flex space-x-2 items-center">
          {navigation.map((item) =>
            item.name === "Dashboard" && user === null ? null : (
              <NavLink
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 hover:text-primary",
                  "px-3 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </NavLink>
            )
          )}
        </div>
      </div>
      {user ? (
        <div className=" flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
          {/* Profile dropdown */}

          <DropdownMenu className="">
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.imageUrl} alt={user.fullname} />
                <AvatarFallback>{user.fullname}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-1 w-48 p-2 mr-2 ">
              {user.role === "Admin" ? (
                <NavLink
                  to="/admin"
                  className={classNames(
                    // user ? "bg-gray-100" : "",
                    "flex gap-2 w-full py-1 text-gray-500 font-semibold"
                  )}
                >
                  <DropdownMenuItem className="w-full gap-2 py-2 cursor-pointer">
                    Admin
                  </DropdownMenuItem>
                </NavLink>
              ) : null}

              {user !== null && (
                <NavLink
                  to="/dashboard"
                  className={classNames("py-1 text-gray-500 font-semibold")}
                >
                  <DropdownMenuItem className="w-full gap-2 py-2 cursor-pointer">
                    <LayoutDashboard size={20} />
                    Dashboard
                  </DropdownMenuItem>
                </NavLink>
              )}
              <NavLink
                to="/settings"
                className={classNames("py-1 text-gray-500 font-semibold")}
              >
                <DropdownMenuItem className="w-full gap-2 py-2 cursor-pointer">
                  <Settings size={20} />
                  Settings
                </DropdownMenuItem>
              </NavLink>

              <NavLink
                onClick={() => signOut()}
                className={classNames(
                  "flex gap-2 w-full py-1 text-red-700 font-semibold"
                )}
              >
                <DropdownMenuItem className="w-full gap-2 py-2 cursor-pointer">
                  <LogOut size={20} />
                  Sign out
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.imageUrl}
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {user.role === "Admin" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/admin"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Admin
                      </NavLink>
                    )}
                  </Menu.Item>
                ) : null}
                {user !== null && (
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/dashboard"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/settings"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      onClick={() => signOut()}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-red-700 "
                      )}
                    >
                      Sign out
                    </NavLink>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu> */}
        </div>
      ) : (
        <div className=" flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
          <NavLink
            to="/login"
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className={cn(
              buttonVariants({
                variant: "default",
                className: "ml-2",
              })
            )}
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>

    // <Disclosure
    //   as="nav"
    //   className="bg-white sticky top-0 left-0 z-20 shadow-lg max-[768px]:absolute max-[768px]:w-full"
    // >
    //   {({ open }) => (
    //     <>
    //       <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
    //         <div className="relative flex h-16 items-center justify-between">
    //           <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
    //             {/* Mobile menu button*/}
    //             <Disclosure.Button
    //               className="relative inline-flex items-center justify-center
    //                                           rounded-md p-2 text-primary hover:bg-gray-100
    //                                           hover:text-primary focus:outline-none focus:ring-2
    //                                           focus:ring-inset focus:ring-primary"
    //             >
    //               <span className="absolute -inset-0.5" />
    //               <span className="sr-only">Open main menu</span>
    //               {open ? (
    //                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
    //               ) : (
    //                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
    //               )}
    //             </Disclosure.Button>
    //           </div>
    //           <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
    //             <div className="flex flex-shrink-0 items-center">
    //               <NavLink to="/">
    //                 <img
    //                   className="h-12 w-auto md:h-14"
    //                   src={logo}
    //                   alt="ijar logo"
    //                 />
    //               </NavLink>
    //             </div>
    //             {/* <div className="hidden md:ml-6 md:block"> */}
    //             <div className="hidden md:ml-6 md:flex space-x-2 items-center">
    //               {navigation.map((item) =>
    //                 item.name === "Dashboard" && user === null ? null : (
    //                   <NavLink
    //                     key={item.name}
    //                     to={item.href}
    //                     className={classNames(
    //                       item.current
    //                         ? "text-primary border-b-2 border-primary"
    //                         : "text-gray-700 hover:text-primary",
    //                       "px-3 py-2 text-sm font-medium"
    //                     )}
    //                     aria-current={item.current ? "page" : undefined}
    //                   >
    //                     {item.name}
    //                   </NavLink>
    //                 )
    //               )}
    //             </div>
    //             {/* </div> */}
    //           </div>
    //           {user ? (
    //             <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
    //               <button
    //                 type="button"
    //                 className="relative rounded-full bg-gray-200 p-1 text-primary
    //                             hover:text-primary focus:outline-none focus:ring-2
    //                             focus:ring-primary focus:ring-offset-2
    //                             focus:ring-offset-primary"
    //               >
    //                 <span className="absolute -inset-1.5" />
    //                 <span className="sr-only">View notifications</span>
    //                 <BellIcon className="h-6 w-6" aria-hidden="true" />
    //               </button>

    //               {/* Profile dropdown */}
    //               <Menu as="div" className="relative ml-3">
    //                 <div>
    //                   <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //                     <span className="absolute -inset-1.5" />
    //                     <span className="sr-only">Open user menu</span>
    //                     <img
    //                       className="h-8 w-8 rounded-full"
    //                       src={user.imageUrl}
    //                       alt=""
    //                     />
    //                   </Menu.Button>
    //                 </div>
    //                 <Transition
    //                   as={Fragment}
    //                   enter="transition ease-out duration-100"
    //                   enterFrom="transform opacity-0 scale-95"
    //                   enterTo="transform opacity-100 scale-100"
    //                   leave="transition ease-in duration-75"
    //                   leaveFrom="transform opacity-100 scale-100"
    //                   leaveTo="transform opacity-0 scale-95"
    //                 >
    //                   <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                     {user.role === "Admin" ? (
    //                       <Menu.Item>
    //                         {({ active }) => (
    //                           <NavLink
    //                             to="/admin"
    //                             className={classNames(
    //                               active ? "bg-gray-100" : "",
    //                               "block px-4 py-2 text-sm text-gray-700"
    //                             )}
    //                           >
    //                             Admin
    //                           </NavLink>
    //                         )}
    //                       </Menu.Item>
    //                     ) : null}
    //                     {user !== null && (
    //                       <Menu.Item>
    //                         {({ active }) => (
    //                           <NavLink
    //                             to="/dashboard"
    //                             className={classNames(
    //                               active ? "bg-gray-100" : "",
    //                               "block px-4 py-2 text-sm text-gray-700"
    //                             )}
    //                           >
    //                             Dashboard
    //                           </NavLink>
    //                         )}
    //                       </Menu.Item>
    //                     )}
    //                     <Menu.Item>
    //                       {({ active }) => (
    //                         <NavLink
    //                           to="/settings"
    //                           className={classNames(
    //                             active ? "bg-gray-100" : "",
    //                             "block px-4 py-2 text-sm text-gray-700"
    //                           )}
    //                         >
    //                           Settings
    //                         </NavLink>
    //                       )}
    //                     </Menu.Item>
    //                     <Menu.Item>
    //                       {({ active }) => (
    //                         <NavLink
    //                           onClick={() => signOut()}
    //                           className={classNames(
    //                             active ? "bg-gray-100" : "",
    //                             "block px-4 py-2 text-sm text-red-700 "
    //                           )}
    //                         >
    //                           Sign out
    //                         </NavLink>
    //                       )}
    //                     </Menu.Item>
    //                   </Menu.Items>
    //                 </Transition>
    //               </Menu>
    //             </div>
    //           ) : (
    //             <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
    //               <NavLink
    //                 to="/login"
    //                 className={cn(
    //                   buttonVariants({
    //                     variant: "outline",
    //                   })
    //                 )}
    //               >
    //                 Sign In
    //               </NavLink>
    //               <NavLink
    //                 to="/signup"
    //                 className={cn(
    //                   buttonVariants({
    //                     variant: "default",
    //                     className: "ml-2",
    //                   })
    //                 )}
    //               >
    //                 Sign Up
    //               </NavLink>
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       <Disclosure.Panel className="md:hidden">
    //         {/* <div className="flex flex-shrink-0 items-center justify-center">
    //           <NavLink to="/">
    //             <img
    //               className="h-12 w-auto md:h-14"
    //               src={logo}
    //               alt="ijar logo"
    //             />
    //           </NavLink>
    //         </div> */}
    //         <div className="space-y-1 px-2 pb-3 pt-2">
    //           {navigation.map((item) => (
    //             <Disclosure.Button
    //               key={item.name}
    //               as={NavLink}
    //               to={item.href}
    //               className={classNames(
    //                 item.current
    //                   ? "text-primary border-b-2 border-primary"
    //                   : "text-gray-700 hover:text-primary",
    //                 "block px-3 py-2 text-base font-medium"
    //               )}
    //               aria-current={item.current ? "page" : undefined}
    //             >
    //               {item.name}
    //             </Disclosure.Button>
    //           ))}
    //         </div>
    //       </Disclosure.Panel>
    //     </>
    //   )}
    // </Disclosure>
  );
};

export default NavBar;
