import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/ChatterLogo.svg";
import { Link } from "react-router-dom";
import { signoutUser } from "../../config/authorization";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  navigation,
}) {
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(false);

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.to === location.pathname,
  }));

  const onSignOut = () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        await signoutUser();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };


  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
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
              {/* Sidebar */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img className="h-12 w-auto" src={Logo} alt="Your Company" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {updatedNavigation.map((item) => (
                          <li
                            key={item.name}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <Link
                              to={item.to}
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800",
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
                      </ul>
                    </li>
                    <li
                      className="mt-auto"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <button
                        onClick={onSignOut}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-rose-500 hover:text-rose-700 hover:bg-gray-800 "
                      >
                        <Cog6ToothIcon
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
  );
}
