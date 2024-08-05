import { addDoc, collection, deleteDoc,} from "firebase/firestore";
import { db } from "./firebase";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import axiosInstance from "../constants/axiosInstance";

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
  const dateObject = new Date(timestamp);

  if (isNaN(dateObject.getTime())) {
    console.error('Invalid timestamp provided');
    return null;
  }

  // Format the date as you like
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-US', dateOptions);

  // Calculate the difference in time from now
  const now = new Date();
  const difference = now.getTime() - dateObject.getTime();

  // Convert difference to an appropriate format (days, hours, minutes, seconds)
  let formattedDateTime;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    formattedDateTime = days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    formattedDateTime = hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    formattedDateTime = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    formattedDateTime = seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
  }

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
    const response = await axiosInstance.post(`article/addArticle`, articleWithStatus, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
  }
  
};

export const saveDraft = async (articleData, token) => {
   
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const articleWithStatus = { ...articleData, status: 'draft' };
  
  try {
    if (articleData.coverImage) {
      const imageUrl = await uploadImage(articleData.coverImage, 'draftImages');
      articleWithStatus.coverImage = imageUrl;
    }
    const response = await axiosInstance.post(`article/saveDraft`, articleWithStatus, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
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

