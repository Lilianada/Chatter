import React from "react";
import { useCategories } from "../../context/CategoriesContext";

function SelectCategories({ selectedCategories, handleCheckboxChange, close }) {
  const { categories } = useCategories();
  return (
    <div className="mt-0 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-6 py-4">
      <div className="flex justify-between items-start">
        <div className="pb-4 text-left">
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
            className={`relative flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-2 py-3 shadow-sm focus-within:ring-2 focus-within:ring-green-400 focus-within:ring-offset-2 hover:border-green-400 cursor-pointer 
              ${
                selectedCategories.includes(item._id)
                  ? "border-green-400 bg-green-100 focus-within:ring-green-400"
                  : "border-gray-300 bg-white focus-within:ring-green-400"
              }`}
          >
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                name="categories"
                value={item.name}
                checked={selectedCategories.includes(item.name)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-400"
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
      <div className="flex justify-end mt-4">
        <button
          onClick={close}
          type="button"
          className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 w-28"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default SelectCategories;
