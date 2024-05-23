import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function AddButtons({ selectedImage, handleImageChange }) {
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className="mt-0 flex gap-2">
     
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200">
          <button onClick={() => setOpenCategory(!openCategory)}>
            <PlusIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </button>
        </label>
      </div>
      <div className="flex items-center space-x-4">
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200"
        >
          <PhotoIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
          <input
            id="image-upload"
            name="image-upload"
            type="file"
            className="sr-only"
            onChange={handleImageChange}
            title="Cover Image"
          />
        </label>
        {selectedImage && (
          <div className="flex justify-center">
            <img
              src={selectedImage}
              alt="Article cover"
              className="max-w-xs max-h-48 rounded-md border border-gray-300"
            />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <label
          htmlFor="delete"
          className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200"
        >
          <TrashIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
          <input
            id="delete"
            name="delete"
            type="button"
            title="Delete Image"
            className="sr-only"
            onChange={() => handleImageChange(null)}
          />
        </label>
      </div>
    </div>
  );
}

export default AddButtons;
