import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

function SelectCategories({
  categories,
  selectedCategories,
  handleCheckboxChange,
  close,
}) {
  return (
    <div className="mt-0 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-6 pt-8 pb-4">
      <div className="flex justify-between items-end">
        <button
          className="p-1 bg-neutral-200 rounded-lg border-1 border-neutral-300 "
          onClick={close}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div className="pb-8 text-left">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Choose Topics
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Select all topics you would like your article to be categorized
            under.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {categories.map((item) => (
          <div
            key={item._id}
            className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-indigo-400 cursor-pointer 
              ${
                selectedCategories.includes(item._id)
                  ? "border-indigo-400 bg-indigo-50 focus-within:ring-indigo-400"
                  : "border-gray-300 bg-white focus-within:ring-indigo-500"
              }`}
          >
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                name="categories"
                value={item._id}
                checked={selectedCategories.includes(item._id)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="focus:outline-none">
                <p className="text-xs font-medium text-gray-900 capitalize">
                  {item.name}
                </p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategories;
