import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/AuthContext';

export default function ProtectedRoutes({ children}) {
  const {user} = useContext(Context);
 
    if (!user) {
        return <Navigate to="/signin" replace/>;
    } else {
        return children;
    }
}
 