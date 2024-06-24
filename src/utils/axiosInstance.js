import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL // Ensure your base URL is stored in environment variables
});

export default axiosInstance;
