import axiosInstance from "../utils/axiosInstance";

export async function updateProfile(userId, data) {
    try {
      const response = await axiosInstance.patch(`/user/updateProfile/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Profile update response:", response.data);
      return response.data; // return response data for further handling or notifications
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Re-throw error to handle it in the calling function or show notification
    }
  }
  