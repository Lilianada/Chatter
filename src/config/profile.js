import axiosInstance from "../utils/axiosInstance";

export async function updateProfile(userId, data) {
    console.log(data)
  try {
    const response = await axiosInstance.patch(`/user/updateProfile/${userId}`, {data}, {
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
