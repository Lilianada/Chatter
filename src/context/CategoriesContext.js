import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllCategories } from "../config/categories";

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    // Attempt to get cached categories from localStorage
    const localData = localStorage.getItem("categories");
    return localData ? JSON.parse(localData) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        setIsLoading(true);
        try {
          const response = await getAllCategories();
          const allCategories = [{id: "all", name: "All", current: true, }, ...response];
          localStorage.setItem("categories", JSON.stringify(allCategories));
          setCategories(allCategories || []);
        } catch (error) {
          console.error("Error fetching categories: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCategories();
    }
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, isLoading }}>
      {children}
    </CategoriesContext.Provider>
  );
};
