import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserCategories } from "../config/article";
import { getAuthUser } from "../config/authorization";
import { useSelector } from "react-redux";

const UserTopicsContext = createContext();

export const useUserTopics = () => useContext(UserTopicsContext);

export const UserTopicsProvider = ({ children }) => {
  const userId = useSelector((state) => state.user.userId);
  const [isLoading, setIsLoading] = useState(false);
  const [userTopics, setUserTopics] = useState(() => {
    const localData = localStorage.getItem("userTopics");
    return localData ? JSON.parse(localData) : [];
  });
  // console.log(userTopics, "userTopics");
  useEffect(() => {
    if (userTopics.length < 1) {
      const fetchUserTopics = async () => {
        setIsLoading(true);
        try {
          const response = await getUserCategories(userId);
          // console.log("response", response);
          const allUserTopics = [
            { id: "all", name: "All", current: true },
            ...response,
          ];
          // console.log("allUserTopics", allUserTopics);
          // localStorage.setItem("userTopics", JSON.stringify(allUserTopics));
          setUserTopics(allUserTopics || []);
        } catch (error) {
          console.error("Error fetching userTopics: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserTopics();
    }
  }, []);

  return (
    <UserTopicsContext.Provider value={{ userTopics, isLoading }}>
      {children}
    </UserTopicsContext.Provider>
  );
};
