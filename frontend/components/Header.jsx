import React, { useState } from "react";
import axios from "axios";
import { SidebarTrigger } from "../src/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../src/components/ui/dropdown-menu";
import { Button } from "../src/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BackendUrl } from "../src/assets/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../src/redux/slices/Authslice";
import { Avatar, AvatarImage } from "../src/components/ui/avatar";

const Header = ({ trigerRef }) => {
  const userInfo = useSelector((state) => state.auth.userinfo);
const exuser = {
  name:""
}
const user = userInfo ? userInfo : exuser

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(res.data);
      dispatch(setUserInfo(null));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="h-[60px] px-5 py-2.5 mb-2.5 shadow-white  bg-[#272a2f] text-white flex justify-between items-center w-full">
        <SidebarTrigger
          ref={trigerRef}
          className={"ml-5 hover:scale-[1.2] h-full cursor-pointer  z-50"}
        />

          <div
            onClick={() => {
              navigate("/profile");
            }}
            className="flex justify-center items-center gap-x-5"
          >
            <div className="relative flex gap-2.5 cursor-pointer hover:bg-gray-500 transition duration-500 rounded-md PX items-center justify-center">
              <Avatar className="rounded-full w-10 h-10 border-[1px] overflow-hidden">
                {user.image !== null ? (
                  <AvatarImage
                    src={`${BackendUrl}/${user.image}`}
                    alt="profile imgage"
                    className="object-cover bg-black w-full h-full"
                  />
                ) : (
                  <div
                    className={`uppercase  text-xl text-white flex items-center text-center m-auto justify-center rounded-full`}
                  >
                    {user.name ? user.name.split("").shift() : user.email.split("").shift()}
                  </div>
                )}
              </Avatar>
              <p className="font-bold text-gray-400">{user.name}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer " asChild>
                <Button variant="outline">
                  <BsThreeDotsVertical className="text-xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-transparent p-2.5 outline-none flex justify-end border-none">
                <Button
                  className={
                    "cursor-pointer bg-white rounded-lg py-2 px-2.5 font-bold"
                  }
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </div>
    </>
  );
};

export default Header;
