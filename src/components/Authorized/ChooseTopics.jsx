import React, { Fragment, useState } from "react";
import { useCategories } from "../../context/CategoriesContext";
import Alert from "../Utils/Alert";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { postUserCategories } from "../../config/article";
import { getAuthUser } from "../../config/authorization";

export default function SelectTopics() {
  const { categories } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const resetError = () => {
    setError(false);
    setTimeout(() => setError(true), 5000);
  };

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCategories.length < 3) {
      resetError();
      return;
    }
    setIsLoading(true);
    const userId = getAuthUser();
    try {
      const response = await postUserCategories(userId, selectedCategories);
      if (response.success === true) {
        setSuccess(true);
      }
      setTimeout(() => setOpen(false), 3500);
      ;
    } catch (error) {
      console.error("Error posting user categories:", error);
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <Transition.Root show={open} as={Fragment} appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <Combobox onChange={(item) => (window.location = item.url)}>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-lg bg-white shadow p-6"
                >
                  <fieldset>
                    <legend className="text-base font-semibold leading-6 text-gray-900 mb-4">
                      Select at least 3 topics that you like
                    </legend>
                    <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                      <Combobox.Options
                        static
                        className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                      >
                        {categories.slice(1, 14).map((category) => (
                          <div
                            key={category.id}
                            className="relative flex items-start py-4 mr-5"
                          >
                            <div className="min-w-0 flex-1 text-sm leading-6">
                              <label
                                htmlFor={`category-${category.id}`}
                                className="select-none font-medium text-gray-900"
                              >
                                {category.name}
                              </label>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                              <input
                                id={`category-${category.id}`}
                                name={`category-${category.id}`}
                                type="checkbox"
                                checked={selectedCategories.includes(
                                  category.id
                                )}
                                onChange={() =>
                                  handleCategoryChange(category.id)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                          </div>
                        ))}
                      </Combobox.Options>
                    </div>
                    {error && (
                      <Alert
                        type="error"
                        message="Please select at least 3 topics!"
                        timer={3000}
                      />
                    )}
                    {success && (
                      <Alert
                        type="success"
                        message="Selected topics have been updated successfully."
                        timer={3000}
                      />
                    )}
                    <button
                      type="submit"
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                     {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  </fieldset>
                </form>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
