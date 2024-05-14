import React, { Fragment } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from '../../assets/colored_logo.png'

import { Popover, Transition } from "@headlessui/react";

const navigation = [
  { name: "Resources", href: "#" },
  { name: "Start Writing", href: "#" },
  { name: "Careers", href: "#" },
];

export default function Header() {
  return (
    <header>
      <Popover>
        <nav
          className="relative mx-auto flex max-w-8xl items-center justify-between px-6 py-6"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link to="/">
                <span className="sr-only">Chatter</span>
                <img
                  className="w-24 sm:w-10"
                  src={logo}
                  alt=""
                />
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset relative inline-flex items-center justify-center rounded-md bg-yellow-500 p-2 text-gray-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-10 md:ml-10 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="font-medium text-white hover:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex">
            <Link
              to="/signin"
              className="inline-flex items-center rounded-md border border-yellow-500 bg-yellow-700 px-4 py-2 text-sm font-medium text-chocolate hover:bg-yellow-700"
            >
              Sign in
            </Link>
          </div>
        </nav>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5">
                <div>
                  <img
                    className="w-24"
                    src={logo}
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/signin"
                className="block w-full bg-gray-100 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-200"
              >
                Log in
              </Link>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}
