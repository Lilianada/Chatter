import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { deleteDoc, doc } from "firebase/firestore";
import axiosInstance from "../utils/axiosInstance";

// Authenticated user
export function getAuthUser() {
  const authInstance = getAuth();
  const user = authInstance.currentUser;

  if (!user) {
    // sessionStorage.setItem("authUser", null);
    // signoutUser();
    return;
  }
  const authUser = user.uid;
  return authUser;
}

// Register user
export async function registerUser(email, password, fullName) {
  try {
    const response = await axiosInstance.post(`/user/register`, {
      email,
      password,
      fullName,
    });
    console.log(response)
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      throw new Error('Registration failed. Please try again.'); 
    }
  } catch (error) {
    // Re-throw the error to be handled by the caller
    throw error.response ? error.response.data : new Error("Registration failed. Network error.");
  }
}


export async function signinUser(email, password) {
  try {
    const auth = getAuth();
    // Sign in with Firebase and get user credentials
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get ID token from the Firebase user
    const idToken = await userCredential.user.getIdToken();

    // Post to your server for further authentication or user data retrieval
    const response = await axiosInstance.post('/user/login', { 
      token: idToken 
    });

    if (response.data.success && response.data.user) {
      localStorage.setItem('token', idToken); 
      return response.data.user;
    } else {
      // Handle failed login
      throw new Error(response.data.message || "Login failed with no specific error.");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error(error.response?.data?.message || error.message || "Network Error");
  }
}

// Logout user
export async function signoutUser() {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
}

// Forgot password
export async function forgotPassword(email) {
  try {
    const reset = await axiosInstance.post('', email, )
    return reset;
  } catch (error) {
    throw error;
  }
}

// Change password
export async function changePassword(password) {
  try {
    const change = await updateCurrentUser.updatePassword(auth, password);
    return change;
  } catch (error) {
    throw error;
  }
}

// Delete user
export function deleteuser(uid) {
  const userDoc = doc(db, "users", uid);
  return deleteDoc(userDoc);
}


localStorage.setItem('sessionStartTime', Date.now());

function checkSession() {
  const startTime = localStorage.getItem('sessionStartTime');
  const currentTime = Date.now();

  if (currentTime - startTime > 86400000) {  // 86400000 ms = 24 hours
    // Handle session expiration
    auth.signOut().then(() => {
      localStorage.clear(); // Clear local storage or session-related data
      window.location.href = '/signin'; // Redirect to login page
    });
  }
}

// You can call this function periodically or on certain events
checkSession();