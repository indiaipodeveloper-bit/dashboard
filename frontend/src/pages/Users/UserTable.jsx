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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import { Switch } from "../../components/ui/switch";
import axios from "axios";
import { BackendUrl } from "../../assets/constant";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../../components/ui/avatar";

export function UserTable() {
  const allusers = useSelector((state) => state.users.allUsers);
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
          <div className="text-left font-medium">
            <Button
              className={"text-red-400 p-0 mb-2.5 cursor-pointer text-2xl"}
              onClick={() => {
                setselectedUser(user);
                console.log(selectedUser);
              }}
            >
              <MdDelete className="inline mr-1" />
            </Button>
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
      <div className="flex justify-center items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Button
          variant="outline"
          className="ml-auto border-none hover:-translate-y-1.5 transition-all duration-500 cursor-pointer px-5 py-2.5 rounded-lg text-white hover:bg-blue-500 bg-blue-600"
        >
          Add New
        </Button>
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
                  No results.
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
