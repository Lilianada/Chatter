import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Spinner from "../Utils/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TextArea({handleEditorChange, apiKey, isLoading, handleSubmit,}) {
  const [title, setTitle] = useState(""); // State to hold the title

  // Handle change for the title input
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Adjusted handleSubmit to also pass title
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ title, content: '' }); // Pass the title along with content
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className=" mb-6">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="mt-2 w-full">
          <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-full">
          <input
            type="text"
            name="title"
            id="title"
            autoComplete="title"
            className="block w-full flex-1 rounded-md border-0 bg-transparent py-1.5 pl-1 shadow-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            placeholder="Title of article"
            required
            value={title}
            onChange={handleTitleChange}
          />
          </div>
        </div>
      </div>
      <Editor
        apiKey={apiKey}
        initialValue="<p>Type article here</p>"
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleEditorChange}
      />
      <button type="submit" disabled={isLoading} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 w-40 flex justify-center"
        >
        {isLoading ? <Spinner /> : "Submit Article"}
      </button>
    </form>
  );
}
