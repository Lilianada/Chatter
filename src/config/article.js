import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";

const USERS = "users";
// const ARTICLE = 'ARTICLE';
const CATEGORIES = "categories";
const ARTICLE = "article";

export async function postArticle(article, userId) {
  try {
    const postRequestRef = collection(db, USERS, userId, ARTICLE);
    const postRef = await addDoc(postRequestRef, article);
    console.log("Document written with ID: ", postRef.id, postRef);
    return {
      success: true,
      id: postRef.id,
      message: "Article posted successfully",
      article: postRef,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: e.message };
  }
}

export async function getArticle(userId, articleId) {
  try {
    const articleRequestRef = collection(db, USERS, userId, ARTICLE);
    const articleRef = await getDoc(articleRequestRef, articleId);
    console.log("Document written with ID: ", articleRef.id, articleRef);
    return {
      success: true,
      id: articleRef.id,
      message: "Article posted successfully",
      article: articleRef,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: e.message };
  }
}

export async function deleteArticle(userId, articleId) {
  try {
    const articleRequestRef = collection(db, USERS, userId, ARTICLE);
    const articleRef = await deleteDoc(articleRequestRef, articleId);
    console.log("Document written with ID: ", articleRef.id, articleRef);
    return {
      success: true,
      id: articleRef.id,
      message: "Article posted successfully",
      article: articleRef,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: e.message };
  }
}

export async function updateArticle(userId, articleId, article) {
  try {
    const articleRequestRef = collection(db, USERS, userId, ARTICLE);
    const articleRef = await addDoc(articleRequestRef, articleId, article);
    console.log("Document written with ID: ", articleRef.id, articleRef);
    return {
      success: true,
      id: articleRef.id,
      message: "Article posted successfully",
      article: articleRef,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: e.message };
  }
}
export async function getCategories() {
  try {
    const categoriesColRef = collection(db, 'categories');
    const categoriesQuery = query(categoriesColRef);
    const querySnapshot = await getDocs(categoriesQuery);

    if (querySnapshot.empty) {
      console.log("No categories found.");
      return [];
    }

    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categories; // Returns an array of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}