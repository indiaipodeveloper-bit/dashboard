import React, { useRef, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { BackendUrl } from "../../assets/constant";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import AllNews from "./components/AllNews/AllNews";
import AddNews from "./components/AddNews/AddNews";

const News = () => {
  const news = useSelector((state) => state.news.allNews);
  const [allNews, setallNews] = useState(news);
  const [searchNews, setsearchNews] = useState("");
  const [isAddNews, setisAddNews] = useState(false);
  const filteredNews = allNews.filter((blog) => {
    return blog.title.toLowerCase().includes(searchNews.toLowerCase());
  });
  return (
    <div className="">
      <div className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white">News</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Search With Title..."
              className="w-full pl-10 pr-3 py-2  text-white bg-[#272a2f] outline-none rounded-md"
              onChange={(e) => setsearchNews(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setisAddNews(true)}
            className="inline-flex cursor-pointer items-center hover:-translate-y-1.5 transition-all duration-500 justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            variant="outline"
          >
            <FiPlus /> Add New
          </Button>
        </div>
      </div>
      {isAddNews ? (
        <div className="bg-[#1a1d21] backdrop:blur-2xl w-[90%] z-50  m-auto">
          <AddNews setallNews={setallNews} setisAddNews={setisAddNews} />
        </div>
      ) : (
        <div className="overflow-y-scroll hide-scroll max-h-[700px] ">
          <AllNews filteredNews={filteredNews} setallNews={setallNews} />
        </div>
      )}
    </div>
  );
};

export default News;
