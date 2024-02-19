import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from "../../config/article";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CategoryTabs = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const containerRef = useRef(null);

  const checkForScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    // Fetch categories on component mount
    fetchCategories();
    // Optional: Check on window resize if the visibility of arrows should be updated
    window.addEventListener('resize', checkForScroll);
    return () => window.removeEventListener('resize', checkForScroll);
  }, []);

  const scroll = (direction) => {
    if (direction === 'left') {
      containerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    } else {
      containerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await getCategories();
      setCategories(response || []); // Ensure response is an array or fallback to an empty array
      checkForScroll(); // Check for scroll after setting categories
    } catch (error) {
      console.error("Error fetching categories: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='relative mb-4 flex items-center'> {/* Added relative positioning for absolute-positioned arrows */}
      {showLeftArrow && (
        <button
          className="absolute left-0 z-10 bg-gray-100 p-2"
          onClick={() => scroll('left')}
        >
          &lt; {/* Consider replacing with an SVG or icon library arrow */}
        </button>
      )}
      <div className="flex overflow-x-auto scroll-smooth category-scroll" ref={containerRef} onScroll={checkForScroll}>
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.name}
            className={classNames(
              category.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium cursor-pointer'
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
      {showRightArrow && (
        <button
          className="absolute right-0 z-10 bg-gray-100 p-2"
          onClick={() => scroll('right')}
        >
          &gt; {/* Consider replacing with an SVG or icon library arrow */}
        </button>
      )}
    </div>
  );
};

export default CategoryTabs;
