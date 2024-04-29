import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

const interests = [
  "art",
  "beauty",
  "books",
  "career-advice",
  "creativity",
  "education",
  "fashion",
  "fitness",
  "food",
  "health",
  "lifestyle",
  "photography",
  "relationship",
  "self-improvement",
  "technology"
];

const willingToContribute = [
  "Yes, I am interested.",
  "Maybe in the future.",
  "No, I prefer to read only.",
]

const readingFrequency = [
  "Daily",
  "Weekly",
  "Monthly",
  "Occasionally",
];

export default function Onboarding() {
  const [userData, setUserData] = useState({
    interests: [],
    contentPreference: "",
    readingFrequency: "",
    contentLength: "",
    willingToContribute: false,
  });
  const { showModal, hideModal } = useModal();
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      if (name === "interests") {
        // Handle multiple checkboxes
        setUserData((prev) => ({
          ...prev,
          interests: checked
            ? [...prev.interests, value]
            : prev.interests.filter((item) => item !== value),
        }));
      } else {
        setUserData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("User Data:", userData);
    // Post userData to your backend or use it as needed in your application
  };

  return (
    <div className="px-2 pb-10 lg:px-24 sm:px-8 bg-gray-50 min-h-[calc(100vh_-_64px)]">
      <div className="py-8 text-left">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Onboarding Form
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used in personalizing your experience.
        </p>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleSubmit}>
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="selectTopics"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Which topics interest you? (Select all that apply)
                  </label>
                  <div className="mt-2">
                    <select
                      name="selectTopics"
                      value={userData.interests}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your trading experience</option>
                      {interests.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="educationExperience"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Are you interested in writing or contributing content to Chatter?
                  </label>
                  <div className="mt-2">
                    {willingToContribute.map((item, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="willingToContribute"
                            value={item}
                            checked={userData.willingToContribute.includes(
                              item
                            )}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {item}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Save
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save & Next
              </button>
            </div> */}
          </form>
      </div>
    </div>
  );
}
