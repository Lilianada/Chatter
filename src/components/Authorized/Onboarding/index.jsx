import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../../context/ModalContext";
import { CircleStackIcon } from "@heroicons/react/20/solid";
import QtnOne from "./QtnOne";
import QtnTwo from "./QtnTwo";
import QtnThree from "./QtnThree";

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
  "technology",
];

const contribution = [
  "Yes, I am interested.",
  "Maybe in the future.",
  "No, I prefer to read only.",
];

const frequency = ["Daily", "Weekly", "Monthly", "Occasionally"];

export default function Onboarding() {
  const [userData, setUserData] = useState({
    interests: [],
    willingToContribute: [],
    readingFrequency: [],
  });
  const { showModal, hideModal } = useModal();
  const [currentSection, setCurrentSection] = useState(0);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    const newList = checked
      ? [...userData[name], value]
      : userData[name].filter((item) => item !== value);

    setUserData({ ...userData, [name]: newList });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("User Data:", userData);
    // Post userData to your backend or use it as needed in your application
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <QtnOne
            interests={interests}
            userData={userData}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            />
        );
      case 1:
        return (
          <QtnTwo
            userData={userData}
            contribution={contribution}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
          />
        );
        case 2:
        return (
          <QtnThree
            frequency={frequency}
            userData={userData}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <QtnOne
            interests={interests}
            userData={userData}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
          />
        );
      }
  }

  return (
    <div className="px-2 pb-10 lg:px-24 sm:px-8 bg-gray-50 min-h-[calc(100vh_-_64px)]">
      <div className="py-8 text-left">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Onboarding Form
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used to personalize your experience.
        </p>
      </div>

      {renderSection}

      <div className="flex items-center justify-between gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 mt-8">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setCurrentSection(currentSection - 1)}
        >
          Previous
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setCurrentSection(currentSection + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}
