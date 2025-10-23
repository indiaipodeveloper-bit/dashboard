import React from "react";
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
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { BackendUrl } from "../../../../assets/constant";

const DeleteAdmin = ({member,setadmins}) => {
     const handleDeleteAdminByOnlySuperAdmin = async (member) => {
        try {
          const res = await axios.post(
            `${BackendUrl}/admin/delete-admin`,
            { adminDetails: member },
            { withCredentials: true }
          );
          if (res.status == 200) {
            toast.success(res.data);
            setadmins((prev) => prev.filter((e) => e._id !== member._id));
          }
        } catch (error) {
          toast.error(error.response.data);
        }
      };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-1/2">
        <Button
          className="flex items-center justify-center gap-2 w-full py-2.5 cursor-pointer
              bg-gradient-to-r from-black via-white/10 to-black
              text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
          variant="outline"
        >
          <FaTrash className="text-lg" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#1a1d21] outline-none border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteAdminByOnlySuperAdmin(member)}
            className="cursor-pointer hover:bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAdmin;
