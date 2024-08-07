import React, { useState } from 'react';
import axiosInstance from '../constants/axiosInstance';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Activities() {
    const [file, setFile] = useState(null); // State to hold the selected file
    const [previewUrl, setPreviewUrl] = useState(''); 

    // Function to handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setFile(file);
            const reader = new FileReader(); // FileReader to generate a preview URL
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!file) {
            console.error("No file selected");
            return;
        }
    
        try {
            // Ensure firebase is properly imported and initialized
            console.log("Uploading file:", file);
            const storage = getStorage();
            const storageRef = ref(storage, 'uploads/' + file.name);
    
            // Upload the file
            await uploadBytes(storageRef, file);
    
            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Download URL:", downloadURL);
            setPreviewUrl(downloadURL);  // Assuming you have a state setter for updating the preview URL
    
            // Send the URL to the backend
            const response = await axiosInstance.post("/user/uploadImage", { photoUrl: downloadURL });
            console.log("Response:", response);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    

    return (
        <div className='p-8'>
            <h1 className='text-lg mb-4 font-bold'>Activities</h1>
            <form onSubmit={submitHandler} className='flex flex-col gap-3'>
                <input type="file" name="photo" id="photo" onChange={handleFileChange} />
                <button type="submit" className='border border-green-400 bg-green-600 text-white py-2 px-3 rounded-md'>Submit</button>
                {previewUrl && <img src={previewUrl} alt="Preview" />}
            </form>
        </div>
    );
}
