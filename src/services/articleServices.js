import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const API_URL = `${process.env.REACT_APP_API_URL}/article`;

export const postArticle = async (articleData, token) => {
    
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  
  try {
    
    const response = await axiosInstance.post(`article/addArticle`, articleData, config);
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
        const response = await axios.post(`${API_URL}/savedrafts`, draftData, config);
        return response.data;
    } catch (error) {
        console.error("Error saving draft:", error);
        throw error;
    }
};
