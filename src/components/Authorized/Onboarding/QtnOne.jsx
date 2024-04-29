import React from 'react'

export default function QtnOne({ interests, userData, handleCheckboxChange, handleSubmit}) {
  return (
    <form
    className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-12 pt-8 pb-4"
    onSubmit={handleSubmit}
  >
    <div className="pb-8 text-left">
      <h3 className="text-lg font-semibold leading-6 text-gray-900">
        Choose Topics
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Select all topics you would like to see on your feed.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {interests.map((item) => (
        <div
          key={item}
          className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-indigo-400 cursor-pointer 
      ${
        userData.interests.includes(item)
          ? "border-indigo-400 bg-indigo-50 focus-within:ring-indigo-400"
          : "border-gray-300 bg-white focus-within:ring-indigo-500"
      }`}
        >
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              name="interests"
              value={item}
              checked={userData.interests.includes(item)}
              onChange={handleCheckboxChange}
              className="h-6 w-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="focus:outline-none">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {item}
              </p>
            </span>
          </div>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 mt-8">
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save & Next
      </button>
    </div>
  </form>
  )
}
