import React, { useState } from "react";
import TextArea from "../components/Authorized/TextArea";
import { getAuth } from "firebase/auth";
import { postArticle } from "../config/article";
import Spinner from "../components/Utils/Spinner";
import AddButtons from "../components/Authorized/UploadCoverImage";

export default function NewArticle() {
  const [articleData, setArticleData] = useState({
    title: '',
    category: '',
    content: '',
    coverImage: '',
    author: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setArticleData({ ...articleData, coverImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (content) => {
    setArticleData({ ...articleData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await postArticle(articleData, userId);
      console.log('Article posted successfully:', response);
    } catch (error) {
      console.error('Error posting article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }
    setSaveDraft(true);

    try {
      const response = await postDraft(articleData, userId);
      console.log('Article posted successfully:', response);
    } catch (error) {
      console.error('Error posting article:', error);
    } finally {
      setSaveDraft(false);
    }
  };

  return (
    <div className="flex-1 xl:overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Compose Article
          </h1>
          <div className="flex gap-2">
            <button
              type="submit"
              onClick={handleSaveDraft}
              disabled={saveDraft}
              className="bg-transparent px-3 py-2 text-sm border-0  font-semibold text-neutral-600 hover:text-neutral-400"
            >
              {saveDraft ? 'Saving...' : 'Save draft'}
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-transparent px-3 py-2 text-sm border-0  font-semibold text-neutral-600 hover:text-green-400"
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>

          </div>
        </div>
        <AddButtons selectedImage={selectedImage} handleImageChange={handleImageChange} />
        <TextArea handleEditorChange={handleEditorChange} isLoading={isLoading} />
      </div>
    </div>
  );
}
