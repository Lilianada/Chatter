import React, { useState, useRef } from "react";
import CategoryTabs from "./CategoryTabs";
import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  BellIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const navigation = [
  { name: "Home", to: "/dashboard/", icon: HomeIcon, current: true },
  {
    name: "Profile",
    to: "/dashboard/profile",
    icon: UserCircleIcon,
    current: false,
  },
  {
    name: "New Article",
    to: "/dashboard/new-article",
    icon: PencilSquareIcon,
    current: false,
  },
  {
    name: "Settings",
    to: "/dashboard/settings",
    icon: Cog6ToothIcon,
    current: false,
  },
  {
    name: "Notification",
    to: "/dashboard/notification",
    icon: BellIcon,
    current: false,
  },
  {
    name: "Help",
    to: "/dashboard/help",
    icon: QuestionMarkCircleIcon,
    current: false,
  },
];

export default function Skeleton() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen grid grid-areas-layout grid-cols-layout grid-rows-layout relative">
      {/* Sidebar */}
      <div className="grid-in-sidebar">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />
      </div>
      {/* Header */}
      <div className="grid-in-header flex flex-col fixed top-0 z-40 w-[calc(100vw_-_5rem)]">
        <Header setSidebarOpen={setSidebarOpen} />
      </div>
      {/* Main content */}
      <div className="grid-in-content relative top-[4.5rem]">
        <Outlet />
      </div>
      {/* Footer */}
      <div className="grid-in-footer fixed z-40 bottom-0 w-[calc(100vw_-_5rem)]">
        <Footer />
      </div>
    </div>
  );
}
