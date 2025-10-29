import React, { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { ImCross } from "react-icons/im";
import JoditEditor from "jodit-react";
import { BackendUrl } from "../../../../assets/constant";
import axios from "axios";
import { toast } from "sonner";

const EditNews = ({ placeholder }) => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const location = useLocation();
  const editNewsData = location.state;
  const [title, settitle] = useState(editNewsData.title);
  const [slug, setslug] = useState(editNewsData.slug);
  const [subDescription, setsubDescription] = useState(
    editNewsData.subDescription
  );
  const [description, setdescription] = useState(editNewsData.description);
  const [image, setimage] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "News Description...",
      minHeight: 400,
      width: "100%",
      style: {
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        maxWidth: "100%",
      },
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_as_html",
      pasteHTMLActionList: ["insert_as_html"],
    }),
    [placeholder]
  );

  const valiDateNewsForm = () => {
    if (!title) {
      toast.error("Title is required");
      return false;
    }
    if (!subDescription) {
      toast.error("SubDescription is Required");
      return false;
    }
    if (!description) {
      toast.error("Description is Required");
      return false;
    }

    return true;
  };

   const handleSubmitEditedNews = async () => {
    const formData = new FormData();
    formData.append("_id", editNewsData._id);
    formData.append("title", title);
    formData.append("subDescription", subDescription);
    formData.append("description", description);
    if (image) {
      formData.append("news-image", image);
    }
    const res = await axios.post(`${BackendUrl}/admin/edit-news`, formData, {
      withCredentials: true,
    });
    if (res.status == 200) {
      toast.success("News Updated Successfully");
      navigate("/news", { state: res.data.news });
    }
  };

  return (
    <div className="w-full h-full relative flex items-center my-5 justify-center text-white">
      <Button
        onClick={() => navigate("/news")}
        className="text-white  absolute right-5 top-2.5"
      >
        <ImCross className="cursor-pointer text-2xl" />
      </Button>
      <div
        className={`w-full bg-gradient-to-br  shadow-2xl rounded-2xl p-8  space-y-6`}
      >
        <p className="text-3xl font-semibold text-center text-indigo-400">
          Edit News
        </p>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            value={title}
            name="title"
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Enter news title"
            className="w-full border border-gray-600 bg-gray-800 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          />
        </div>


        {/* Sub Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Sub Description
          </label>
          <input
            value={subDescription}
            type="text"
            name="subDescription"
            onChange={(e) => setsubDescription(e.target.value)}
            placeholder="Write the news sub description here..."
            className="w-full border border-gray-600 bg-gray-800 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-2">
            <JoditEditor
              value={description}
              className="text-gray-700"
              name="description"
              ref={editor}
              config={config}
              tabIndex={1}
              onBlur={(e) => setdescription(e)}
              onChange={(e) => setdescription(e)}
            />
          </div>
        </div>

        {/* Upload Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Upload Image
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            name="image"
            accept=".png,.jpg,.jpeg,.svg,.webp"
            className="w-full border cursor-pointer border-gray-600 bg-gray-800 rounded-lg p-2 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-all duration-300"
          />
        </div>

        {/* Button */}
        <div className="pt-4">
          <button
            onClick={() => {
              if (valiDateNewsForm()) {
                handleSubmitEditedNews();
              }
            }}
            type="button"
            className="w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-lg font-medium hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-600/20"
          >
            Update News
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
