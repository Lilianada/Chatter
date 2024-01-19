import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  Bars3Icon,
  BellIcon,
  BookmarkSquareIcon,
  CogIcon,
  FireIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
  MagnifyingGlassCircleIcon,
  PhotoIcon,
  SquaresPlusIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Header from "../components/Authorized/Header";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon },
  { name: "Trending", href: "#", icon: FireIcon },
  { name: "Bookmarks", href: "#", icon: BookmarkSquareIcon },
  { name: "Messages", href: "#", icon: InboxIcon },
  { name: "Profile", href: "#", icon: UserIcon },
];
const subNavigation = [
  {
    name: "Account",
    description:
      "Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.",
    href: "#",
    icon: CogIcon,
    current: true,
  },
  {
    name: "Notifications",
    description:
      "Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.",
    href: "#",
    icon: BellIcon,
    current: false,
  },
  {
    name: "Security",
    description:
      "Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.",
    href: "#",
    icon: KeyIcon,
    current: false,
  },
  {
    name: "Appearance",
    description:
      "Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.",
    href: "#",
    icon: PhotoIcon,
    current: false,
  },
  {
    name: "Billing",
    description:
      "Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.",
    href: "#",
    icon: BanknotesIcon,
    current: false,
  },
  {
    name: "Integrations",
    description:
      "Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.",
    href: "#",
    icon: SquaresPlusIcon,
    current: false,
  },
  {
    name: "Additional Resources",
    description:
      "Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.",
    href: "#",
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileSettings() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <main className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
              <div className="flex flex-1 xl:overflow-hidden">
                {/* Main content */}
                <div className="flex-1 xl:overflow-y-auto">
                  <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                      Account
                    </h1>

                    <form className="divide-y-slate-200 mt-6 space-y-8 divide-y">
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                          <h2 className="text-xl font-medium text-slate-900">
                            Profile
                          </h2>
                          <p className="mt-1 text-sm text-slate-500">
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Username
                          </label>
                          <div className="mt-2 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-white px-3 text-slate-500 sm:text-sm">
                              workcation.com/
                            </span>
                            <input
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                              defaultValue="lisamarie"
                              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label
                            htmlFor="photo"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Photo
                          </label>
                          <div className="mt-2 flex items-center">
                            <img
                              className="inline-block h-16 w-16 rounded-full"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                              alt=""
                            />
                            <div className="relative ml-4">
                              <input
                                id="user-photo"
                                name="user-photo"
                                type="file"
                                className="peer absolute inset-0 h-full w-full rounded-md opacity-0"
                              />
                              <label
                                htmlFor="user-photo"
                                className="pointer-events-none block rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 peer-hover:bg-slate-50 peer-focus:ring-2 peer-focus:ring-blue-600"
                              >
                                <span>Change</span>
                                <span className="sr-only"> user photo</span>
                              </label>
                            </div>
                            <button
                              type="button"
                              className="ml-6 text-sm font-medium leading-6 text-slate-900"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              rows={4}
                              className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                              defaultValue={""}
                            />
                          </div>
                          <p className="mt-3 text-sm text-slate-500">
                            Brief description for your profile. URLs are
                            hyperlinked.
                          </p>
                        </div>

                        <div className="sm:col-span-6">
                          <label
                            htmlFor="url"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            URL
                          </label>
                          <input
                            type="text"
                            name="url"
                            id="url"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                          <h2 className="text-xl font-medium text-slate-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm text-slate-500">
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Email address
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone-number"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Phone number
                          </label>
                          <input
                            type="text"
                            name="phone-number"
                            id="phone-number"
                            autoComplete="tel"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                          >
                            <option />
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="language"
                            className="block text-sm font-medium leading-6 text-slate-900"
                          >
                            Language
                          </label>
                          <input
                            type="text"
                            name="language"
                            id="language"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <p className="text-sm text-slate-500 sm:col-span-6">
                          This account was created on{" "}
                          <time dateTime="2017-01-05T20:35:40">
                            January 5, 2017, 8:35:40 PM
                          </time>
                          .
                        </p>
                      </div>

                      <div className="flex justify-end gap-x-3 pt-8">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Save
                        </button>
                      </div>
                    </form>

                    <form className="divide-y-slate-200 mt-6 space-y-8 divide-y">
                      <div className="sm:col-span-6">
                        <h2 className="text-xl font-medium text-slate-900">
                          Change password
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Update your password associated with your account.
                        </p>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="current-password"
                          className="block text-sm font-medium leading-6 text-slate-900"
                        >
                          Current password
                        </label>
                        <input
                          type="text"
                          name="current-password"
                          id="current-password"
                          autoComplete="email"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium leading-6 text-slate-900"
                        >
                          New password
                        </label>
                        <input
                          type="text"
                          name="new-password"
                          id="new-password"
                          autoComplete="tel"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm font-medium leading-6 text-slate-900"
                        >
                          Confirm password
                        </label>
                        <input
                          type="text"
                          name="confirm-password"
                          id="confirm-password"
                          autoComplete="tel"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="flex justify-end gap-x-3 pt-8">
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </form>

                    <form className="divide-y-slate-200 mt-6 space-y-8 divide-y">
                        <div className="sm:col-span-6">
                          <h2 className="text-xl font-medium text-slate-900">
                            Delete Account
                          </h2>
                          <p className="mt-1 text-sm text-slate-500">
                            No longer want to use our service? You can delete
                            your account here. This action is not reversible.
                            All information related to this account will be
                            deleted permanently.
                          </p>
                        </div>

                        <div className="flex justify-end gap-x-3 pt-8">
                        <button
                          type="submit"
                          className="flex justify-end gap-x-3 w-max rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                        >
                          Yes, delete my account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
