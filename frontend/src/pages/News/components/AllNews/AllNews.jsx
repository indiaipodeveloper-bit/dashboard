import React, { useEffect, useState } from "react";
import { BackendUrl } from "../../../../assets/constant";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import DeleteNews from "../DeleteNews/DeleteNews";

const AllNews = ({ filteredNews, setallNews }) => {
  const truncateHTML = (html, limit = 150) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  const location = useLocation();
  const editednews = location.state;

  useEffect(() => {
    if (editednews) {
      setallNews((prev) =>
        prev.map((e) => (e._id === editednews._id ? editednews : e))
      );
    }
  }, [editednews]);
  return (
    <>
      {filteredNews.length < 1 ? (
        <div className="text-3xl text-white font-bold text-center relative top-44">
          No News!
        </div>
      ) : (
        <div className="flex gap-x-10 gap-y-10 mt-5 overflow-y-auto mx-auto p-5 items-start justify-center flex-wrap">
          {filteredNews.map((news) => {
            return (
              <div
                key={news._id}
                className="flex flex-col w-full md:flex-row items-center md:items-start gap-5
  bg-gradient-to-br from-blue-500/10 via-pink-500/10 to-indigo-700/20
  backdrop-blur-2xl border border-white/10 rounded-2xl shadow-lg
  hover:shadow-pink-500/30 hover:-translate-y-1 transition-all duration-500 p-4 md:p-5"
              >
                {/* news Image */}
                <div className="w-full h-56 md:w-1/3 rounded-xl overflow-hidden shadow-md">
                  {news.image ? (
                    <img
                      src={`${BackendUrl}/${news.image}`}
                      alt={news.title}
                      className="w-full h-full rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-56 bg-white/10 text-white text-4xl flex items-center justify-center font-semibold rounded-xl">
                      {news.title.charAt(0)}
                    </div>
                  )}
                </div>

                {/* news Info */}
                <div className="flex flex-col gap-3 justify-between h-full text-center md:text-left w-full md:w-2/3">
                  <p className="text-xl md:text-2xl font-semibold text-white line-clamp-2">
                    {news.title}
                  </p>
                  <p className="text-sm md:text-base text-white/70 line-clamp-3">
                    {news.subDescription}
                  </p>
                  <div className="flex gap-x-3 flex-wrap sm:justify-start justify-center text-white/60 items-center gap-1">
                    <div className="flex gap-x-1 flex-wrap justify-center items-center">
                      <FaRegCalendarAlt className="text-purple-400" />
                      <span>
                        {new Date(news.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-x-2.5">
                      <Link
                        to={`/news/edit-news/${news.title}`}
                        state={news}
                        className="cursor-pointer  transition-all duration-500 justify-center gap-2 text-green-400   "
                        variant="outline"
                      >
                        <MdEdit className="text-xl cursor-pointer  " />
                      </Link>

                      <DeleteNews setnews={setallNews} news={news} />
                    </div>
                    <br />{" "}
                    <div
                      className="text-white text-sm my-2.5"
                      dangerouslySetInnerHTML={{
                        __html: truncateHTML(news.description, 150),
                      }}
                    />
                  </div>

                  <div className="flex justify-between  items-center text-xs md:text-sm text-white/60 mt-2">
                    <Link
                      state={news}
                      className="flex absolute right-5 bottom-5 items-center gap-1 text-purple-300 hover:text-purple-400 transition-colors duration-300"
                      to={`/news/${news.title}`}
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

export default AllNews;
