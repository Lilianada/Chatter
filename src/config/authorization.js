import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function registerUser(email, password, fullName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUserId = userCredential.user.uid;
      await setDoc(doc(db, "users", newUserId), {
        fullName: fullName,
        email: email,
      });
      return userCredential.user; 
    } catch (error) {
      throw error; // Throws the error to be caught by the caller
    }
  }
  