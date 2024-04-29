import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';


export default function Onboarding() {
  const [userData, setUserData] = useState({
    preferredName: '',
    interests: [],
    contentPreference: '',
    readingFrequency: '',
    contentLength: '',
    notificationPreference: '',
    language: '',
    willingToContribute: false,
    engageInDiscussions: false
  });
  const { showModal, hideModal } = useModal();
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      if (name === 'interests') {
        // Handle multiple checkboxes
        setUserData(prev => ({
          ...prev,
          interests: checked
            ? [...prev.interests, value]
            : prev.interests.filter(item => item !== value)
        }));
      } else {
        setUserData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log('User Data:', userData);
    // Post userData to your backend or use it as needed in your application
  };

  return (
    <div className="px-2 pb-10 lg:px-24 sm:px-8 bg-gray-50 min-h-[calc(100vh_-_64px)]">
    <div className="py-8 text-left">
      <h3 className="text-lg font-semibold leading-6 text-gray-900">
        Know Your Customer Form
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        This information will be used in personalizing your experience.
      </p>

    <form onSubmit={handleSubmit}>
      <div>
        <label>Preferred Name:</label>
        <input
          type="text"
          name="preferredName"
          value={userData.preferredName}
          onChange={handleInputChange}
        />
      </div>
      {/* More input fields and checkboxes can be added in a similar manner */}
      <button type="submit">Complete Onboarding</button>
    </form>
    </div>
    </div>
  );
}
