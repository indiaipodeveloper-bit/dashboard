import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "../../../../components/ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const AllBlogs = ({ blogs }) => {
  const [selectedBlog, setselectedBlog] = useState("");

  return (
    <>
      {blogs.length < 1 ? (
        <div className="text-3xl text-white font-bold text-center relative top-44">No Blogs!</div>
      ) : (
        <div className="flex gap-x-10 gap-y-10 mt-5 mx-auto p-5 items-start justify-center flex-wrap">
          {blogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className="flex flex-col w-full md:flex-row items-center md:items-start gap-5
          bg-gradient-to-br from-white/10 via-purple-500/5 to-purple-700/10
          backdrop-blur-2xl border border-white/10 rounded-2xl shadow-lg
          hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-500 p-4 md:p-5"
              >
                {/* Blog Image */}
                <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-md">
                  {blog.image ? (
                    <img
                      src={`${BackendUrl}/${blog.image}`}
                      alt={blog.title}
                      className="object-cover w-full h-5 md:h-44 rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-56 bg-white/10 text-white text-4xl flex items-center justify-center font-semibold rounded-xl">
                      {blog.title.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Blog Info */}
                <div className="flex flex-col gap-3 justify-between h-full text-center md:text-left w-full md:w-2/3">
                  <p className="text-xl md:text-2xl font-semibold text-white line-clamp-2">
                    {blog.title}
                  </p>
                  <p className="text-sm md:text-base text-white/70 line-clamp-3">
                    {blog.description}
                  </p>
                  <div className="flex gap-x-3 flex-wrap sm:justify-start justify-center text-white/60 items-center gap-1">
                    <div className="flex gap-x-1 flex-wrap justify-center items-center">
                      <FaRegCalendarAlt className="text-purple-400" />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-x-2.5">
                      <Button
                        onClick={() => setselectedBlog(blog)}
                        className="cursor-pointer  transition-all duration-500 justify-center gap-2 text-green-400   "
                        variant="outline"
                      >
                        <MdEdit className="text-xl cursor-pointer  " />
                      </Button>

                      <Button onClick={() => setselectedBlog(blog)}>
                        <MdDelete className="mr-1 text-xl text-red-400 cursor-pointer" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between  items-center text-xs md:text-sm text-white/60 mt-2">
                    <Link
                      state={blog}
                      className="flex absolute right-5 bottom-5 items-center gap-1 text-purple-300 hover:text-purple-400 transition-colors duration-300"
                      to={`/blogs/${blog.slug}`}
                    >
                      <FaLink /> Read More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllBlogs;
