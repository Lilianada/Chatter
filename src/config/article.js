import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const USERS = 'users';
const POSTARTICLE = 'posts';

export async function postArticle (article, userId) {
    try {
    const postRequestRef = collection(db, USERS, userId, POSTARTICLE);
    const postRef = await addDoc(postRequestRef, article);
    console.log("Document written with ID: ", postRef.id, postRef);
    return { success: true, id: postRef.id, message: "Article posted successfully", article: postRef };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, message: e.message };
    }
}