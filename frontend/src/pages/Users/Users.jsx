import React, { useRef, useState } from "react";
import UserTable from "./components/Usertable/UserTable";
import SearchUser from "./components/SearchUser/SearchUser";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { MdEdit } from "react-icons/md";
import { BackendUrl } from "../../assets/constant";
import axios from "axios";
import { toast } from "sonner";
import UserAvatar from "./components/Usertable/components/UserAvatar/UserAvatar";
import DeleteUserButton from "./components/Usertable/components/DeleteUserButton/DeleteUserButton";
import EditUser from "./components/Usertable/components/EditUser/EditUser";
import { FiSearch } from "react-icons/fi";
import AddNewUser from "./components/AddNewUser/AddNewUser";

const Users = () => {
  const allusers = useSelector((state) => state.users.allUsers);
  const [users, setUsers] = useState(allusers);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const columns = [
    {
      accessorKey: "serial",
      header: "S.No",
      cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="h-full w-full">
            <UserAvatar user={user} />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="text-left capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-left lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("gender")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-left font-medium">
            {user.isAdmin ? "Admin" : "User"}
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Switch
            checked={user.isActive}
            className={`${
              user.isActive ? "bg-green-500" : "bg-red-400"
            } transition-all duration-300 cursor-pointer rounded-full`}
            onCheckedChange={(newStatus) =>
              handleEnableDisableUser(user, newStatus)
            }
          />
        );
      },
    },

    {
      accessorKey: "edit",
      header: "Edit",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-left font-medium">
            <EditUser user={user} setUsers={setUsers} />
          </div>
        );
      },
    },
    {
      accessorKey: "delete",
      header: "Delete",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-left font-medium ">
            <DeleteUserButton setUsers={setUsers} user={user} />
          </div>
        );
      },
    },
  ];

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

  const handleEnableDisableUser = async (user, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === user._id ? { ...u, isActive: newStatus } : u))
    );

    try {
      const res = await axios.post(
        `${BackendUrl}/admin/change-user-status`,
        { id: user._id, isActive: newStatus },
        { withCredentials: true }
      );
      if (res.status == 200) {
        toast.success(
          `User ${res.data.user.isActive ? "Enabled" : "Disabled"} Successfully`
        );
      }
    } catch (err) {
      toast.error(err.response.data);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isActive: !newStatus } : u
        )
      );
    }
  };

  return (
    <div className="text-white  w-full">
      <div className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-2xl font-semibold text-white">Users</p>
        <div className="flex  flex-col sm:flex-row sm:items-center  gap-3 w-full sm:w-auto">
          <div className="relative bg-blue-400 w-full sm:w-64">
            <SearchUser setUsers={setUsers} columns={columns} users={users} />
          </div>
          <AddNewUser setUsers={setUsers} />
        </div>
      </div>
      <div className="my-2.5">
        <UserTable table={table} columns={columns} />
      </div>
    </div>
  );
};

export default Users;
