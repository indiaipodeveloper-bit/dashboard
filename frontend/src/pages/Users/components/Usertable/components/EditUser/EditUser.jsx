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
} from "../../../../../../components/ui/dialog";
import { Button } from "../../../../../../components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Input } from "../../../../../../components/ui/input";
import { Label } from "../../../../../../components/ui/label";
import { Checkbox } from "../../../../../../components/ui/checkbox";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../../../components/ui/radio-group";
import { MdEdit } from "react-icons/md";
import { BackendUrl } from "../../../../../../assets/constant";
import { toast } from "sonner";
import axios from "axios";

const EditUser = ({ user, setUsers }) => {
  const [showPassword, setshowPassword] = useState(false);
  const [EditUserDetails, setEditUserDetails] = useState({
    name: "",
    email: user.email,
    phone: "",
    password: "",
    gender: "",
    isAdmin: "",
  });

  const closeUserFormRef = useRef(null);

  const handleEditUser = async () => {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/edit-user`,
        EditUserDetails,
        { withCredentials: true }
      );
      if (res.status == 200) {
        setUsers((prev) => prev.map((e)=> e.email === res.data.user.email ? res.data.user : e));
        toast.success("User Profile Updated Successfully")
        closeUserFormRef.current.click();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleChange = (field, value) => {
    setEditUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="inline-flex cursor-pointer items-center transition-all duration-500 justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            variant="outline"
          >
            <MdEdit className="text-xl cursor-pointer" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-[#1a1d21] outline-none border-none text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Fill the details to edit the user account.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Name */}
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter user name"
                value={EditUserDetails.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                disabled={true}
                type="email"
                name="email"
                placeholder="Enter user email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="grid gap-3">
              <Label>Phone</Label>
              <Input
                type="text"
                name="phone"
                placeholder="Enter user phone number"
                value={EditUserDetails.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-3">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={EditUserDetails.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
              <div className="flex items-center gap-x-2.5">
                <Checkbox
                  checked={showPassword}
                  onClick={() => setshowPassword(!showPassword)}
                />
                <span>Show Password</span>
              </div>
            </div>

            {/* Gender */}
            <div className="grid gap-3">
              <Label>Gender</Label>
              <RadioGroup
                value={EditUserDetails.gender}
                onValueChange={(value) => handleChange("gender", value)}
                className="flex gap-6 mt-1"
              >
                {["Male", "Female", "Other"].map((g) => (
                  <div key={g} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={g}
                      id={g.toLowerCase()}
                      checked={EditUserDetails.gender === g}
                      className="border-white text-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <Label htmlFor={g.toLowerCase()}>{g}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Is Admin */}
            <div className="grid gap-3">
              <Label>Is Admin</Label>
              <RadioGroup
                value={EditUserDetails.isAdmin}
                onValueChange={(value) => handleChange("isAdmin", value)}
                className="flex gap-6 mt-1"
              >
                {[
                  { label: "True", value: "true" },
                  { label: "False", value: "false" },
                ].map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={opt.value}
                      id={`admin-${opt.value}`}
                      checked={EditUserDetails.isAdmin === opt.value}
                      className="border-white text-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <Label htmlFor={`admin-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                ref={closeUserFormRef}
                variant="outline"
                className="cursor-pointer bg-white px-2.5 rounded-lg font-semibold text-black hover:bg-[#171717] outline-none border-none hover:text-white"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={handleEditUser}
              type="submit"
              className="cursor-pointer bg-black px-2.5 py-2 rounded-lg font-semibold hover:bg-gray-200 hover:text-black"
            >
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditUser;
