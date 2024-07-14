import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import { getAuth } from "firebase/auth";
import { getAllCategories } from "../config/categories";
import AddButtons from "../components/Authorized/AddButtons";
import { useSelector } from "react-redux";
import { useModal } from "../context/ModalContext";
import { customModal } from "../utils/modalUtils";
import {
  CheckIcon,
  ExclamationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { postArticle, saveDraft } from "../config/article";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useUserContext } from "../context/UserContext";

export default function NewArticle() {
  const { showModal } = useModal();
  const { user } = useUserContext();
  const [articleData, setArticleData] = useState({
    title: "",
    categories: [],
    description: "",
    content: "",
    author: {
      name: '',
      email: '',
      image: '',
    },
    userId: '',
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setArticleData((prevData) => ({
      ...prevData,
      categories: selectedCategories,
    }));
  }, [selectedCategories]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setSelectedImage(fileReader.result);
      setArticleData(prevState => ({
            ...prevState,
            coverImage: file, 
        }));
    };
    fileReader.readAsDataURL(file);
    }
    
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  const handleEditorChange = (key, value) => {
    setArticleData((prevData) => ({ ...prevData, [key]: value }));
  };

  const isValidArticle = (data) => {
    console.log(data);
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
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }
    
    setIsLoading(true);

    const newArticle = {
      title: articleData.title,
      categories: articleData.categories,
      description: articleData.description,
      content: articleData.content,
      coverImage: articleData.coverImage,
      author: {
        name: user.fullName,
        email: user.email,
        image: user.profilePic,
      },
      status: "published",
      userId: user.userId
    };
    
        if (!isValidArticle(newArticle)) {
          console.error("All fields are required to publish an article.");
          return;
        }

    try {
      const response = await postArticle(newArticle, token);
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

  const handleDeleteCategories = (e) => {
    e.preventDefault();
    if (selectedCategories.length > 0) {
      setSelectedCategories([]);
    }
  };

  const deleteCategory = (e, category) => {
    e.preventDefault();
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setSelectedImage(null);
    setArticleData((prevData) => ({ ...prevData, coverImage: null }));
  }

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
              disabled={savingDraft || isLoading}
              className="bg-transparent px-3 py-2 text-sm border-0 font-semibold text-neutral-400 hover:text-neutral-300"
            >
              {savingDraft ? (
                <span className="text-green-400">Saving...</span>
              ) : (
                "Save draft"
              )}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || savingDraft}
              className="bg-yellow-600 px-2 py-0 leading-[.5rem] text-[14px] border-0 rounded-xl font-normal text-neutral-600 hover:bg-yellow-500 "
            >
              {isLoading ? <span>Publishing...</span> : "Publish"}
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
            selectedCategories={selectedCategories}
            handleDeleteImage={handleDeleteImage}
            selectedImage={selectedImage}
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

            <div className="mt-2 flex items-center">
              <div className="w-full">
                <div className="flex w-full flex-wrap sm:w-full gap-2">
                  {selectedCategories.map((category) => (
                    <span
                    key={category}
                    className="m-1 inline-flex items-center capitalize rounded-full border border-gray-200 bg-gray-100 py-1 px-1.5 text-xs font-medium text-gray-900"
                  >
                    {category}
                    <button
                      type="button"
                      className="ml-1 inline-flex flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={(e) => deleteCategory(e, category)}
                    >
                      <XMarkIcon
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                  ))}
                  {selectedCategories.length > 0 && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => handleDeleteCategories(e)}
                        className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200"
                      >
                        <TrashIcon
                          className="h-3 w-3 text-gray-500"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  )}
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
