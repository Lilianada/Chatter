import React from "react";

export default function Settings() {

  return (
          <section className="flex flex-1 overflow-hidden pb-16">
            <div className="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
              <div className="flex flex-1 xl:overflow-hidden">
                {/* Main content */}
                <div className="flex-1 xl:overflow-y-auto">
                  <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                      Settings
                    </h1>

                    <form className="divide-y-neutral-200 space-y-8 divide-y mt-8">
                        <div className="sm:col-span-6">
                          <h2 className="text-xl font-medium text-neutral-900">
                            Edit Profile
                          </h2>
                          <p className="mt-1 text-sm text-neutral-500">
                           Change account information associated with your account.
                          </p>
                        </div>

                        <div className="flex justify-end gap-x-3 pt-8">
                        <button
                          type="submit"
                          className="flex justify-end gap-x-3 w-max rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-chocolate shadow-sm hover:bg-red-400"
                        >
                          Edit
                        </button>
                      </div>
                    </form>

                    <form className="divide-y-neutral-200 mt-6 space-y-8 divide-y">
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-neutral-900">
                            Change password
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500">
                            Update your password associated with your account.
                            </p>
                        </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="current-password"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Current password
                        </label>
                        <input
                          type="text"
                          name="current-password"
                          id="current-password"
                          autoComplete="email"
                         className="mt-2 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                          />
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          New password
                        </label>
                        <input
                          type="text"
                          name="new-password"
                          id="new-password"
                          autoComplete="tel"
                         className="mt-2 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                          />
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Confirm password
                        </label>
                        <input
                          type="text"
                          name="confirm-password"
                          id="confirm-password"
                          autoComplete="tel"
                         className="mt-2 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                          />
                      </div>

                    </div>
                      <div className="flex justify-end gap-x-3 pt-8">
                       
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-chocolate shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                        >
                          Save
                        </button>
                      </div>
                    </form>

                    <form className="divide-y-neutral-200 space-y-8 divide-y mt-8">
                        <div className="sm:col-span-6">
                          <h2 className="text-xl font-medium text-neutral-900">
                            Delete Account
                          </h2>
                          <p className="mt-1 text-sm text-neutral-500">
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
          </section>
  );
}
