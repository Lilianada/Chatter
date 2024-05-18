import React, { useState, useRef } from "react";
import Arts from "./Arts";
import FollowerSuggestion from "./FollowerSuggestion";
import CategoryTabs from "./CategoryTabs";
import { useUserTopics } from "../../context/UserTopicsContext";

export default function MainContent() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const containerRef = useRef(null);
  const { userTopics } = useUserTopics();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const checkForScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };
  return (
    <div className="relative flex-1 flex flex-col h-full overflow-hidden">
      {/* Tabs Menu */}
      <div className="sticky  z-10 bg-white">
        <CategoryTabs
          categories={userTopics}
          checkForScroll={checkForScroll}
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          containerRef={containerRef}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Articles Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 lg:px-4 overflow-y-auto lg:border-r lg:border-gray-200 lg:pt-4 lg:pb-24">
          <Arts />
        </div>

        {/* Aside Content */}
        <aside className="hidden lg:block lg:w-68 lg:my-4 lg:mr-8 lg:sticky lg:top-20">
          <FollowerSuggestion />
        </aside>
      </div>
    </div>
  );
}
