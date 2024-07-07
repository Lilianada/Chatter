import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoPersonCircle } from "react-icons/io5";

export default function Profile() {
  const fullName = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const categories = useSelector((state) => state.user.categories);
  const [formState, setFormState] = useState({
    fullName: fullName || "",
    username: "",
    description: "",
    profilePic: null,
    email: email || "",
    categroies: categories || [],
    pronouns: "",
    photoPreview: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "profilePic" && files[0]) {
      // Generate a URL for preview
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setFormState((prevState) => ({
          ...prevState,
          profilePic: files[0],
          photoPreview: fileReader.result,
        }));
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formState);
    // Here you would typically handle the submission logic, like sending data to a server
  };

  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
            <div className="flex flex-1 xl:overflow-hidden">
              {/* Main content */}
              <div className="flex-1 xl:overflow-y-auto">
                <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                  <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                    Account
                  </h1>

                  <form
                    className="divide-y-neutral-200 mt-6 space-y-8 divide-y"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                      <div className="sm:col-span-6">
                        <h2 className="text-xl font-medium text-neutral-900">
                          Profile
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">
                          This information will be displayed publicly so be
                          careful what you share.
                        </p>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="full-name"
                          id="full-name"
                          autoComplete="given-name"
                          value={formState.fullName}
                          onChange={handleChange}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Username
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-white px-3 text-neutral-500 sm:text-sm">
                            chatter.com/
                          </span>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            value={formState.username}
                            onChange={handleChange}
                            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="photo"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Photo
                        </label>
                        <div className="mt-2 flex items-center">
                          {!formState.photoPreview || !formState.profilePic ? (
                            <IoPersonCircle className="h-16 w-16 text-neutral-200" />
                          ) : (
                            <img
                              className="inline-block h-16 w-16 rounded-full bg-neutral-100"
                              src={
                                formState.photoPreview || formState.profilePic
                              }
                              alt="profile"
                            />
                          )}

                          <div className="relative ml-4">
                            <input
                              id="profilePic"
                              name="profilePic"
                              type="file"
                              className="peer absolute inset-0 h-full w-full rounded-md opacity-0"
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="profilePic"
                              className="cursor-pointer block rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 peer-hover:bg-neutral-50 peer-focus:ring-2 peer-focus:ring-yellow-600"
                            >
                              <span>Change</span>
                              <span className="sr-only"> user photo</span>
                            </label>
                          </div>
                          <p className="ml-6 mt-2 text-xs leading-5 text-gray-400">
                            JPG, GIF or PNG. 1MB max.
                          </p>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Description
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="description"
                            name="description"
                            rows={2}
                            className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                            value={formState.description}
                            onChange={handleChange}
                          />
                        </div>
                        <p className="mt-3 text-sm text-neutral-500">
                          Brief description for your profile. URLs are
                          hyperlinked.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
                      <div className="sm:col-span-6">
                        <h2 className="text-xl font-medium text-neutral-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">
                          This information will be displayed publicly so be
                          careful what you share.
                        </p>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="pronouns"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          Pronouns
                        </label>
                        <input
                          type="text"
                          name="pronouns"
                          id="pronouns"
                          autoComplete="pronouns"
                          value={formState.pronouns}
                          onChange={handleChange}
                          placeholder="she/her"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-x-3 pt-8">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-chocolate shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>

                  <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6 border-t mt-12">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium leading-6 text-neutral-900"
                      >
                        Delete Account
                      </label>
                      <button
                        type="submit"
                        className="mt-2 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                      >
                        Yes, delete my account
                      </button>
                      <p className="mt-2 text-xs text-neutral-500 sm:col-span-6">
                        This action is not reversible. All information related
                        to this account will be deleted permanently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
