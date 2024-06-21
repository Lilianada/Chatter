import { Link } from "react-router-dom";
import Logo from '../../assets/colored_logo.png'

export default function PageNotFound() {
  const handleBack = () => {
    window.history.back();
  }
    return (
      <>
        <div className="flex min-h-full flex-col bg-white pb-12 pt-16">
          <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
            <div className="flex flex-shrink-0 justify-center">
              <Link href="/" className="inline-flex">
                <span className="sr-only">Chatter App</span>
                <img
                  className="h-16 w-auto"
                  src={Logo}
                  alt=""
                />
              </Link>
            </div>
            <div className="py-16">
              <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found.</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-6">
                  <button onClick={handleBack} className="text-base font-medium text-white hover:text-yellow-600 bg-green-600 p-2 rounded-lg">
                    Go back home
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
          <footer className="mx-auto w-full max-w-7xl flex-shrink-0 px-6 lg:px-8">
            <nav className="flex justify-center space-x-4">
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                Contact Support
              </Link>
              <span className="inline-block border-l border-gray-300" aria-hidden="true" />
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                Status
              </Link>
            </nav>
          </footer>
        </div>
      </>
    )
  }
  