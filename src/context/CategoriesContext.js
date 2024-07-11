import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllCategories } from "../config/categories";

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, isLoading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
