import React, { useEffect, useState } from 'react';
import Header from '../components/Authorized/Header';
import TextArea from '../components/Authorized/TextArea';
import UploadCoverImage from '../components/Authorized/UploadCoverImage';
import Footer from '../components/Unauthorized/Footer';
import SelectCategories from '../components/Authorized/SelectCategories';
import { getAuth } from 'firebase/auth';
import { postArticle, getCategories } from '../config/article';


export default function NewArticle() {
  const [articleData, setArticleData] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_TINYMCE_API_KEY;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await getCategories();
      console.log(response);
      setCategories(response);
      // Handle success (e.g., showing success message or redirecting)
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Handle error (e.g., showing error message)
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const handleEditorChange = (content, editor) => {
    setArticleData({ ...articleData, content });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await postArticle({ ...articleData }, userId);
      console.log(response);
      // Handle success (e.g., showing success message or redirecting)
    } catch (error) {
      console.error("Error posting article:", error);
      // Handle error (e.g., showing error message)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header/>
      <div className="mx-4 my-8 sm:mx-12 sm:my-12">
        <UploadCoverImage  
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
        <SelectCategories 
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
       <TextArea 
        handleEditorChange={handleEditorChange}
        apiKey={apiKey}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        />
      </div>
      <Footer/>
    </>
  )
}
