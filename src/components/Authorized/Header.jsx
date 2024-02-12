import React, { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../../assets/ChatterLogo.svg";
import logoSmall from "../../assets/ChatterLogo.svg";
import { signoutUser } from "../../config/authorization";
import Loader from "../Utils/Loader";
import {
  ArrowTrendingUpIcon,
  FireIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', to: '#', icon: HomeIcon, current: true },
  { name: 'Popular', to: '#', icon: FireIcon, current: false },
  { name: 'Communities', to: '#', icon: UserGroupIcon, current: false },
  { name: 'Trending', to: '#', icon: ArrowTrendingUpIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', to: '/profile' },
  { name: 'Settings', to: '/settings' },
  { name: 'New Article', to: '/new-article' },
]

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);

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
    <Popover
    as="header"
    className={({ open }) =>
      classNames(
        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
        'bg-gray-800 shadow-sm lg:static lg:overflow-y-visible'
      )
    }
  >
    {({ open }) => (
      <>
      {isLoading && <Loader />}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
            <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
              <div className="flex flex-shrink-0 items-center">
                <Link to="/home">
                  <img
                    className="block h-8 w-auto sm:hidden"
                    src={logo}
                    alt="Chatter App"
                  />
                  <img
                    className="hidden h-8 w-auto sm:block"
                    src={logoSmall}
                    alt="Chatter App"
                    />
                </Link>
              </div>
            </div>
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
              {/* Mobile menu button */}
              <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Popover.Button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              <Link
                to="/notifications"
                className="ml-5 flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </Link>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-5 flex-shrink-0">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.to}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                     <button 
                  className="block px-4 py-2 text-sm text-rose-500 hover:text-rose-700 cursor-pointer"
                  onClick={onSignOut}
                >
                  Sign out
                  </button>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Link
                to="/new-article"
                className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                New Article
              </Link>
            </div>
          </div>
        </div>

        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
          <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-200',
                  'block rounded-md py-2 px-3 text-base font-medium'
                )}
              >
                {item.name}
              </Link>

            ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-200">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
            {/* <Link
              to="/new-article"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-800"
            >
              New Article
            </Link> */}

            <button 
                  className="flex w-full items-center justify-center rounded-md bg-rose-600 border border-transparent px-4 py-2 text-gray-100 font-medium text-base hover:bg-rose-400 hover:text-gray-200 cursor-pointer"
                  onClick={onSignOut}
                >
                  Sign out
                  </button>
          </div>
        </Popover.Panel>
      </>
    )}
  </Popover>
  );
}
