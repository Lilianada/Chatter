import axiosInstance from "../utils/axiosInstance";

export async function getAllCategories() {

    try {
      const response = await axiosInstance.get(`/api/category/getCategories`, {
        headers:{
            "Authorization": localStorage.getItem('token')
        }
      });
  
      if (response.success) {
        return {categories: response.data}
      }
      
    } catch(err) {
      console.error(err)
    }
  }
  
  export async function addUserCategories(userId, categories) {
    try {
      const result = await axiosInstance.post(`/api/category/addUserCategories/${userId}`, {
        categories // Assuming categories is an array or object that needs to be sent
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Ensure the token is formatted correctly
        }
      });
  
      // Checking the API response to confirm successful operation
      if (result.data && result.data.success) {
        return { success: true, message: "User categories updated successfully" };
      } else {
        // Handle scenario when the API response is not as expected
        return { success: false, message: result.data.message || "Failed to update categories" };
      }
    } catch (error) {
      console.error("Error updating user categories:", error);
      return { success: false, message: error.message || "Error updating user categories" };
    }
  }
  
  export async function getUserCategories(userId) {
    try {
      const res = await axiosInstance.get(`/api/category/getUserCategories/${userId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Check if the response contains the expected data
      if (res.data && res.data.success) {
        return { success: true, categories: res.data.categories }; // Assuming the response has a categories array
      } else {
        // Handle scenario when the API response is not successful
        return { success: false, message: res.data.message || "Failed to fetch categories" };
      }
    } catch (error) {
      console.error("Error fetching user categories:", error);
      return { success: false, message: error.message || "Error fetching user categories" };
    }
  }
  