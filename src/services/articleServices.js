import axios from 'axios';

export const postArticle = async (articleData) => {
  const token = localStorage.getItem('userToken');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post(process.env.API_URL, articleData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
