import { addDoc, collection, collectionGroup, deleteDoc, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";

const USERS = "users";
// const ARTICLE = 'ARTICLE';
const CATEGORIES = "categories";
const ARTICLE = "article";

export function convertTimestampToDate(timestamp) {
  // Ensure the input is a valid Firebase Timestamp object
  if (!timestamp || typeof timestamp.toDate !== 'function') {
    console.error('Invalid timestamp provided');
    return null;
  }

  const dateObject = timestamp.toDate(); // Convert to JavaScript Date object

  // Format the date as you like
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-US', dateOptions);

  // Format the datetime as you like
  const dateTimeOptions = { 
    year: 'numeric', month: 'numeric', day: 'numeric', 
    hour: '2-digit', minute: '2-digit', second: '2-digit', 
    hour12: false // Use 24-hour format
  };
  const formattedDateTime = dateObject.toLocaleString('en-US', dateTimeOptions);

  return { 
    date: formattedDate,
    datetime: formattedDateTime
  };
}


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

export async function getAllArticles() {
  try {
    // Use a collection group query to get all documents from the 'article' subcollections across all users
    const articlesQuery = query(collectionGroup(db, "article")); // Ensure "article" matches your subcollection name
    const querySnapshot = await getDocs(articlesQuery);

    const articles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, articles };
  } catch (e) {
    console.error("Error fetching articles: ", e);
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
    const categoriesColRef = collection(db, CATEGORIES);
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