import {
  BarChart3,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  Newspaper,
  Users,
} from "lucide-react";
import { ImCross } from "react-icons/im";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Link } from "react-router-dom";
import { FaMicroblog, FaRegNewspaper, FaUsers } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { setSideBar } from "../../redux/slices/SideBarSlice";
import { useDispatch, useSelector } from "react-redux";

export function AppSidebar({ trigerRef }) {
  return (
    <Sidebar className={"bg-[#212529] px-3 py-5  left-0 top-0"}>
      <ImCross
        onClick={() => {
          trigerRef.current.click();
        }}
        className="absolute sm:hidden cursor-pointer right-5 top-5 text-white text-xl"
      />

      <SidebarHeader className={"text-white text-start mb-2.5 text-3xl"}>
        Dashboard
      </SidebarHeader>
      <SidebarContent className={""}>
        <div>
          <Link
            to={"/"}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group"
          >
            <div className="flex items-center gap-3">
              <SiGoogleanalytics className="text-lg" />
              <span>Analytics</span>
            </div>
          </Link>
        </div>
        <div>
          <Link
            to={"/users"}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group"
          >
            <div className="flex items-center gap-3">
              <FaUsers className="text-lg" />
              <span>Users</span>
            </div>
          </Link>
        </div>
        <div>
          <Link
            to={"/blogs"}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group"
          >
            <div className="flex items-center gap-3">
              <FaMicroblog className="text-lg" />
              <span>Blogs</span>
            </div>
          </Link>
        </div>

        <Link to={"/admins"}>
          <button className="w-full flex items-center justify-between cursor-pointer px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group">
            <div className="flex items-center gap-3">
              <RiAdminFill className="text-lg" />
              <span>Admin</span>
            </div>
          </button>
        </Link>

        <Link to={"/meetings"}>
          <button className="w-full flex cursor-pointer items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group">
            <div className="flex items-center gap-3">
              <SlCalender className="text-lg" />
              <span>Meetings</span>
            </div>
          </button>
        </Link>

        <Link to={"/news"}>
          <button className="w-full flex cursor-pointer items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group">
            <div className="flex items-center gap-3">
              <FaRegNewspaper className="text-lg" />
              <span>News</span>
            </div>
          </button>
        </Link>

        <DropdownMenu className=" outline-none border-none hover:bg-slate-800">
          <DropdownMenuTrigger
            className="outline-none border-none hover:bg-slate-800 text-slate-300 hover:text-white"
            asChild
          >
            <SidebarMenuButton className={"outline-none"}>
              Check IPO Eligibility
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width] min-w-[200px]">
            <DropdownMenuItem className={"w-full"}>
              <Link to="/business-details">Business Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/financial-details"}>Financial Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
