import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axiosInstance from "../utils/axiosInstance";

export async function updateProfile(userId, data) {
  console.log(data);
  try {
    let downloadURL = "";
    if (data.profilePic && data.profilePic.name) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        "profilePictures/" + data.profilePic.name
      );

      await uploadBytes(storageRef, data.profilePic);
      downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
    }
    const formData = {
      fullName: data.fullName,
      userName:  data.userName,
      email: data.email,
      categories: data.categories,
      pronouns: data.pronouns,
      description: data.description,
      profilePic: downloadURL,
    };
    const response = await axiosInstance.patch(`/user/updateProfile`, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: { userId: userId },
    });
    if (response.data.success) {
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
        "Content-Type": "application/json",
      },
      userId: userId,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
