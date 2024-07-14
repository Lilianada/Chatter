import { addDoc, collection, deleteDoc,} from "firebase/firestore";
import { db } from "./firebase";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import axiosInstance from "../utils/axiosInstance";

const USERS = "users";
const ARTICLE = "article";

async function uploadImage(image, folderName) {

  let downloadURL = "";
    if (image && image.name) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
          `${folderName}/` + image.name
      );

      await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);
    }
    return downloadURL;
}

export function convertTimestampToDate(timestamp) {
  // Parse the timestamp string into a JavaScript Date object
  const dateObject = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
    console.error('Invalid timestamp provided');
    return null;
  }

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

export const postArticle = async (articleData, token) => {
    
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const articleWithStatus = { ...articleData, status: 'published' };
  
  try {
    if (articleData.coverImage) {
      const imageUrl = await uploadImage(articleData.coverImage, 'articleImages');
      articleWithStatus.coverImage = imageUrl;
    }
    console.log(articleWithStatus);
    const response = await axiosInstance.post(`article/addArticle`, articleWithStatus, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
    throw error;
  }
  
};

export const saveDraft = async (draftData) => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  };

  try {
      const response = await axiosInstance.post(`article/savedrafts`, draftData, config);
      return response.data;
  } catch (error) {
      console.error("Error saving draft:", error);
      throw error;
  }
};

export async function getAllArticles() {
  try {
    const response = await axiosInstance.get(`/article`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (response.data.success) {
      return { articles: response.data.data };
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

