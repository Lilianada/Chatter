import { addDoc, collection, deleteDoc,} from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import axiosInstance from "../utils/axiosInstance";

const USERS = "users";
const ARTICLE = "article";

async function uploadImage(imageBase64, userId) {
  const storageRef = ref(storage, `users/${userId}/images/${Date.now()}.jpg`);
  await uploadString(storageRef, imageBase64, 'data_url');
  return await getDownloadURL(storageRef);
}

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

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function truncateText(text, limit = 40) {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
}

export async function postArticle(article, userId) {
  try {
    const articleWithStatus = { ...article, status: 'published' };

    // Upload image to Firebase Storage
    if (article.coverImage) {
      const imageUrl = await uploadImage(article.coverImage, userId);
      articleWithStatus.coverImage = imageUrl;
    }

    const postRequestRef = collection(db, 'users', userId, 'articles');
    const postArticleRef = collection(db, 'articles', userId, 'articles');
    const postRef = await addDoc(postRequestRef, articleWithStatus);
    await addDoc(postArticleRef, articleWithStatus);
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

export async function saveDraft(article, userId) {
  try {
    const articleWithStatus = { ...article, status: 'draft' };
    const draftRequestRef = collection(db, 'USERS', userId, 'ARTICLE');
    const draftRef = await addDoc(draftRequestRef, articleWithStatus);
    console.log("Document written with ID: ", draftRef.id, draftRef);
    return {
      success: true,
      id: draftRef.id,
      message: "Draft saved successfully",
      article: draftRef,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: e.message };
  }
}

export async function getAllArticles() {
  try {
    const response = await axiosInstance.get(`/articles/getArticles`);
    if (response.data.success) {
      return { articles: response.data.articles };
    }
  } catch (err) {
    console.error(err);
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

