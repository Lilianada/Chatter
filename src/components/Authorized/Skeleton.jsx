import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  DocumentChartBarIcon,
  CalendarIcon,
  CreditCardIcon,
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Skeleton() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const navigation = [
    { name: "Home", to: "/browse", icon: HomeIcon, current: true },
    {
      name: "Profile",
      to: "/profile",
      icon: UserCircleIcon,
      current: false,
    },
    {
      name: "New Article",
      to: "/dashboard/new-article",
      icon: DocumentChartBarIcon,
      current: false,
    },
    {
      name: "Settings",
      to: "/dashboard/fixed_term_deposits",
      icon: CreditCardIcon,
      current: false,
    },
  ];

  return (
    <div>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />

      <div className="lg:pl">
       

        <main className="pt-4 lg:pt-8 pb-10 lg:mx-4 sm:mx-6 bg-white">
          <div className="px-2">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
