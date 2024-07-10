import axiosInstance from "../utils/axiosInstance";

export async function updateProfile(userId, data) {
  console.log(data);
  try {
    const response = await axiosInstance.patch(`/user/updateProfile/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    console.log("Profile update response:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function getUserData(userId) {
  
  try {
    const response = await axiosInstance.get(`/user/getUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    console.log("User data response:", response); 
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}