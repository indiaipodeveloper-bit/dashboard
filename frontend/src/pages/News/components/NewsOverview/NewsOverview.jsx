import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BackendUrl } from "../../../../assets/constant";
const NewsOverview = () => {
  const location = useLocation();
  const news = location.state;
  return (
    <div className="bg-gray-50 relative min-h-screen py-10 px-4 md:px-8 lg:px-20">
      <Link
        to={"/news"}
        className="absolute left-5 top-2 cursor-pointer text-2xl"
      >
        <FaArrowLeft />
      </Link>
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-800 mb-2">{news.title}</p>
        </div>

        <div className="rounded-lg  mb-8">
          <img
            src={`${BackendUrl}/${news.image}`}
            alt={news.title}
            className="w-full  h-[300px]"
          />
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: news.description }}
          className="prose max-w-none text-gray-700"
        >
        </div>
      </div>
    </div>
  );
};

export default NewsOverview;
