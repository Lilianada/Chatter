import React, { useEffect, useRef, useState } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowTrendingUpIcon,
  FireIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Authorized/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Authorized/Footer";
import CategoryTabs from "../components/Authorized/CategoryTabs";
import Articles from "../components/Authorized/Articles";
import { getAllArticles } from "../config/article";
import { useCategories } from "../context/CategoriesContext";
import SelectTopics from "../components/Authorized/ChooseTopics";

const navigation = [
  { name: "Home", to: "#", icon: HomeIcon, current: true },
  { name: "Popular", to: "#", icon: FireIcon, current: false },
  { name: "Communities", to: "#", icon: UserGroupIcon, current: false },
  { name: "Trending", to: "#", icon: ArrowTrendingUpIcon, current: false },
];

const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    to: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291,
  },
  // More posts...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const containerRef = useRef(null);
  const { categories } = useCategories();

  useEffect(() => { 
    fetchArticles();
  }, []);

  useEffect(() => {
    // Filter articles when articles or selectedCategory changes
    if (selectedCategory) {
      const filtered = selectedCategory === 'all' ? articles : articles.filter(article =>
        article.categories.map(cat => cat.trim().toLowerCase()).includes(selectedCategory.trim().toLowerCase())
      );     
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, selectedCategory]);
  

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await getAllArticles();
      if (response.success) {
        setArticles(response.articles);
      } else {
        console.error("Failed to fetch articles:", response.message);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkForScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  return (
    <div className="min-h-full">
      <Header />
      <div className="py-10 bg-gray-100">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300"
            >
              <div className="space-y-1 pb-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50",
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </div>
              <div className="pt-6">
                  <p className="px-3 text-sm font-medium text-gray-500" id="communities-headline">
                    Topics
                  </p>
                  <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
                    {categories.slice(0, 6).map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <span className="truncate">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6 ">
            <div className="">
              <CategoryTabs
                categories={categories}
                checkForScroll={checkForScroll}
                showLeftArrow={showLeftArrow}
                showRightArrow={showRightArrow}
                containerRef={containerRef}
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
              <h1 className="sr-only">All articles</h1>
              {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Articles articles={filteredArticles} />
          )}
            </div>
          </main>
          <aside className="hidden xl:col-span-4 xl:block">
            <div className="sticky top-4 space-y-4">
              {/* who to follow */}
              <section aria-labelledby="who-to-follow-heading">
                <div className="rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      id="who-to-follow-heading"
                      className="text-base font-medium text-gray-900"
                    >
                      Who to follow
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        {whoToFollow.map((user) => (
                          <li
                            key={user.handle}
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
                                <Link to={user.to}>{user.name}</Link>
                              </p>
                              <p className="text-sm text-gray-500">
                                <Link to={user.to}>{"@" + user.handle}</Link>
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
              {/* trending articles */}
              <section aria-labelledby="trending-heading">
                <div className="rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      id="trending-heading"
                      className="text-base font-medium text-gray-900"
                    >
                      Trending
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul
                        className="-my-4 divide-y divide-gray-200"
                      >
                        {trendingPosts.map((post) => (
                          <li key={post.id} className="flex space-x-3 py-4">
                            <div className="flex-shrink-0">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={post.user.imageUrl}
                                alt={post.user.name}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-800">
                                {post.body}
                              </p>
                              <div className="mt-2 flex">
                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                  >
                                    <ChatBubbleLeftEllipsisIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-gray-900">
                                      {post.comments}
                                    </span>
                                  </button>
                                </span>
                              </div>
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

              <SelectTopics/>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
