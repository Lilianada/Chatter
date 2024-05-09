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
    { name: "Home", to: "/articles", icon: HomeIcon, current: true },
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 "
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          {/* Header */}
          {/* <Header /> */}
        </div>

        <main className="pt-4 lg:pt-8 pb-10 lg:mx-4 sm:mx-6 bg-white">
          <div className="px-2">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
