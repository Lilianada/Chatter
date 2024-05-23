import React, { useEffect, useState } from "react";
import Header from "../components/Authorized/Header";
import TextArea from "../components/Authorized/TextArea";
import UploadCoverImage from "../components/Authorized/UploadCoverImage";
import Footer from "../components/Unauthorized/Footer";
import SelectCategories from "../components/Authorized/SelectCategories";
import { getAuth } from "firebase/auth";
import { postArticle, getCategories } from "../config/article";
import Spinner from "../components/Utils/Spinner";

export default function NewArticle() {
  const [articleData, setArticleData] = useState({
    title: "",
    category: "",
    content: "",
    coverImage: "",
    author: "",
  });
  const apiKey = process.env.REACT_APP_TINYMCE_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleImageChange = (imageURL) => {
    setSelectedImage(imageURL);
    setArticleData({ ...articleData, coverImage: imageURL }); // Update article data with the cover image URL
  };

  const handleEditorChange = (content) => {
    setArticleData({ ...articleData, content });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setArticleData({ ...articleData, category });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }
    setIsLoading(true);

    try {
      // Make sure to adjust your postArticle function to handle the cover image along with other article data
      const response = await postArticle(articleData, userId);
      console.log("Article posted successfully:", response);
      // Handle post-submission logic here (e.g., redirect to the article page)
    } catch (error) {
      console.error("Error posting article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 xl:overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className=" flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Compose Article
          </h1>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-transparent px-3 py-2 text-sm border border-neutral-300 font-semibold text-neutral-600 shadow-sm hover:border-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 w-40 flex justify-center"
          >
            {isLoading ? <Spinner /> : "Publish"}
          </button>
        </div>
        <UploadCoverImage
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
        {/* <SelectCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onChange={handleCategoryChange}
        /> */}
        <TextArea
          handleEditorChange={handleEditorChange}
          apiKey={apiKey}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          // handleChange={handleChange}
        />
      </div>
    </div>
  );
}
