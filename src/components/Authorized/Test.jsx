import { useRef, useState } from "react";
import {
  HomeIcon,
  DocumentChartBarIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  PlusIcon,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Header from "./Header";
import CategoryTabs from "./CategoryTabs";
import { useUserTopics } from "../../context/UserTopicsContext";
import FollowerSuggestion from "./FollowerSuggestion";
import Arts from "./Arts";

const tabs = [
  { name: "Recently Viewed", href: "#", current: true },
  { name: "Recently Added", href: "#", current: false },
  { name: "Favorited", href: "#", current: false },
];
const files = [
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  // More files...
];
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

          <div class="flex gap-4 flex-1 relative top-[4.5rem] overflow-hidden mb-24">
            {/* <!-- Content Area --> */}
            <main class="flex-1 lg:p-4 overflow-y-auto lg:border-r lg:border-gray-200">
              <Arts />
            </main>

            {/* <!-- Aside Content --> */}
            <aside class="hidden lg:block lg:w-68 lg:my-4 lg:mr-8 lg:sticky lg:right-0 lg:top-20 lg:bottom-0 ">
              <FollowerSuggestion />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
