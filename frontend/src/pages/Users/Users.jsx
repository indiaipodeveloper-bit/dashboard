import React, { useRef, useState } from "react";
import UserTable from "./components/UserTable";
import SearchUser from "./components/SearchUser";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { BackendUrl } from "../../assets/constant";
import axios from "axios";
import { toast } from "sonner";

const Users = () => {
  const allusers = useSelector((state) => state.users.allUsers);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedUser, setselectedUser] = useState("");
  const [users, setUsers] = useState(allusers);
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
            <Avatar className="rounded-full w-10 h-10 border-[1px]">
              {user.image ? (
                <AvatarImage
                  src={`${BackendUrl}/${user.image}`}
                  alt="profile imgage"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div
                  className={`uppercase  text-xl text-white flex items-center text-center m-auto justify-center rounded-full`}
                >
                  {user.name
                    ? user.name.split("").shift()
                    : user.email.split("").shift()}
                </div>
              )}
            </Avatar>
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
            <AlertDialog className="">
              <AlertDialogTrigger>
                <MdDelete className="inline mr-1 text-2xl cursor-pointer text-red-600" />
              </AlertDialogTrigger>
              <AlertDialogContent
                className={"bg-[#1a1d21] outline-none border-none"}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle className={"text-white"}>
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className={"text-gray-300"}>
                    This action cannot be undone. This will permanently delete
                    the account from the servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={"cursor-pointer"}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteUserByAdmin(user);
                    }}
                    className={"cursor-pointer hover:bg-red-500"}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

  const handleDeleteUserByAdmin = async (user) => {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/delete-user`,
        { email: user.email, id: user._id },
        { withCredentials: true }
      );
      if (res.status == 200) {
        setUsers((prev)=>prev.filter((e) => e._id !== user._id))
        toast.success(res.data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="text-white px-5 w-full">
      <SearchUser columns={columns} users={users} />
      <UserTable table={table} columns={columns} />
    </div>
  );
};

export default Users;
