import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../assets/colored_logo.png";
import smallLogo from "../../assets/logoIcon.svg";
import CustomModal from "../Utils/CustomModal";
import { auth } from "../../config/firebase";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, navigation }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    setIsOpen(true);
  };

  return (
    <div>
     {/* sidebar for mobile */}
     <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img className="h-16 w-auto" src={Logo} alt="Chatter App" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="-mx-2 flex-1 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-neutral-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-neutral-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li
                        className="mt-auto absolute bottom-1 w-11/12"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <button
                          onClick={handleSignOut}
                          className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-yellow-500 hover:text-yellow-600 hover:bg-neutral-800 w-full mb-2"
                        >
                          <ArrowLeftStartOnRectangleIcon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          Signout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:flex md:flex-col md:justify-between md:overflow-y-auto md:bg-chocolate md:pb-4 md:w-20">
        <div className="flex h-16 shrink-0 items-center justify-center">
          <img className="h-8 w-auto" src={smallLogo} alt="Chatter App" />
        </div>
        <nav className="">
          <ul className="flex flex-col items-center space-y-6">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-neutral-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-neutral-800",
                    "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon className="h-7 w-7 shrink-0" aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </li>
            ))}
            
          </ul>
        </nav>
        <button
          onClick={handleSignOut}
          className="md:group md:flex md:justify-center md:mx-4 md:gap-x-3 md:rounded-md md:p-3 md:text-sm md:leading-6 md:font-semibold md:text-yellow-500 md:hover:text-yellow-600 md:hover:bg-neutral-800"
        >
          <ArrowLeftStartOnRectangleIcon
            className="h-7 w-7 shrink-0"
            aria-hidden="true"
          />
          <span className="sr-only">Signout</span>
        </button>
      </div>
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
    </div>
  );
}
