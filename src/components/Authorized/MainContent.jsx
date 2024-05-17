import React from "react";
import Arts from "./Arts";
import FollowerSuggestion from "./FollowerSuggestion";

export default function MainContent() {
  return (
    <div className="flex gap-4 flex-1 ">
      <div class="flex-1 lg:px-4 overflow-y-auto lg:border-r lg:border-gray-200 lg:pb-24">
        <Arts />
      </div>

      {/* <!-- Aside Content --> */}
      <aside class="hidden lg:block lg:w-68 lg:my-4 lg:mr-8 lg:sticky lg:right-0 lg:top-20 lg:bottom-0 ">
        <FollowerSuggestion />
      </aside>
    </div>
  );
}
