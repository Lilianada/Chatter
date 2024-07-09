import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/colored_logo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Notification from "../../components/Utils/Notification";
import Spinner from "../../components/Utils/Spinner";
import { signinUser } from "../../config/authorization";
import { useDispatch } from "react-redux";
import { db } from "../../config/firebase.js";
import {
  setUser,
} from "../../store/actions/userActions";

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "error",
    message: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const userEmail = rememberMe ? localStorage.getItem("userEmail") : "";
    setFormData((prev) => ({ ...prev, email: userEmail }));
    setRememberMe(rememberMe);
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const user = await signinUser(formData.email, formData.password, db);
      
      if (user) {
        dispatch(setUser('name', user.fullName));
        dispatch(setUser('userId', user.uid));
        dispatch(setUser('email', user.email));
        dispatch(setUser('categories', user.categories))
        console.log('users saved to store');
        
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } 
  
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setNotification({
        show: true,
        type: "error",
        message: error.message || "Signin failed. Check your details and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-green-600">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto w-24" src={logo} alt="Chatter" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 m-8">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  />
                </div>
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeIcon
                        className="h-4 w-4 text-gray-500"
                        aria-hidden="true"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeSlashIcon
                        className="h-4 w-4 text-gray-500"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-red-400 focus:ring-yellow-600"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    id="rememberMe"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <Link
                    to="#"
                    className="font-semibold text-yellow-600 hover:text-yellow-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-600 shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                >
                  {isLoading ? <Spinner /> : "Sign in"}
                </button>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-xs leading-5 text-yellow-500">
                  Demo account details:
                </p>
                <p className="text-xs leading-5 text-gray-500 font-semibold">
                  Email:{" "}
                  <span className="font-medium text-gray-400 underline">
                    demouser@demo.app
                  </span>{" "}
                  Password:{" "}
                  <span className="font-medium text-gray-400 underline">
                    Demouser1!
                  </span>
                </p>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-300">
            Not a member?{" "}
            <Link
              to="/"
              className="font-semibold leading-6 text-yellow-500 hover:text-yellow-400"
            >
              Sign up now
            </Link>
          </p>
        </div>
        {notification.show && (
          <Notification
            title={
              notification.type.charAt(0).toUpperCase() +
              notification.type.slice(1)
            }
            message={notification.message}
            type={notification.type}
            timer={5000} // Auto-hide after 5 seconds
          />
        )}
      </div>
    </>
  );
}
