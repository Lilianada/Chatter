import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/ModalContext";
import QtnOne from "./QtnOne";
import QtnTwo from "./QtnTwo";
import QtnThree from "./QtnThree";
import DotLoader from "../../Utils/DotLoader";

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

export default function Onboarding({ open, setOpen }) {
  const [userData, setUserData] = useState({
    interests: [],
    willingToContribute: [],
    readingFrequency: [],
  });
  const { showModal, hideModal } = useModal();
  const [currentSection, setCurrentSection] = useState(0);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const totalSections = 3;
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
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>{renderSection()}</div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 mt-8">
                {currentSection < totalSections - 1 ? (
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save & Next
                  </button>
                   ) : (
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex w-full justify-center align-middle gap-2">
                        <span>Submitting</span>
                        <DotLoader />
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                    )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
