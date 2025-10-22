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

const Users = () => {
  const allusers = useSelector((state) => state.users.allUsers);
  const [users, setUsers] = useState(allusers);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedUser, setselectedUser] = useState("");
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
            <Button
              onClick={() => {
                setselectedUser(user);
                console.log(selectedUser);
              }}
            >
              <MdEdit className="text-xl cursor-pointer" />
            </Button>
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
    <div className="text-white px-5 w-full">
      <SearchUser setUsers={setUsers} columns={columns} users={users} />
      <UserTable table={table} columns={columns} />
    </div>
  );
};

export default Users;
