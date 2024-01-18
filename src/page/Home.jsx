import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedPosts from "../components/FeaturePosts";

export default function Home() {
  return (
    <div>
      <div className="relative overflow-hidden bg-gray-800">
        <div
          className="hidden sm:absolute sm:inset-0 sm:block"
          aria-hidden="true"
        >
          <svg
            className="absolute bottom-0 right-0 mb-48 translate-x-1/2 transform text-gray-700 lg:top-0 lg:mb-0 lg:mt-28 xl:translate-x-0 xl:transform-none"
            width={364}
            height={384}
            viewBox="0 0 364 384"
            fill="none"
          >
            <defs>
              <pattern
                id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width={364}
              height={384}
              fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
            />
          </svg>
        </div>
        <Header />
        <Hero />
      </div>
      <Stats />

      <div className="flex flex-1 items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <section
            aria-labelledby="primary-heading"
            className="flex h-full min-w-0 flex-1 flex-col lg:order-last"
          >
            <FeaturedPosts />
          </section>
        </main>

        {/* Secondary column (hidden on smaller screens) */}
        <aside className="hidden w-96 overflow-y-auto bg-white lg:block">
          {/* Your content */}
        </aside>
      </div>
    </div>
  );
}
