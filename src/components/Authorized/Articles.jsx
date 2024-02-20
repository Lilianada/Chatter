import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  convertTimestampToDate,
  formatNumber,
  truncateText,
} from "../../config/article";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Articles({ articles }) {
  return (
    <div>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li
            key={article.id}
            className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
          >
            <article aria-labelledby={"article-title-" + article.id}>
              <div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={article.author.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <Link to={article.author.to} className="hover:underline">
                        {article.author.name}
                      </Link>
                    </p>
                    <p className=" text-gray-500 flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={
                          convertTimestampToDate(article.dateTime).datetime
                        }
                      >
                        {convertTimestampToDate(article.date).date}
                      </time>
                      {article.categories &&
                        article.categories.map((category, index) => (
                          <span
                            key={index}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 capitalize"
                          >
                            {category}
                          </span>
                        ))}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 self-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="relative -m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                          <span className="absolute -inset-1" />
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "flex px-4 py-2 text-sm"
                                  )}
                                >
                                  <StarIcon
                                    className="mr-3 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Add to favorites</span>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "flex px-4 py-2 text-sm"
                                  )}
                                >
                                  <CodeBracketIcon
                                    className="mr-3 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Embed</span>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "flex px-4 py-2 text-sm"
                                  )}
                                >
                                  <FlagIcon
                                    className="mr-3 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Report content</span>
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <h2
                  id={"question-title-" + article.id}
                  className="mt-4 text-base font-medium text-gray-900"
                >
                  {article.title}
                </h2>
              </div>
              <Link
                to={`/articles/${article.id}`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <div
                  className="mt-2 space-y-4 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(article.content),
                  }}
                />
              </Link>
              <div className="mt-6 flex justify-between space-x-8">
                <div className="flex space-x-6">
                  <span className="inline-flex flex-wrap items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="font-normal text-gray-700">
                        {formatNumber(article.likes)}
                      </span>
                      <span className="sr-only">likes</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ChatBubbleLeftEllipsisIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className="font-normal text-gray-700">
                        {formatNumber(article.replies)}
                      </span>
                      <span className="sr-only">replies</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="font-normal text-gray-700">
                        {formatNumber(article.views)}
                      </span>
                      <span className="sr-only">views</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-700"
                    >
                      <span className="font-normal text-gray-400">
                        {article.minutes} minutes Read
                      </span>
                      <span className="sr-only">minutes</span>
                    </button>
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ShareIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="font-medium text-gray-700">Share</span>
                    </button>
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
