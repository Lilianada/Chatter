import { Link } from "react-router-dom"

export default function SmallCta() {
    return (
      <div className="bg-white border mt-8 rounded-xl">
        <div className="mx-auto py-4 sm:px-4 sm:py-4 lg:px-4">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-6 text-center shadow-2xl sm:rounded-xl sm:px-6">
            <h2 className="mx-auto text-lg font-bold tracking-tight text-white">
              Become a member
            </h2>
            <p className="mx-auto mt-2 text-sm  text-gray-300">
             ...and enjoy all the exciting benefits.
            </p>
            <div className="mt-4 flex items-center justify-center gap-x-6">
              <Link
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    )
  }
  