import React, { useMemo, useRef, useState } from "react";
import AddBlog from "./components/AddBlog/AddBlog";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux";
import AllBlogs from "./components/AllBlogs/AllBlogs";
import {ImCross} from "react-icons/im"

const Blogs = () => {
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const [blogs, setblogs] = useState(allBlogs);
  const [searchBlog, setsearchBlog] = useState("");
  const [isAddBlog, setisAddBlog] = useState(false);
  // const filteredBlogs = blogs.filter((blog) => {
  //   return blog.title.toLowerCase().includes(searchBlog.toLowerCase());
  // });
  return (
    <div className="">
      <div className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white">Blogs</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Search With Title..."
              // value={search}
              onChange={(e) => setsearchBlog(e.target.value)}
              className="w-full pl-10 pr-3 py-2  text-white bg-[#272a2f] outline-none rounded-md"
            />
          </div>

          <Button
            onClick={() => setisAddBlog(true)}
            className="inline-flex cursor-pointer items-center hover:-translate-y-1.5 transition-all duration-500 justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            variant="outline"
          >
            <FiPlus /> Add New
          </Button>
        </div>
      </div>
      {isAddBlog ? (
        <div className="bg-[#1a1d21] backdrop:blur-2xl w-[90%] z-50  m-auto">
          
          <AddBlog setblogs={setblogs} setisAddBlog={setisAddBlog} />
        </div>
      ) : (
        <div className="">
          <AllBlogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default Blogs;
