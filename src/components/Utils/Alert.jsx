import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const iconStyles = {
  success: "text-green-400",
  error: "text-red-400",
  warning: "text-yellow-400",
  info: "text-blue-400",
};

const bgStyles = {
  success: "bg-green-50",
  error: "bg-red-50",
  warning: "bg-yellow-50",
  info: "bg-blue-50",
};

const textStyles = {
  success: "text-green-800",
  error: "text-red-800",
  warning: "text-yellow-800",
  info: "text-blue-800",
};

const buttonBgStyles = {
  success:
    "bg-green-50 hover:bg-green-100 text-green-500 focus:ring-green-600 focus:ring-offset-green-50",
  error:
    "bg-red-50 hover:bg-red-100 text-red-500 focus:ring-red-600 focus:ring-offset-red-50",
  warning:
    "bg-yellow-50 hover:bg-yellow-100 text-yellow-500 focus:ring-yellow-600 focus:ring-offset-yellow-50",
  info: "bg-blue-50 hover:bg-blue-100 text-blue-500 focus:ring-blue-600 focus:ring-offset-blue-50",
};

function AlertIcon({ type }) {
  switch (type) {
    case "success":
      return (
        <CheckCircleIcon
          className={`h-5 w-5 ${iconStyles[type]}`}
          aria-hidden="true"
        />
      );
    case "error":
      return (
        <XCircleIcon
          className={`h-5 w-5 ${iconStyles[type]}`}
          aria-hidden="true"
        />
      );
    case "warning":
      return (
        <ExclamationCircleIcon
          className={`h-5 w-5 ${iconStyles[type]}`}
          aria-hidden="true"
        />
      );
    case "info":
    default:
      return (
        <InformationCircleIcon
          className={`h-5 w-5 ${iconStyles[type]}`}
          aria-hidden="true"
        />
      );
  }
}

export default function Alert({
  type = "info",
  message,
  actions,
  list,
  timer,
}) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (timer) {
      const timeoutId = setTimeout(() => setVisible(false), timer);
      return () => clearTimeout(timeoutId);
    }
  }, [timer]);

  // If the alert is not visible, don't render the component
  if (!visible) return null;
  return (
    <div className={`${bgStyles[type]} rounded-md p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertIcon type={type} />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textStyles[type]}`}>{message}</p>
          {list && (
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc pl-5 space-y-1">
                {list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {actions && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`rounded-md px-2 py-1.5 text-sm font-medium ${textStyles[type]} ${buttonBgStyles[type]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {!timer && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={() => setVisible(false)}
                className={`inline-flex rounded-md p-1.5  ${buttonBgStyles[type]} focus:outline-none focus:ring-2 focus:ring-offset-2 `}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <Alert
  type="success"
  message="Successfully uploaded"
  actions={[
    { label: 'View status', onClick: () => console.log('Viewing status') },
    { label: 'Dismiss', onClick: () => console.log('Dismissing alert') },
  ]}
/>

<Alert
  type="error"
  message="There were 2 errors with your submission"
  list={[
    "Your password must be at least 8 characters",
    "Your password must include at least one pro wrestling finishing move"
  ]}
/> */
}
