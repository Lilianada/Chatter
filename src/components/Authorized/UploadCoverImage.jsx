import React, { useState } from 'react';
import { PhotoIcon } from "@heroicons/react/20/solid";

function UploadCoverImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <>
    <div className="max:w-1/3 mb-6">
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        Cover photo
      </label>
      {!selectedImage ? (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
          <div className="text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file or drag and drop</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              {/* <p className="pl-1"></p> */}
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      ) : (
        <>
        <div className=" w-fit mt-2 flex justify-center items-center rounded-lg border border-gray-300 px-4 py-4">
          <img src={selectedImage} alt="Cover" className="max-w-xs max-h-48" />
        </div>
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Change cover image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              {/* <p className="pl-1"></p> */}
            </div>
        </>
      )}
    </div>
    </>
  );
}

export default UploadCoverImage;
