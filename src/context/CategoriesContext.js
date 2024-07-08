import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllCategories } from "../config/categories";

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCategories();
      if (response) { 
        const allCategories = response.categories;
        setCategories(allCategories);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, isLoading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
