import React from 'react';
import { PlusIcon } from "@heroicons/react/20/solid";

function UploadCoverImage({ selectedImage, handleImageChange }) {
  console.log(selectedImage)
  return (
    <div className="mt-8">
      <div className="flex items-center space-x-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200"
        >
          <PlusIcon className="h-8 w-8 text-gray-500" aria-hidden="true" />
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
        {selectedImage && (
          <div className="flex justify-center">
            <img src={selectedImage} alt="Article cover" className="max-w-xs max-h-48 rounded-md border border-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadCoverImage;
