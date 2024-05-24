import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import { getAuth } from "firebase/auth";
import { getCategories, postArticle, saveDraft } from "../config/article";
import AddButtons from "../components/Authorized/AddButtons";
import SelectCategories from "../components/Authorized/SelectCategories";
import { useSelector } from "react-redux";
import { useModal } from "../context/ModalContext";
import { customModal } from "../utils/modalUtils";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function NewArticle() {
  const { showModal } = useModal();
  const userData = useSelector((state) => state.user.userId);
  const [articleData, setArticleData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    coverImage: "",
    author: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleEditorChange = (key, value) => {
    setArticleData((prevData) => ({ ...prevData, [key]: value }));
  };

  const isValidArticle = (data) => {
    return (
      data.title &&
      data.category &&
      data.description &&
      data.content &&
      data.coverImage &&
      data.author
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }

    if (!isValidArticle(articleData)) {
      console.error("All fields are required to publish an article.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postArticle(
        { ...articleData, status: "published" },
        userId
      );
      if (response){
      customModal({
        showModal,
        title: "Article Published",
        text: 'Your article has been published successfully.',
        icon: CheckIcon,
        iconBgColor: 'bg-green-100',
        iconTextColor: 'text-green-400',
        buttonBgColor: 'bg-green-400',
        showConfirmButton: false,
        timer: 3000,
      })
    }
    } catch (error) {
      console.error("Error posting article:", error);
      customModal({
        showModal,
        title: "Error",
        text: 'There was an error encountered in publishing your article.',
        icon: ExclamationCircleIcon,
        iconBgColor: 'bg-red-100',
        iconTextColor: 'text-red-400',
        buttonBgColor: 'bg-red-400',
        showConfirmButton: false,
        timer: 3000,
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
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
        userId
      );
      if (response){
      customModal({
        showModal,
        title: "Draft Saved",
        text: 'Your draft has been saved successfully.',
        icon: CheckIcon,
        iconBgColor: 'bg-green-100',
        iconTextColor: 'text-green-400',
        buttonBgColor: 'bg-green-400',
        showConfirmButton: false,
        timer: 3000,
      })
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
              {savingDraft ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-transparent px-3 py-2 text-sm border-0 font-semibold text-neutral-400 hover:text-green-400"
            >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <form className="w-full max-w-3xl">
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

            <div className="flex justify-between items-center mt-8">
              <AddButtons
                selectedImage={selectedImage}
                handleImageChange={handleImageChange}
                categories={categories}
                setCategories={setCategories}
                userData={userData}
              />
              {/* <SelectCategories
                categories={categories}
                selectedCategory={articleData.category}
                onChange={handleCategoryChange}
                userData={userData}
              /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
