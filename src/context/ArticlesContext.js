import { createContext, useContext, useEffect, useState } from "react";
import { getAllArticles } from "../config/article";




export const ArticlesContext = createContext(null);

export const useArticles = () => useContext(ArticlesContext);

export const ArticlesProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const response = await getAllArticles();
            setArticles(response.articles);
        } catch (err) {
            console.error("Error fetching articles:", err);
        } finally {
            setIsLoading(false);
        }
        };
    
        fetchArticles();
    }, []);
    
    return (
        <ArticlesContext.Provider value={{ articles, isLoading }}>
        {children}
        </ArticlesContext.Provider>
    );
};
