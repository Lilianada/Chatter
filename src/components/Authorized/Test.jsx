import { useRef, useState } from "react";
import {
  HomeIcon,
  DocumentChartBarIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CategoryTabs from "./CategoryTabs";
import { useUserTopics } from "../../context/UserTopicsContext";
import { Outlet } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/browse", icon: HomeIcon, current: true },
  {
    name: "Profile",
    to: "/profile",
    icon: UserCircleIcon,
    current: false,
  },
  {
    name: "New Article",
    to: "/dashboard/new-article",
    icon: DocumentChartBarIcon,
    current: false,
  },
  {
    name: "Settings",
    to: "/dashboard/fixed_term_deposits",
    icon: CreditCardIcon,
    current: false,
  },
];

export default function Test() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <main class="h-screen overflow-hidden">
      <div class="relative flex h-full">
        {/* <!-- Sidebar --> */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />

        <div class="flex flex-1 flex-col lg:pl-20">
          {/* <!-- Header --> */}
          <Header setSidebarOpen={setSidebarOpen} />

          {/* <!-- Tabs Menu --> */}
          <div class="sticky top-[4.5rem] z-10 md:pl-20 lg:pl-0">
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

          <main class="flex gap-4 flex-1 relative top-[4.5rem] overflow-hidden">
            {/* <!-- Content Area --> */}
           {/* <MainContent/> */}
           <Outlet />
          </main>
        </div>
      </div>
    </main>
  );
}
