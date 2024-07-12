import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function Activities() {
    const [file, setFile] = useState(null); // State to hold the selected file
    const [previewUrl, setPreviewUrl] = useState(''); // State to hold the URL for previewing the selected image

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

    // Function to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", file); // Append the selected file
        // console.log("Form data:", formData);
        try {
            const response = await axiosInstance.post("/user/uploadImage", formData);
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
