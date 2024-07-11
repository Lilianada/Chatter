import axiosInstance from "../utils/axiosInstance";

export async function updateProfile(userId, data) {
  console.log(data);
  try {
    const response = await axiosInstance.patch(`/user/updateProfile`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    if (response.data.success) {
      console.log("Profile update response:", response);
      return response.data;
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function getUserData(userId) {
  try {
    const response = await axiosInstance.get(`/user/getUser`, {
      headers: {
        Authorization: localStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      userId: userId
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}