import axios from 'axios';

const API_URL = 'http://localhost:5050';
export const postArticle = async (articleData, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post(`${API_URL}/addArticle`, articleData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveDraft = async (draftData) => {
    const token = localStorage.getItem('userToken');
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
