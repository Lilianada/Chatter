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
    <div
      aria-live="assertive"
      className="fixed inset-0 z-50 flex items-start justify-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    >
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${bgColor}`}>
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
    </div>
  );
}
