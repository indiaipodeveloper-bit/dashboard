import React, { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Button } from "../../../../components/ui/button";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { BackendUrl } from "../../../../assets/constant";
import { toast } from "sonner";

const AddBlog = ({setblogs, setisAddBlog, placeholder }) => {
  const editor = useRef(null);
  const [title, settitle] = useState("");
  const [slug, setslug] = useState("");
  const [subDescription, setsubDescription] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Blog Description...",
      minHeight: 400,
      width: "100%",
      style: {
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        maxWidth: "100%",
      },
    }),
    [placeholder]
  );

  const handleAddBlog = async () => {
    try {
      const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("subDescription", subDescription);
    formData.append("description", description);
    formData.append("blog-image", image);
    const res = await axios.post(`${BackendUrl}/admin/add-blog`, formData, {
      withCredentials: true,
    });
  if(res.status == 200){
    toast.success("Blog Added Successfully")
    setblogs((prev)=>[...prev,res.data.blog])
    setisAddBlog(false)
  }    
    } catch (error) {
      toast.error(error.response.data)
    }
  };
  return (
    <div className="w-full h-full relative flex items-center my-5 justify-center text-white">
      <Button
        onClick={() => setisAddBlog(false)}
        className="text-white  absolute right-2.5 top-2.5"
      >
        <ImCross className="cursor-pointer text-2xl" />
      </Button>
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-700 space-y-6">
        <p className="text-3xl font-semibold text-center text-indigo-400">
          Add New Blog
        </p>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            name="title"
            onChange={(e) => {
              settitle(e.target.value);
              setslug(e.target.value.split(" ").join("-"));
            }}
            type="text"
            placeholder="Enter blog title"
            className="w-full border border-gray-600 bg-gray-800 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            onChange={(e) => setslug(e.target.value.split(" ").join("-"))}
            value={slug}
            placeholder="Enter slug (e.g., my-first-blog)"
            className="w-full border border-gray-600 bg-gray-800 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          />
        </div>

        {/* Sub Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Sub Description
          </label>
          <input
            type="text"
            name="subDescription"
            onChange={(e) => setsubDescription(e.target.value)}
            placeholder="Write the blog sub description here..."
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
            onClick={handleAddBlog}
            type="button"
            className="w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-lg font-medium hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-600/20"
          >
            Add Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
