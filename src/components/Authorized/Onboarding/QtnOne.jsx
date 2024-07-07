import React from 'react'

export default function QtnOne({ interests, userData, handleCheckboxChange, handleSubmit}) {
  return (
    <form
    className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-6 pt-8 pb-4"
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

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {interests.map((item) => (
        <div
          key={item}
          className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-3 shadow-sm focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:border-yellow-400 cursor-pointer 
      ${
        userData.interests.includes(item)
          ? "border-yellow-400 bg-yellow-50 focus-within:ring-yellow-400"
          : "border-gray-300 bg-white focus-within:ring-yellow-500"
      }`}
        >
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              name="interests"
              value={item}
              checked={userData.interests.includes(item)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="focus:outline-none">
              <p className="text-xs font-medium text-gray-900 capitalize">
                {item}
              </p>
            </span>
          </div>
        </div>
      ))}
    </div>
  </form>
  )
}
