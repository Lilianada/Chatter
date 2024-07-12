import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuthUser } from '../config/authorization';
import { getUserData } from '../config/profile';

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        userId: "",
        fullName: "",
        userName: "",
        email: "",
        categories: [],
        pronouns: "",
        profilePic: "",
        description: "",
    });

    const updateUser = (updatedFields) => {
        setUser(prev => ({ ...prev, ...updatedFields }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            const userId = getAuthUser();
            if (!userId) return;

            setIsLoading(true);
            try {
                const response = await getUserData(userId);
                setUser(response.data); 
            } catch (err) {
                console.error("Error fetching user data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};
