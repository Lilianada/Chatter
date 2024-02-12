import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "../components/Utils/Loader";

export const Context = createContext();

export default function AuthContext({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        let unsubscribe;
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsLoading(true);
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, []);

        const values = {
            user,
            setUser,
            isLoading,
        };
        
        return (
            <Context.Provider value={values}>
                {
                    isLoading ? <Loader/> : children
                }
            </Context.Provider>
        );
}
