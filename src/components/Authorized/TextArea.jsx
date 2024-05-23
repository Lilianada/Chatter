import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon-block";
// import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { Heading } from '@ckeditor/ckeditor5-heading';
// import { Link } from '@ckeditor/ckeditor5-link';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
// import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';

const articleData = {
  title: '',
  description: '',
  content: '',
  coverImage: '',
};

function TextArea({ handleEditorChange, isLoading }) {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <form className="w-full max-w-3xl">
        <div className="mb-4 mt-2 flex items-center">
          <label
            htmlFor="title"
            className="block text-sm leading-6 text-gray-400 border-r border-neutral-300 pr-2 ml-5"
          >
            Title
          </label>
          <div className="w-full">
            <div className="flex w-full sm:w-full">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                className="block w-full flex-1 border-0 bg-transparent px-0 pl-3 text-gray-900 font-semibold placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                placeholder="Title of article..."
                required
                onChange={(e) => handleEditorChange({ ...articleData, title: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="mb-4 mt-2 flex items-center">
          <label
            htmlFor="subtitle"
            className="block text-sm leading-6 text-gray-400 border-r border-neutral-300 pr-2"
          >
            Subtitle
          </label>
          <div className="w-full">
            <div className="flex w-full sm:w-full">
              <input
                type="text"
                name="description"
                id="description"
                autoComplete="description"
                className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
                placeholder="Subtitle..."
                required
                maxLength="100"
                onChange={(e) => handleEditorChange({ ...articleData, description: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="border border-neutral-300 rounded-lg">
          <CKEditor
            editor={BalloonEditor}
            // config={{
            //   plugins: [Essentials, Paragraph, Bold, Italic, Underline, Heading, Link, Table, TableToolbar],
            //   toolbar: ['bold', 'italic', 'underline', 'heading', '|', 'link', '|', 'numberedList', 'bulletedList', '|', 'undo', 'redo', '|', 'table'],
            // }}
            data="<p>Type article here...</p>"
            onChange={(event, editor) => {
              handleEditorChange(editor.getData());
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default TextArea;