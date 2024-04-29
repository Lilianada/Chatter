import React from 'react'

export default function QtnThree({ frequency, userData, handleCheckboxChange, handleSubmit}) {
    return (
      <form
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-12 pt-8 pb-4"
          onSubmit={handleSubmit}
        >
          <div className="pb-8 text-left">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              How often do you plan to engage with content on Chatter?
            </h3>
            <p className="mt-1 text-sm text-gray-500">Select all that applies.</p>
          </div>
          <div className="mt-2">
            {frequency.map((item, index) => (
              <div key={index} className="flex items-center mt-1">
                <input
                  type="radio"
                  name="readingFrequency"
                  value={item}
                  checked={userData.readingFrequency.includes(item)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 rounded-full"
                />
                <label className="ml-2 text-sm text-gray-700">{item}</label>
              </div>
            ))}
          </div>
        </form>
    )
  }
  