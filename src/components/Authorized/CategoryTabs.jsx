import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import {getUserCategories} from "../../config/categories.js";
import { useSelector } from "react-redux";

const CategoryTabs = ({
  onCategorySelect,
  selectedCategory,
}) => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [tabs, setTabs] = useState([]);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    checkForScroll();
    window.addEventListener('resize', checkForScroll);
    return () => window.removeEventListener('resize', checkForScroll);
  }, []);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getUserCategories(userId);
        console.log(response)
        setTabs(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const checkForScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction) => {
    if (direction === 'left') {
      containerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    } else {
      containerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-white p-4 flex items-center mx-auto border-b border-neutral-200">
      {showLeftArrow && (
        <button
          className="absolute left-0 z-10 bg-gray-100 p-2"
          onClick={() => scroll('left')}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <div
        className="flex overflow-x-auto scroll-smooth category-scroll gap-4"
        ref={containerRef}
        onScroll={checkForScroll}
      >
        {tabs.map((category) => (
          <span
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`
              ${selectedCategory === category.id ? 'bg-yellow-200 text-green-600' : 'bg-yellow-100 text-gray-500 hover:bg-yellow-100 hover:text-green-600'}
              whitespace-nowrap py-1 px-3 text-xs font-normal cursor-pointer rounded-xl
            `}
          >
            {category.name}
          </span>
        ))}
      </div>
      {showRightArrow && (
        <button
          className="absolute right-0 z-10 bg-gray-100 p-2"
          onClick={() => scroll('right')}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default CategoryTabs;