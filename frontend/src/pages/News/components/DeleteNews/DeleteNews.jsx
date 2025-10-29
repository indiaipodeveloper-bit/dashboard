import React from "react";
import axios from "axios";
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
import { BackendUrl } from "../../../../assets/constant";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const DeleteNews = ({ setnews,news }) => {
  const handleDeleteNews = async () => {
    try {
      const res = await axios.post(`${BackendUrl}/admin/delete-news`, news, {
        withCredentials: true,
      });
      if (res.status == 200) {
        setnews((prev) => prev.filter((e) => e._id !== res.data.news._id));
        toast.success(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-1/2">
        <Button variant="outline">
          <MdDelete className="mr-1 text-xl text-red-400 cursor-pointer" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#1a1d21] outline-none border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            This action cannot be undone. This will permanently delete news and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteNews(news)}
            className="cursor-pointer hover:bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNews;
