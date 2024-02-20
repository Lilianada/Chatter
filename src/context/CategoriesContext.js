import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCategories } from '../config/article';

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    // Attempt to get cached categories from localStorage
    const localData = localStorage.getItem('categories');
    return localData ? JSON.parse(localData) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        setIsLoading(true);
        try {
          const response = await getCategories();
          localStorage.setItem('categories', JSON.stringify(response)); 
          setCategories(response || []);
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
