import React from "react";
import { SidebarTrigger } from "../src/components/ui/sidebar";

const Header = () => {
  return (
    <div className="bg-red-400 h-[50px] mb-5 flex justify-between items-center w-full">
      <SidebarTrigger
        className={
          "ml-5 hover:scale-[1.2] cursor-pointer  z-50"
        }
      />
    </div>
  );
};

export default Header;
