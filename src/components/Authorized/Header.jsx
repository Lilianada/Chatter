import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import CustomModal from "../Utils/CustomModal";
import { useSelector } from "react-redux";

export default function Header({ setSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const profilepic = useSelector((state) => state.user.profilepic);

  const handleSignOut = () => {
    setIsOpen(true);
  };

  const confirmSignout = () => {
    setIsLoading(true);
    auth
      .signOut()
      .then(() => {
        localStorage.clear();
        setIsLoading(false);
        navigate("/signin");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error during Firebase sign out:", error);
      });
  };

  return (
    <div className="flex flex-1 items-center gap-x-6 bg-chocolate px-4 py-4 shadow-sm sm:px-6 ">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-400 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 hidden sm:flex">
        <h4 className="text-sm font-semibold leading-6 text-white md:hidden">
          Chatter
        </h4>
      </div>
      <form
        className="relative flex flex-1 bg-neutral-800 p-3 rounded-lg"
        action="#"
        method="GET"
      >
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <MagnifyingGlassIcon
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3"
          aria-hidden="true"
        />
        <input
          id="search-field"
          className="block h-full w-full border-0 py-0 pl-8 pr-0 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-neutral-800"
          placeholder="Search..."
          type="search"
          name="search"
        />
      </form>
      <Menu as="div" className="relative flex gap-4">
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          { !profilepic ? <UserCircleIcon className="h-8 w-8 text-neutral-200" /> : 
            <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src={profilepic}
            alt="profilePic"
          />}
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
        <button
          type="button"
          className="relative rounded-full bg-yellow-600 p-1.5 text-neutral-600 hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
        >
          <span className="absolute -inset-1.5" />
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">New Article</span>
        </button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              <Link
                to="/dashboard/profile"
                className="bg-neutral-50 block px-3 py-1 text-sm leading-6 text-gray-900"
              >
                Your profile
              </Link>
            </Menu.Item>
            <Menu.Item key="sign-out">
              <button
                onClick={handleSignOut}
                className="bg-neutral-50 block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-rose-600"
              >
                Sign out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
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
          onConfirm={confirmSignout}
          onCancel={() => setIsOpen(false)}
          Icon={ExclamationTriangleIcon}
          iconBgColor="bg-red-100"
          buttonBgColor="bg-red-600"
          iconTextColor="text-red-600"
          loading={isLoading}
        />
      )}
    </div>
  );
}
