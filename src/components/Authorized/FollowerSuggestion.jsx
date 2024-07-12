import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const whoToFollow = [
  {
    id: 1,
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {id: 2,
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {id: 3,
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {id: 4,
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function FollowerSuggestion() {
  return (
    <div className="space-y-4">
      <section aria-labelledby="who-to-follow-heading">
        <div className=" bg-white">
          <div className="p-6">
            <h2
              id="who-to-follow-heading"
              className="text-base font-medium text-gray-900"
            >
              Leaderboard
            </h2>
            <div className="mt-6 flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {whoToFollow.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center space-x-3 py-4"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <a href={user.href}>{user.name}</a>
                      </p>
                      <p className="text-sm text-gray-500">
                        <a href={user.href}>{"@" + user.handle}</a>
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <PlusIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Follow
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="#"
                className="block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
