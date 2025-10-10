import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarTrigger,
//   useSidebar,
// } from "../components/ui/sidebar";
import App from "./App";
import { AppSidebar } from "./components/ui/app-sidebar";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
    <div className="w-screen flex">

      <AppSidebar className="min-w-5" />
      <div className="flex flex-col w-full">
        {/* <Header /> */}
        <App />
      </div>
    </div>
    </>
  );
};

export default Layout;
