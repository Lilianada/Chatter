import React, { useState, useEffect, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

export default function Notification({ title, message, type, timer }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After the timer ends, hide the notification
      setShow(false);
    }, timer);

    // Clear timeout if the component is unmounted or the show state changes
    return () => clearTimeout(timeId);
  }, [timer]);

  // Function to determine the icon and background color based on the alert type
  const alertStyles = {
    success: {
      icon: CheckCircleIcon,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-400',
    },
    error: {
      icon: ExclamationCircleIcon,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-400',
    },
    warning: {
      icon: ExclamationTriangleIcon,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-400',
    },
    info: {
      icon: InformationCircleIcon,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
  };

  const { icon: Icon, bgColor, iconColor } = alertStyles[type] || alertStyles.info;

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${bgColor}`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setShow(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
