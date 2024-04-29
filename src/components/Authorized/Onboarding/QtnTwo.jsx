import React from 'react'

export default function QtnTwo({ userData, contribution, handleCheckboxChange, handleSubmit}) {
  return (
    <form
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-12 pt-8 pb-4"
        onSubmit={handleSubmit}
      >
        <div className="pb-8 text-left">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Are you interested in writing or contributing content to Chatter?
          </h3>
          <p className="mt-1 text-sm text-gray-500">Select all that applies.</p>
        </div>

        <div className="mt-2">
          {contribution.map((item, index) => (
            <div key={index} className="flex items-center mt-1">
              <input
                type="radio"
                name="willingToContribute"
                value={item}
                checked={userData.willingToContribute.includes(item)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">{item}</label>
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
