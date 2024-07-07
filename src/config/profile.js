import axiosInstance from "../utils/axiosInstance";


export async function updateProfile (userId, data) {
    try {
        const response = axiosInstance.patch(`/user/updateProfile`, userId, data, {
            header: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });


    } catch(error) {
        
    }
}