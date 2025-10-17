import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdDelete, MdEdit, MdOutlineModeEditOutline } from "react-icons/md";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Switch } from "../../components/ui/switch";
import axios from "axios";
import { BackendUrl } from "../../assets/constant";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";

export function UserTable() {
  const allusers = useSelector((state) => state.users.allUsers);
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "9876543210",
      password: "password123",
      gender: "Male",
      isActive: true,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      isAdmin: false,
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "9876543211",
      password: "password123",
      gender: "Female",
      isActive: true,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      isAdmin: false,
    },
  ]);

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
              <AlertDialogContent className={"bg-[#1a1d21] outline-none border-none"}>
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
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedUser, setselectedUser] = useState("");

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
      console.log(res.data);
    } catch (err) {
      toast.error(err.response.data);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === useuser._idrId ? { ...u, isActive: !newStatus } : u
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
      console.log(res);
      if (res.status == 200) {
        users.filter((e) => e._id !== user._id);
        toast.success(res.data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

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
    <div className="text-white m-auto px-5">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                className="ml-auto border-none hover:-translate-y-1.5 transition-all duration-500 cursor-pointer px-5 py-2.5 rounded-lg text-white hover:bg-blue-500 bg-blue-600"
                variant="outline"
              >
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Username</Label>
                  <Input
                    id="username-1"
                    name="username"
                    defaultValue="@peduarte"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      <div className="overflow-hidden px-5 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="text-white text-left font-semibold"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="cursor-pointer ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Users.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UserTable;
