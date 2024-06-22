import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import { getAuth } from "firebase/auth";
import { getCategories, postArticle, saveDraft } from "../config/article";
import AddButtons from "../components/Authorized/AddButtons";
import { useSelector } from "react-redux";
import { useModal } from "../context/ModalContext";
import { customModal } from "../utils/modalUtils";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function NewArticle() {
  const { showModal } = useModal();
  const userData = useSelector((state) => state.user);
  const [articleData, setArticleData] = useState({
    title: "",
    categories: [],
    description: "",
    content: "",
    author: {
      name: userData.fullName,
      email: userData.email,
      image: userData.photoURL,
    },
    userId: userData.userId,
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    setArticleData((prevData) => ({
      ...prevData,
      categories: selectedCategories
    }));
  }, [selectedCategories]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setArticleData((prevData) => ({
          ...prevData,
          coverImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories(prevState =>
      checked ? [...prevState, value] : prevState.filter(item => item !== value)
    );
  };

  const handleEditorChange = (key, value) => {
    setArticleData((prevData) => ({ ...prevData, [key]: value }));
  };

  const isValidArticle = (data) => {
    console.log(data)
    return (
      data.title &&
      data.categories &&
      data.description &&
      data.content &&
      data.coverImage &&
      data.author &&
      data.userId
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    if (!isValidArticle(articleData)) {
      console.error("All fields are required to publish an article.");
      return;
    }

    setIsLoading(true);

    const newArticle = {
      title: articleData.title,
      categories: articleData.categories,
      description: articleData.description,
      content: articleData.content,
      coverImage: articleData.coverImage,
      author: articleData.author,
      status: "published",
    }
console.log(newArticle)
    try {
      
      const response = await postArticle( newArticle, token);
      console.log(response)
      if (response) {
        customModal({
          showModal,
          title: "Article Published",
          text: "Your article has been published successfully.",
          icon: CheckIcon,
          iconBgColor: "bg-green-100",
          iconTextColor: "text-green-400",
          buttonBgColor: "bg-green-400",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error posting article:", error);
      customModal({
        showModal,
        title: "Error",
        text: "There was an error encountered in publishing your article.",
        icon: ExclamationCircleIcon,
        iconBgColor: "bg-red-100",
        iconTextColor: "text-red-400",
        buttonBgColor: "bg-red-400",
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    if (!articleData.title && !articleData.content) {
      console.error("Draft must have at least a title or content.");
      return;
    }

    setSavingDraft(true);

    try {
      const response = await saveDraft(
        { ...articleData, status: "draft" },
        token 
      );
      if (response) {
        customModal({
          showModal,
          title: "Draft Saved",
          text: "Your draft has been saved successfully.",
          icon: CheckIcon,
          iconBgColor: "bg-green-100",
          iconTextColor: "text-green-400",
          buttonBgColor: "bg-green-400",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setSavingDraft(false);
    }
  };

  return (
    <div className="flex-1 xl:overflow-y-auto mt-[4.5rem] md:mt-0">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold tracking-tight text-neutral-900">
            Write Article
          </h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={savingDraft}
              className="bg-transparent px-3 py-2 text-sm border-0 font-semibold text-neutral-400 hover:text-neutral-300"
            >
              {savingDraft ?<span className="text-green-400">Saving...</span>  : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-transparent px-3 py-2 text-sm border-0 font-semibold text-neutral-400 hover:text-green-400"
            >
              {isLoading ? <span className="text-green-400">Publishing...</span> : "Publish"}
            </button>
          </div>
        </div>
        <div className="mt-8">

          {selectedImage && (
            <div className="flex justify-start mb-4">
              <img
                src={selectedImage}
                alt="Article cover"
                className="max-w-sm max-h-52 rounded-md border border-gray-300"
              />
            </div>
          )}
          <AddButtons
            handleImageChange={handleImageChange}
            handleCheckboxChange={handleCheckboxChange}
            categories={categories}
            selectedCategories={selectedCategories}
          />
          <form className="w-full max-w-3xl mt-4">
            <div className="mt-2 flex items-center">
              <div className="w-full">
                <div className="flex w-full sm:w-full">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full flex-1 border-0 bg-transparent px-0 text-gray-900 font-semibold placeholder:text-gray-300 placeholder:text-2xl focus:ring-0 sm:text-2xl sm:leading-6"
                    placeholder="Enter your title here"
                    required
                    value={articleData.title}
                    onChange={(e) =>
                      handleEditorChange("title", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className=" flex items-center">
              <div className="w-full">
                <div className="flex w-full sm:w-full">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="block w-full flex-1 border-0 bg-transparent p-0 text-gray-500 placeholder:text-gray-300 focus:ring-0 sm:text-base sm:leading-6"
                    placeholder="Subtitle..."
                    required
                    maxLength="100"
                    value={articleData.description}
                    onChange={(e) =>
                      handleEditorChange("description", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="border border-neutral-300 rounded-lg mt-8">
              <CKEditor
                editor={BalloonEditor}
                data={articleData.content || "<p>Type article here...</p>"}
                onChange={(event, editor) => {
                  handleEditorChange("content", editor.getData());
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
