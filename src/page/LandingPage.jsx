import React from "react";
import Header from "../components/Unauthorized/Header";
import Hero from "../components/Unauthorized/Hero";
import Stats from "../components/Unauthorized/Stats";
import VerifiedAuthors from "../components/Unauthorized/VerifiedAuthors";
import BigCta from "../components/Unauthorized/BigCta";
import Footer from "../components/Unauthorized/Footer";
import Features from "../components/Unauthorized/Features";

export default function LandingPage() {
  return (
    <div>
      <div className="relative overflow-hidden bg-green">
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

      <div className="bg-[#E4D6A7]">

      </div>
      <Stats />
      <Features />

      {/* <div className="flex flex-1 items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <FeaturedPosts />
        </main>
        <aside className="hidden w-80 overflow-y-auto bg-white lg:block mx-6">
            <PopularAuthors />
            <SmallCta/>
        </aside>
      </div> */}

      <VerifiedAuthors />
      <BigCta />
      <Footer />
    </div>
  );
}
