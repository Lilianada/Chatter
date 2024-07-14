import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import SelectCategories from "./SelectCategories";
import Modal from "./Modal";

function AddButtons({
  handleImageChange,
  selectedCategories,
  handleCheckboxChange,
  handleDeleteImage,
  selectedImage,
}) {
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className="mt-0 flex gap-2">
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
      </div>
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200">
          <button onClick={() => setOpenCategory(true)}>
            <PlusIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </button>
        </label>
      </div>
      {selectedImage && (
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => handleDeleteImage(e)}
            title="Delete Image"
            className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200"
          >
            <TrashIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </button>
        </div>
      )}
      <Modal isOpen={openCategory} closeModal={() => setOpenCategory(false)}>
        <SelectCategories
          selectedCategories={selectedCategories}
          handleCheckboxChange={handleCheckboxChange}
          close={() => setOpenCategory(false)}
        />
      </Modal>
    </div>
  );
}

export default AddButtons;
