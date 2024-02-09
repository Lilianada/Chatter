import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { registerUser } from "../../config/authorization";
import Spinner from "../Utils/Spinner";

const navigation = [
  { name: "Resources", to: "#" },
  { name: "Features", to: "#" },
  { name: "Career", to: "#" },
];

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the showPassword state
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [error, setError] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (pass) => {
    const regex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pass);
  };

  const register = async (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsLoading(true);

    // Validate password
    if (!validatePassword(formData.password)) {
      // Assuming you have a way to display error messages to the user
      setError(
        "Password must be at least 8 characters long, must contain at least one number and a special character."
      );
      setTimeout (() => {
        setError("");
      }, 3000)
      setIsLoading(false);
      return;
    }

    try {
      const user = await registerUser(
        formData.email,
        formData.password,
        formData.fullName
      );
      if (user) {
        // Assuming you have a way to handle successful registration (e.g., redirect or show success message)
        console.log("Registration successful", user);
        // Redirect or update UI accordingly
      } else {
        // Handle case where user is undefined or null
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Registration error:", error);
      // Assuming you have a way to display error messages to the user
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" relative overflow-hidden pb-16  sm:pb-24">
      <main className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div>
                <div className="hidden sm:mb-4 sm:flex sm:justify-center lg:justify-start">
                  <Link
                    to="#"
                    className="flex items-center rounded-full bg-gray-900 p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                  >
                    <span className="rounded-full bg-indigo-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                      We're hiring
                    </span>
                    <span className="ml-4 text-sm">Visit our careers page</span>
                    <ChevronRightIcon
                      className="ml-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Today a writer
                  <br />
                  Tomorrow a leader
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Everyone has an opinion that needs to be heard, we provide you
                  the platform that helps you get heard. Enjoy beautiful stories
                  written by talented writers.
                </p>
                <p className="mt-8 text-base font-semibold text-white sm:mt-10">
                  Used by
                </p>
                <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                        alt="Tuple"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                        alt="Workcation"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                        alt="StaticKit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Signup Form */}
            <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
              <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                <div className="px-6 py-8 sm:px-10">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Sign up</p>
                    <div className="relative mt-6">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="fullName" className="sr-only">
                          Full name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={formData.fullName}
                          onChange={onChange}
                          autoComplete="fullName"
                          placeholder="Full name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={onChange}
                          autoComplete="email"
                          placeholder="Email"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={formData.password}
                            onChange={onChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          >
                            {showPassword ? (
                              <IoEye
                                className="password_icon"
                                onClick={togglePasswordVisibility}
                              />
                            ) : (
                              <IoEyeOff
                                className="password_icon"
                                onClick={togglePasswordVisibility}
                              />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={register}
                        >
                          {isLoading ? ( <Spinner /> ) : "Create your account"}
                        </button>
                        {error && (
                          <p className="text-red-500 text-xs mt-2">{error}</p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-6 sm:px-10">
                  <p className="text-xs leading-5 text-gray-500">
                    By signing up, you agree to our{" "}
                    <Link
                      to="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Terms
                    </Link>
                    ,{" "}
                    <Link
                      to="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Data Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Cookies Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
