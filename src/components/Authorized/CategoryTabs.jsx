import React, { useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CategoryTabs = ({
  categories,
  checkForScroll,
  showLeftArrow,
  showRightArrow,
  containerRef,
  onCategorySelect,
    selectedCategory,
}) => {
  useEffect(() => {
    window.addEventListener("resize", checkForScroll);
    return () => window.removeEventListener("resize", checkForScroll);
  }, []);

  const scroll = (direction) => {
    if (direction === "left") {
      containerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const tabs = [
    { name: 'My Account', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
    { name: 'Team Members', href: '#', current: true },
    { name: 'Billing', href: '#', current: false },
  ]

  return (
    <div className="relative mb-4 flex items-center">
      {showLeftArrow && (
        <button
          className="absolute left-0 z-10 bg-gray-100 p-2"
          onClick={() => scroll("left")}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <div
        className="flex overflow-x-auto scroll-smooth category-scroll"
        ref={containerRef}
        onScroll={checkForScroll}
      >
        {tabs.map((category) => (
          <span
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={classNames(
                selectedCategory === category.id
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              "whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium cursor-pointer"
            )}
          >
            {category.name}
          </span>
        ))}
      </div>
      {showRightArrow && (
        <button
          className="absolute right-0 z-10 bg-gray-100 p-2"
          onClick={() => scroll("right")}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default CategoryTabs;
