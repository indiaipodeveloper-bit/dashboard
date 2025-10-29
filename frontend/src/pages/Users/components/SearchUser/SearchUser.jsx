import React, { useRef, useState } from "react";
import { Input } from "../../../../components/ui/input";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiSearch } from "react-icons/fi";

const SearchUser = ({ setsearch }) => {


  return (
    <div className="flex justify-between items-center ">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />

      <Input
        placeholder="Filter emails..."
        onChange={(e) => setsearch(e.target.value)}
        className="w-full pl-10 pr-3 py-2  text-white bg-[#272a2f] outline-none rounded-md"
      />
    </div>
  );
};

export default SearchUser;
