import React, { useRef, useState } from "react";
import { Input } from "../../../../components/ui/input";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AddNewUser from "../AddNewUser/AddNewUser";
import { FiSearch } from "react-icons/fi";

const SearchUser = ({ setUsers, users, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex justify-between items-center ">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />

      <Input
        placeholder="Filter emails..."
        value={table.getColumn("email")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="w-full pl-10 pr-3 py-2  text-white bg-[#272a2f] outline-none rounded-md"
      />
    </div>
  );
};

export default SearchUser;
