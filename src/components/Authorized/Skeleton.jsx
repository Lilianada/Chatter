import React, { useState } from "react";
import {
  DocumentChartBarIcon,
  CreditCardIcon,
  HomeIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import CustomModal from "../Utils/CustomModal";
import { auth } from "../../config/firebase";

export default function Skeleton() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

      <Header setSidebarOpen={setSidebarOpen} />
      {isOpen && (
        <CustomModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Signout"
          description="Are you sure you want to sign out of your account?"
          showConfirmButton={true}
          confirmButtonText="Sign Out"
          cancelButtonText="Cancel"
          confirmButtonBgColor="bg-red-600"
          confirmButtonTextColor="text-white"
          onConfirm={() => {
            setIsLoading(true);
            auth
              .signOut()
              .then(() => {
                setIsLoading(false);
                navigate("/");
              })
              .catch((error) => {
                setIsLoading(false);
                console.error("Error signing out:", error);
              });
          }}
          onCancel={() => setIsOpen(false)}
          Icon={ExclamationTriangleIcon}
          iconBgColor="bg-red-100"
          buttonBgColor="bg-red-600"
          iconTextColor="text-red-600"
          loading={isLoading}
        />
      )}

      <main className="pt-4 lg:pt-8 pb-10 bg-white md:w-[calc(100vw_-_5rem)] ml-auto px-4">
        <div className="px-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
