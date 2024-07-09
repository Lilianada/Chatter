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
    name: "Activities",
    to: "/dashboard/activities",
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
    <div className="h-screen w-screen md:grid md:grid-areas-layout grid-cols-layout grid-rows-layout relative">
      {/* Sidebar */}
      <div className="grid-in-sidebar">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />
      </div>
      {/* Header */}
      <div className="md:grid-in-header flex flex-col fixed top-0 z-40 w-screen md:w-[calc(100vw_-_5rem)]">
        <Header setSidebarOpen={setSidebarOpen} />
      </div>
      {/* Main content */}
      <div className="md:grid-in-content mt-[4.5rem]">
        <Outlet />
      </div>
      {/* Footer */}
      <div className="w-screen grid-in-footer md:w-[calc(100vw_-_5rem)] relative bottom-0 z-40">
        <Footer />
      </div>
    </div>
  );
}
