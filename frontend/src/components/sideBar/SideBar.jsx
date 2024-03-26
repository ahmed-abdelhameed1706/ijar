/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { setActiveNav, classNames } from '@/helper';

const SideBar = ({openBar, setOpenBar}) => {

    const [navigation, setNavigation] = useState([
        { name: "Account Settings", href: "/settings", current: true },
        { name: "Password & Security", href: "/settings/security", current: false },
        { name: "Delete Account", href: "/settings/delete", current: false },
    ]);
    const location = useLocation();

    useEffect(() => {
        setActiveNav(navigation, setNavigation, location);
    }, [location]);

    
    return (
        <>
            <aside id="default-sidebar" 
                className={openBar ? 
                    "absolute p-3 w-60 h-full bg-gray-50 transition-transform -translate-x-full translate-x-0 border-solid border-r border-gray-200 z-10"
                    : "p-3 w-80 h-full transition-transform -translate-x-full max-[700px]:absolute min-[700px]:translate-x-0 border-solid border-r border-gray-200"

            } 
                aria-label="Sidebar" >
                <button
                    className={openBar ? "min-[700px]:hidden bg-transparent inline-flex items-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" : "min-[700px]:hidden"}
                    onClick={() => setOpenBar(!openBar)}
                >
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </button>
                <h1 className="text-3xl text-left py-2 font-bold">Settings</h1>
                <p className="text-sm py-2">Control and manage your account, and explore various options to personalize your experience.</p>
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="font-medium space-y-3">
                        {navigation.map((item) => (
                            <NavLink
                            key={item.name}
                            to={item.href}
                            className={classNames(
                                item.current
                                ? "text-primary text-left w-100 border-b-2 border-primary"
                                : "text-gray-700 hover:text-primary",
                                " py-2 pl-1 block text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            >
                            {item.name}
                            </NavLink>))}
                    </div>
                </div>
            </aside>
   </>

    )
}

export default SideBar;