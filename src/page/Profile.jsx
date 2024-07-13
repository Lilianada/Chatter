import React, { useEffect, useState } from "react";
import { updateProfile } from "../config/profile";
import Notification from "../components/Utils/Notification";
import { useCategories } from "../context/CategoriesContext";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useUserContext } from "../context/UserContext";
import DotLoader from "../components/Utils/DotLoader";

export default function Profile() {
  const { categories } = useCategories();
  const { user, isLoading: contextLoading, updateUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [formState, setFormState] = useState({
    fullName: user.fullName || "",
    userName: user.userName || "",
    email: user.email || "",
    description: user.description || "",
    categories: user.categories || [],
    pronouns: user.pronouns || "",
    profilePic: user.profilePic || null,
    photoPreview: null,
  });

  useEffect(() => {
    setFormState({
      fullName: user.fullName || "",
      userName: user.userName || "",
      email: user.email || "",
      description: user.description || "",
      categories: user.categories || [],
      pronouns: user.pronouns || "",
      profilePic: user.profilePic || null,
      photoPreview: null,
    });
    setSelected(user.categories)
  }, [user]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "profilePic" && files.length) {
        // Use FileReader to generate a URL for preview
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setFormState(prevState => ({
                ...prevState,
                profilePic: files[0], 
                photoPreview: fileReader.result,
            }));
        };
        fileReader.readAsDataURL(files[0]);
    } else {
        // Handle changes for other inputs
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { fullName, userName, email, pronouns, description, profilePic } =
      formState;

    try {
      const formData = {
        fullName,
        userName,
        email,
        categories: selected.map((cat) => cat),
        pronouns,
        description,
        profilePic,
      };

      const result = await updateProfile(user.userId, formData);
      if (result && result.success) {
        setNotification({
          show: true,
          type: "success",
          message: "Your profile has been successfully updated!",
        });
        console.log("Profile updated:", result);
       updateUser(formData);
      } else {
        setNotification({
          show: true,
          type: "error",
          message:
            result.message || "Failed to update profile. Please try again.",
        });
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setNotification({
        show: true,
        type: "error",
        message: "Failed to update profile due to an error.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    if (!selected.find((cat) => cat === category)) {
      const updatedCategories = [...selected, category];
      setSelected(updatedCategories);
    }
  };

  const handleRemoveCategory = (category) => {
    const updatedCategories = selected.filter((cat) => cat !== category);
    setSelected(updatedCategories);
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
                          htmlFor="userName"
                          className="block text-sm font-medium leading-6 text-neutral-900"
                        >
                          UserName
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-white px-3 text-neutral-500 sm:text-sm">
                            chatter.com/
                          </span>
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            autoComplete="userName"
                            value={formState.userName}
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
                          {!formState.photoPreview && !formState.profilePic ? (
                            <UserCircleIcon className="h-16 w-16 text-neutral-200" />
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
                          Bio
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
                          Brief description for your profile.
                        </p>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="categories"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Categories
                        </label>
                        <div className="mt-1 border border-gray-300 rounded-md relative">
                          <div className="p-2">
                            {selected.map((category) => (
                              <span
                                key={category}
                                className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-gray-100 py-1 px-1.5 text-xs font-medium text-gray-900"
                              >
                                {category}
                                <button
                                  type="button"
                                  className="ml-1 inline-flex flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                  onClick={() => handleRemoveCategory(category)}
                                >
                                  <XMarkIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </button>
                              </span>
                            ))}
                          </div>
                          <Listbox
                            value={selected}
                            onChange={handleCategorySelect}
                          >
                            <Listbox.Button className="w-full rounded-b-md border-t border-gray-300 text-xs bg-white py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between">
                              Select categories
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Listbox.Button>
                            <Listbox.Options
                              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                              {categories
                                .filter(
                                  (cat) =>
                                    !selected.some(
                                      (selected) => selected.name === cat.name
                                    )
                                )
                                .map((category) => (
                                  <Listbox.Option
                                    key={category.index}
                                    value={category.name}
                                    className={({ active, selected }) =>
                                      `group relative cursor-default select-none py-2 pl-4 pr-4 text-sm ${
                                        active
                                          ? "bg-yellow-100"
                                          : "text-gray-900"
                                      } ${selected ? "font-bold" : ""}`
                                    }
                                  >
                                    <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                      {category.name}
                                    </span>

                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-yellow-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Option>
                                ))}
                            </Listbox.Options>
                          </Listbox>
                        </div>
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
                      {/* <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50"
                      >
                        Cancel
                      </button> */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-chocolate shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                      >
                        {isLoading ? <span className="flex items-center gap-2">Updating <DotLoader /></span> : "Update"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {notification.show && (
        <Notification
          title={
            notification.type.charAt(0).toUpperCase() +
            notification.type.slice(1)
          }
          message={notification.message}
          type={notification.type}
          timer={5000}
        />
      )}
    </div>
  );
}
