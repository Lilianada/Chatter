import axiosInstance from "../utils/axiosInstance";

export async function getAllCategories() {
  try {
    const response = await axiosInstance.get(`/category/getCategories`);
    if (response.data.success) {
      return { data: response.data.categories };
    }
    
  } catch (err) {
    console.error(err);
  }
}

export async function addUserCategories(userId, categories) {
  try {
    const result = await axiosInstance.post(
      `/category/addUserCategories/${userId}`,
      {
        categories, // Assuming categories is an array or object that needs to be sent
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is formatted correctly
        },
      }
    );

    // Checking the API response to confirm successful operation
    if (result.data && result.data.success) {
      return { success: true, message: "User categories updated successfully" };
    } else {
      // Handle scenario when the API response is not as expected
      return {
        success: false,
        message: result.data.message || "Failed to update categories",
      };
    }
  } catch (error) {
    console.error("Error updating user categories:", error);
    return {
      success: false,
      message: error.message || "Error updating user categories",
    };
  }
}

export async function getUserCategories(userId) {
  try {
    const res = await axiosInstance.get(
      `/category/getUserCategories/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Check if the response contains the expected data
    console.log(res, "response");
    if (res.data && res.data.success) {
      return { success: true, categories: res.data.categories };
    } else {
      // Handle scenario when the API response is not successful
      return {
        success: false,
        message: res.data.message || "Failed to fetch categories",
      };
    }
  } catch (error) {
    console.error("Error fetching user categories:", error);
    return {
      success: false,
      message: error.message || "Error fetching user categories",
    };
  }
}
