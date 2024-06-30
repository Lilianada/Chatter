import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QtnOne from "./QtnOne";
import QtnTwo from "./QtnTwo";
import QtnThree from "./QtnThree";
import DotLoader from "../../Utils/DotLoader";
import { postUserCategories } from "../../../config/article";

const interests = ["art", "beauty", "books", "career-advice", "creativity", "education", "fashion", "fitness", "food", "health", "lifestyle", "photography", "relationship", "self-improvement", "technology"];
const contribution = ["Yes, I am interested.", "Maybe in the future.", "No, I prefer to read only."];
const frequency = ["Daily", "Weekly", "Monthly", "Occasionally"];

export default function Onboarding({ open, setOpen }) {
    const userId = useSelector((state) => state.user.userId);
  const [userData, setUserData] = useState({
    interests: [],
    willingToContribute: [],
    readingFrequency: [],
  });
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value)
    }));
  };

  const navigateSections = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Assuming postUserCategories is an API call to save user data
      const response = await postUserCategories(userId, userData);
      console.log(response);
      navigate('/dashboard/');
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0: return <QtnOne interests={interests} userData={userData} handleCheckboxChange={handleCheckboxChange} />;
      case 1: return <QtnTwo contribution={contribution} userData={userData} handleCheckboxChange={handleCheckboxChange} />;
      case 2: return <QtnThree frequency={frequency} userData={userData} handleCheckboxChange={handleCheckboxChange} />;
      default: return <QtnOne interests={interests} userData={userData} handleCheckboxChange={handleCheckboxChange} />;
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>{renderSection()}</div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 mt-8">
                  <button
                    onClick={navigateSections}
<<<<<<< HEAD
                    className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-neutral-600 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
=======
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>>>>>>> ae2abca (after initialization of git again)
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <DotLoader /> : (currentSection === totalSections - 1 ? 'Submit' : 'Save & Next')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
