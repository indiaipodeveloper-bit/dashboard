import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Briefcase,
  DollarSign,
  Calendar,
  TrendingUp,
  Bell,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdmins } from "../../redux/slices/Admins_Slice";
import axios from "axios";
import { BackendUrl } from "../../assets/constant";
import { setAllBlogs } from "../../redux/slices/BlogsSlice";
import { setAllBusinessDetails } from "../../redux/slices/BusinessDetailsSlice";
import { setAllFinancialDetails } from "../../redux/slices/FinancialDetailsSlice";
import { setAllNews } from "../../redux/slices/NewsSlice";
import { toast } from "sonner";
import { setAllMeetings } from "../../redux/slices/MeetingsSlice";
import { setAllUsers } from "../../redux/slices/UserSlice";
import CardItem from "./components/CartItem";
const Analytics = () => {
  const allAdmins = useSelector((state) => state.admins.AllAdmins);
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const allBusinessDetails = useSelector(
    (state) => state.businessDetails.allBusinessDetails
  );
  const allFinancialDetails = useSelector(
    (state) => state.financialDetails.allFinancialDetails
  );

  const allMeetings = useSelector((state) => state.meetings.allMeetings);

  const allNews = useSelector((state) => state.news.allNews);
  const allUsers = useSelector((state) => state.users.allUsers);

  const dispatch = useDispatch();
  const [admins, setAdmins] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [businesses, setBusinesses] = useState(0);
  const [financial, setFinancial] = useState(0);
  const [meetings, setMeetings] = useState(0);
  const [users, setUsers] = useState(0);
  const [news, setNews] = useState(0);

  useEffect(() => {
    const getAllAdmin = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/admin/all-admins`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          dispatch(setAllAdmins(res.data.admins));
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    const getAllBlogs = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/admin/all-blogs`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          dispatch(setAllBlogs(res.data.allBlogs));
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    const getAllBusinessDetails = async () => {
      try {
        const res = await axios.get(
          `${BackendUrl}/admin/all-business-details`,
          { withCredentials: true }
        );
        if (res.status == 200) {
          dispatch(setAllBusinessDetails(res.data.AllBusinessDetails));
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    const getAllFinancialDetails = async () => {
      try {
        const res = await axios.get(
          `${BackendUrl}/admin/all-financial-details`,
          { withCredentials: true }
        );
        if (res.status == 200) {
          dispatch(setAllFinancialDetails(res.data.allFinancials));
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    const getAllMeetings = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/admin/all-meetings`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          dispatch(setAllMeetings(res.data.allMeetings));
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/admin/all-users`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          dispatch(setAllUsers(res.data.AllUsers));
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    const getAllNews = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/admin/all-news`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          dispatch(setAllNews(res.data.allNews));
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    getAllAdmin();
    getAllBlogs();
    getAllBusinessDetails();
    getAllFinancialDetails();
    getAllMeetings();
    getAllUsers();
    getAllNews();
  }, []);

  useEffect(() => {
    const animateCounter = (setter, target, duration = 2000) => {
      let current = 0;
      const increment = target / (duration / 30);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 30);
    };
    animateCounter(setAdmins, allAdmins.length);
    animateCounter(setBlogs, allBlogs.length);
    animateCounter(setBusinesses, allBusinessDetails.length);
    animateCounter(setFinancial, allFinancialDetails.length);
    animateCounter(setMeetings, allMeetings.length);
    animateCounter(setUsers, allUsers.length);
    animateCounter(setNews, allNews.length);
  }, [
    allAdmins,
    allBlogs,
    allBusinessDetails,
    allFinancialDetails,
    allNews,
    allUsers,
    allMeetings,
  ]);

  

  return (
    <div className="px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 mt-2">
            Welcome to your analytics overview
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> */}
        <div className="flex flex-wrap justify-between items-center gap-6 mb-8">
          <CardItem
            icon={Users}
            title="Admins"
            value={`${admins} Except You`}
            change={
              allAdmins.filter(
                (e) =>
                  new Date(e.createdAt).toLocaleDateString().slice(0, 2) ==
                  new Date(Date.now()).toLocaleDateString().slice(0, 2)
              ).length
            }
            isPositive={true}
            bgColor="bg-blue-600"
          />
          <CardItem
            icon={BookOpen}
            title="Blogs"
            value={blogs}
            change={
              allBlogs.filter(
                (e) =>
                  new Date(e.createdAt).toLocaleDateString().slice(0, 2) ==
                  new Date(Date.now()).toLocaleDateString().slice(0, 2)
              ).length
            }
            isPositive={true}
            bgColor="bg-purple-600"
          />
          <CardItem
            icon={Briefcase}
            title="Business Details"
            value={businesses}
            change={
              allBusinessDetails.filter(
                (e) =>
                  new Date(e.createdAt).toLocaleDateString().slice(0, 2) ==
                  new Date(Date.now()).toLocaleDateString().slice(0, 2)
              ).length
            }
            isPositive={true}
            bgColor="bg-indigo-600"
          />
          <CardItem
            icon={DollarSign}
            title="Financial Details"
            value={financial}
            change={
              allFinancialDetails.filter(
                (e) =>
                  new Date(e.createdAt).toLocaleDateString().slice(0, 2) ==
                  new Date(Date.now()).toLocaleDateString().slice(0, 2)
              ).length
            }
            isPositive={true}
            bgColor="bg-emerald-600"
          />

          <CardItem
            icon={Calendar}
            title="Meetings"
            value={meetings}
            change={
              allMeetings.filter(
                (e) =>
                  new Date(e.createdAt).toLocaleDateString().slice(0, 2) ==
                  new Date(Date.now()).toLocaleDateString().slice(0, 2)
              ).length
            }
            isPositive={true}
            bgColor="bg-orange-600"
          />
          <CardItem
            icon={Users}
            title="Users"
            value={users}
            change={
              allUsers.filter(
                (e) =>
                  new Date(e.createdAt).toLocaleDateString().slice(0, 2) ==
                  new Date(Date.now()).toLocaleDateString().slice(0, 2)
              ).length
            }
            isPositive={true}
            bgColor="bg-pink-600"
          />
          <CardItem
            icon={Bell}
            title="News"
            value={news}
            change={
              allNews.filter(
                (e) =>
                  new Date(e.createdAt).toLocaleDateString().slice(0, 2) ==
                  new Date(Date.now()).toLocaleDateString().slice(0, 2)
              ).length
            }
            isPositive={false}
            bgColor="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
