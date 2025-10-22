import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import {  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from "../../../../../../components/ui/alert-dialog";
import { BackendUrl } from "../../../../../../assets/constant";

const DeleteUserButton = ({ user ,setUsers}) => {
  const handleDeleteUserByAdmin = async (user) => {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/delete-user`,
        { email: user.email, id: user._id },
        { withCredentials: true }
      );
      if (res.status == 200) {
        setUsers((prev) => prev.filter((e) => e._id !== user._id));
        toast.success(res.data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
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
            This action cannot be undone. This will permanently delete the
            account from the servers.
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
  );
};

export default DeleteUserButton;
