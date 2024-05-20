import React, { useEffect, useState } from "react";
import Header from "../components/Authorized/Header";
import TextArea from "../components/Authorized/TextArea";
import UploadCoverImage from "../components/Authorized/UploadCoverImage";
import Footer from "../components/Unauthorized/Footer";
import SelectCategories from "../components/Authorized/SelectCategories";
import { getAuth } from "firebase/auth";
import { postArticle, getCategories } from "../config/article";

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
    <>
      <div className="mx-4 my-8 sm:mx-12 sm:my-12">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 p-4">
          New Article
        </h1>
        <UploadCoverImage  
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
        <SelectCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onChange={handleCategoryChange}
        />
        <TextArea
          handleEditorChange={handleEditorChange}
          apiKey={apiKey}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          // handleChange={handleChange}
        />
      </div>
    </>
  );
}
