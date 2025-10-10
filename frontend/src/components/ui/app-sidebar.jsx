import {
  BarChart3,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  Newspaper,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "./sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Link } from "react-router-dom";
import {FaUsers} from "react-icons/fa"

export function AppSidebar() {
  return (
    <Sidebar className={"bg-[#151529]"}>
      <SidebarHeader className={"text-white text-center text-3xl"}>
        Dashboard
      </SidebarHeader>
      <SidebarContent className={""}>
        <div>
          <Link to={"/users"} className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group">
            <div className="flex items-center gap-3">
              <FaUsers className="text-2xl" />
              <span>Users</span>
            </div>
          </Link>

        </div>


        <Link to={"/admins"}>
          <button
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group"
          >
            <div className="flex items-center gap-3">
              <BarChart3 size={18} />
              <span>Admin</span>
            </div>
          </button>
        </Link>

        <Link>
          <button
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Calendar size={18} />
              <span>Meetings</span>
            </div>
          </button>
        </Link>

        <Link to={"/news"}>
          <button
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Newspaper size={18} />
              <span>News</span>
            </div>
          </button>
        </Link>

        <DropdownMenu className=" outline-none border-none hover:bg-slate-800">
          <DropdownMenuTrigger className="outline-none border-none hover:bg-slate-800 text-slate-300 hover:text-white  bg-transparent" asChild>
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
