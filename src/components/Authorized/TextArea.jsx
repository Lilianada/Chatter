import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

function TextArea({ handleEditorChange, articleData }) {
  
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
                value={articleData.title}
                onChange={(e) => handleEditorChange({ ...articleData, title: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="mb-4 mt-2 flex items-center">
          <label
            htmlFor="description"
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
                value={articleData.description}
                onChange={(e) => handleEditorChange({ ...articleData, description: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="border border-neutral-300 rounded-lg">
          <CKEditor
            editor={BalloonEditor}
            data={articleData.content || "<p>Type article here...</p>"}
            onChange={(event, editor) => {
              handleEditorChange({ ...articleData, content: editor.getData() });
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default TextArea;
