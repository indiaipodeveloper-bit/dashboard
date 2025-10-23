import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { BackendUrl } from "../../../../assets/constant";
import { toast } from "sonner";
import axios from "axios";

const EditAdmin = ({ member,setadmins }) => {
  const closeEditDialogRef = useRef(null);
  const [editAdminData, seteditAdminData] = useState({
    name: "",
    adminRole: "",
    password: "",
  });
  const [selectedAdmin, setselectedAdmin] = useState();
  const handleChange = (e) => {
    seteditAdminData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEditAdmin = async () => {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/edit-admin`,
        { ...editAdminData, email: selectedAdmin.email },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setadmins((prev) =>
          prev.map((a) => (a._id === res.data.user._id ? res.data.user : a))
        );
        toast.success("Admin updated successfully !");
        closeEditDialogRef.current.click();
      }
    } catch (error) {
      toast.error(error.response?.data);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="w-1/2">
        <Button
          onClick={() => setselectedAdmin(member)}
          className="w-full cursor-pointer text-white 
          bg-gradient-to-r from-[#6a5acd] to-[#5b4bcc] 
          hover:from-[#5b4bcc] hover:to-[#4b3bb5] 
          rounded-lg py-2.5 text-sm font-bold transition-all duration-300 shadow-md"
          variant="outline"
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent
        className="bg-gradient-to-br from-[#1e1b2e]/70 via-[#1c1a27]/80 to-[#18161f]/80
        backdrop-blur-2xl border border-white/10 shadow-2xl text-white
        rounded-2xl
        w-[95%] sm:w-[80%] md:w-[70%] lg:w-[420px]
        max-w-[95%] mx-auto transition-all duration-300"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-white/90">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-center text-white/60">
            Update admin details and click save when you’re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-white/90">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              defaultValue={member.name}
              onChange={handleChange}
              className="bg-white/5 border border-white/20 text-white placeholder-white/50
              focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/50 rounded-lg"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-white/90">
              Password
            </Label>
            <Input
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              placeholder="Enter new password"
              className="bg-white/5 border border-white/20 text-white placeholder-white/50
              focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/50 rounded-lg"
            />
          </div>

          {/* Role Dropdown using HTML select */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="role" className="text-white/90">
              Admin Role
            </Label>
            <select
              id="role"
              name="adminRole"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 text-white 
              placeholder-white/50 rounded-lg py-2.5 px-3 focus:border-[#6a5acd] 
              focus:ring-2 focus:ring-[#6a5acd]/50 appearance-none cursor-pointer
              hover:bg-white/10 transition-colors duration-300"
            >
              {["Admin", "SuperAdmin"].map((e) => (
                <option
                  key={e}
                  name="adminRole"
                  value={e}
                  className="bg-[#1e1b2e] text-white"
                >
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-3 flex-wrap gap-3">
          <DialogClose asChild>
            <Button
              ref={closeEditDialogRef}
              className="flex-1 cursor-pointer bg-white/10 text-white
              border border-white/20 rounded-lg py-2.5 font-semibold
              hover:bg-white/20 hover:text-[#6a5acd] transition-all"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="flex-1 bg-gradient-to-r from-[#5b4bcc] to-[#4b3bb5]
            hover:from-[#4b3bb5] hover:to-[#3b2aa5] text-white
            font-semibold rounded-lg py-2.5 transition-all"
            type="submit"
            onClick={handleEditAdmin}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdmin;
