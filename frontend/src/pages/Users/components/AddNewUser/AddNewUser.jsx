import { Dialog } from "@radix-ui/react-dialog";
import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { FiPlus} from "react-icons/fi";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { BackendUrl } from "../../../../assets/constant";

const AddNewUser = ({ setUsers }) => {
  const [showPassword, setshowPassword] = useState(false);
  const closeUserFormRef = useRef(null);
  const [newUserDetails, setNewUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    isAdmin: false,
  });

  const handleAddNewUser = async () => {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/add-user`,
        newUserDetails,
        { withCredentials: true }
      );
      if (res.status == 200) {
        setUsers((prev) => [...prev, res.data.user]);
        closeUserFormRef.current.click();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleChange = (field, value) => {
    setNewUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="inline-flex cursor-pointer items-center hover:-translate-y-1.5 transition-all duration-500 justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            variant="outline"
          >
            <FiPlus /> Add New
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-[#1a1d21] outline-none border-none text-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill the details to create a new user account.
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
                value={newUserDetails.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter user email"
                value={newUserDetails.email}
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
                value={newUserDetails.phone}
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
                value={newUserDetails.password}
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
                value={newUserDetails.gender}
                onValueChange={(value) => handleChange("gender", value)}
                className="flex gap-6 mt-1"
              >
                {["Male", "Female", "Other"].map((g) => (
                  <div key={g} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={g}
                      id={g.toLowerCase()}
                      checked={newUserDetails.gender === g}
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
                value={newUserDetails.isAdmin}
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
                      checked={newUserDetails.isAdmin === opt.value}
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
              onClick={handleAddNewUser}
              type="submit"
              className="cursor-pointer bg-black px-2.5 py-2 rounded-lg font-semibold hover:bg-gray-200 hover:text-black"
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddNewUser;
