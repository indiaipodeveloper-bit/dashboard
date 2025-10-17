import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import { AppSidebar } from "./components/ui/app-sidebar";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import News from "./pages/News";
import Meetings from "./pages/Meetings";
import Blogs from "./pages/Blogs";
import FinancialDetails from "./pages/FinancialDetails";
import BusinessDetails from "./pages/BusinessDetails";
import Admins from "./pages/Admins";
import Header from "../components/Header";
import axios from "axios";
import { BackendUrl } from "./assets/constant";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/slices/Authslice";
import Profile from "./pages/Profile";

function App() {
  const trigerRef = useRef(null);
  const location = useLocation();
  const condition =
    location.pathname !== "/login" && location.pathname !== "/profile";
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userinfo);
  const getuserDetails = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/admin/get-adminInfo`, {
        withCredentials: true,
      });
      if (res.status == 200) {
        dispatch(setUserInfo(res.data.userdata));
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const ProtectPrivateRoute = ({ children }) => {
    const userInfo = useSelector((state) => state.auth.userinfo);
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to={"/login"} />;
  };
  const ProtectAuthRoute = ({ children }) => {
    const userInfo = useSelector((state) => state.auth.userinfo);
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to={"/"} /> : children;
  };

  useEffect(() => {
    if (!userInfo) {
      getuserDetails();
    }
  }, []);

  return (
    <>
      <div className="w-screen  bg-[#1a1d21] flex">
        {condition && <AppSidebar trigerRef={trigerRef} className="min-w-5" />}
        <div className="flex flex-col w-full">
          {condition && <Header trigerRef={trigerRef} className="min-w-5" />}
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectAuthRoute>
                  <Login />
                </ProtectAuthRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectPrivateRoute>
                  <Analytics />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectPrivateRoute>
                  <Users />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/news"
              element={
                <ProtectPrivateRoute>
                  <News />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/meetings"
              element={
                <ProtectPrivateRoute>
                  <Meetings />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/blogs"
              element={
                <ProtectPrivateRoute>
                  <Blogs />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/financial-details"
              element={
                <ProtectPrivateRoute>
                  <FinancialDetails />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/business-details"
              element={
                <ProtectPrivateRoute>
                  <BusinessDetails />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/admins"
              element={
                <ProtectPrivateRoute>
                  <Admins />
                </ProtectPrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectPrivateRoute>
                  <Profile />
                </ProtectPrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
