import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserCategories } from "../config/article";
import { useSelector } from "react-redux";


export const useUserTopics = () => useContext(UserTopicsContext);


export const UserTopicsContext = createContext();

export const UserTopicsProvider = ({ children }) => {
  const userId = useSelector((state) => state.user.userId);
  const [isLoading, setIsLoading] = useState(false);
  const [userTopics, setUserTopics] = useState(() => {
    const localData = localStorage.getItem("userTopics");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    const fetchUserTopics = async () => {
      if (!userId) return; // Ensure there is a userId before fetching
      setIsLoading(true);
      try {
        const response = await getUserCategories(userId);
        const topics = response.success ? response.categories : []; // Adjust depending on the actual structure of response
        const allUserTopics = [
          { id: "all", name: "All", current: true },
          ...topics,
        ];
        localStorage.setItem("userTopics", JSON.stringify(allUserTopics)); // Save to local storage
        setUserTopics(allUserTopics);
      } catch (error) {
        console.error("Error fetching userTopics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userTopics.length < 1) {
      fetchUserTopics();
    }
  }, [userId]); // Add userId to useEffect dependencies

  return (
    <UserTopicsContext.Provider value={{ userTopics, isLoading }}>
      {children}
    </UserTopicsContext.Provider>
  );
};