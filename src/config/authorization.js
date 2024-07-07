import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import axiosInstance from "../utils/axiosInstance";

const API_URL = `/user`;

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
    const response = await axiosInstance.post(`/api/user/register`, {
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

// signin user
export async function signinUser(email, password, db) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User data not found.");
    }

    const userData = userDoc.data();
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        fullName: userData.fullName,
      }
    };
  } catch (error) {
    console.error("Authentication error:", error);
    throw error; // Propagate error to be handled by the caller
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
    const reset = await sendPasswordResetEmail(auth, email);
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
