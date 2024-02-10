import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Register user
export async function registerUser(email, password, fullName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUserId = userCredential.user.uid;
    await setDoc(doc(db, "users", newUserId), {
      fullName: fullName,
      email: email,
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Login user
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Logout user
export async function logoutUser() {
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
