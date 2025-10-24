import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { BackendUrl } from "../../../../assets/constant";

const BlogOverview = ({}) => {
  const location = useLocation();
  const blog = location.state;
  return (
    <div className="bg-gray-50 relative min-h-screen py-10 px-4 md:px-8 lg:px-20">
      <Link
        to={"/blogs"}
        className="absolute left-5 top-2 cursor-pointer text-2xl"
      >
        <FaArrowLeft />
      </Link>
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</p>
        </div>

        <div className="rounded-lg  mb-8">
          <img
            src={`${BackendUrl}/${blog.image}`}
            alt={blog.title}
            className="w-full  h-[300px]"
          />
        </div>

        {/* Blog Content */}
        <div
          dangerouslySetInnerHTML={{ __html: blog.description }}
          className="prose max-w-none text-gray-700"
        >
          {/* <p>{blog.description}</p> */}
        </div>
      </div>
    </div>
  );
};

export default BlogOverview;
