import { Button } from "@/components/ui/button";
import SideBar from "@/components/sideBar/SideBar"
import { useState } from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import ProfileSetting from "./profileSetting/ProfileSetting";
import Security from "./security/Security";
import Delete from "./delete/Delete";

const Settings = () => {
    const [openBar, setOpenBar] = useState(false)

    return (
        <div className="flex w-full relative">
            <Button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button"
                className="min-[700px]:hidden bg-transparent inline-flex items-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 absolute top-2"
                onClick={() => setOpenBar(!openBar)}
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path style={{ clipRule: "evenodd", fillRule: "evenodd" }}  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </Button>
            <SideBar
                openBar={openBar}
                setOpenBar={setOpenBar}
            />
            <ReactRouterRoutes>
              <Route path="/" element={
                <ProfileSetting
                  setOpenBar={setOpenBar}
                />
              }/>
              <Route path="/security" element={
                <Security
                  setOpenBar={setOpenBar}
                />
              }/>
              <Route path="/delete" element={
                <Delete
                  setOpenBar={setOpenBar}
                />
              }/>
            </ReactRouterRoutes>
        </div>
    )
}

export default Settings;