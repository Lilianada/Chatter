import { useState } from "react";
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
    <main className="h-screen flex flex-col">
      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />

        <div className="flex flex-1 flex-col lg:pl-20">
          {/* Header */}
          <Header setSidebarOpen={setSidebarOpen} />

          {/* Content Area */}
          <div className="relative md:ml-20 md:mt-[4.5rem] flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer/>
    </main>
  );
}
