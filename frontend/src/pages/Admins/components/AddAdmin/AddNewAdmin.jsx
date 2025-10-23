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
import { FiPlus } from "react-icons/fi";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Checkbox } from "../../../../components/ui/checkbox";
import { toast } from "sonner";
import { BackendUrl } from "../../../../assets/constant";
import axios from "axios";
import { setNewAdmin } from "../../../../redux/slices/Admins_Slice";
import { useDispatch, useSelector } from "react-redux";

const AddNewAdmin = ({admins,setadmins}) => {
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [adminRole, setadminRole] = useState("");
  const closeAdminFormRef = useRef(null);

  const validateForm = () => {
    if (!name) {
      toast.error("Name is Required");
      return;
    }
    if (!email) {
      toast.error("Email is Required");
      return;
    }
    if (!password) {
      toast.error("Password is Required");
      return;
    }
    if (!adminRole) {
      toast.error("adminRole is Required");
      return;
    }
  };

  const handleSubmitNewAdminDetails = async () => {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/add-admin`,
        { name, email, password, adminRole },
        { withCredentials: true }
      );
      if (res.status == 200) {
        toast.success(res.data.msg);
        dispatch(setNewAdmin(res.data.newAddedAdmin));
        setadmins(prev => [...prev, res.data.newAddedAdmin]);
        closeAdminFormRef.current.click();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <Dialog className="">
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
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>
              Description for adding the admin
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                type={"text"}
                name="name"
                placeholder="Enter New Admin Name"
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                name="email"
                type={"email"}
                placeholder="Enter Email For New Admin"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                placeholder="Enter Password For New Admin"
              />
              <div className="flex items-center gap-x-2.5">
                <Checkbox
                  onClick={() => {
                    setshowPassword(!showPassword);
                  }}
                />{" "}
                <span>Show Password</span>
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Admin Role</Label>
              <Select
                onValueChange={(e) => {
                  setadminRole(e);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Admin Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Admin Role</SelectLabel>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="SuperAdmin">Super Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                ref={closeAdminFormRef}
                variant="outline"
                className={
                  "cursor-pointer bg-white px-2.5 rounded-lg font-semibold text-black hover:bg-[#171717] outline-none border-none hover:text-white"
                }
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                validateForm();
                handleSubmitNewAdminDetails();
              }}
              type="submit"
              className={
                "cursor-pointer bg-black px-2.5 py-2 rounded-lg font-semibold hover:bg-gray-200 hover:text-black"
              }
            >
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddNewAdmin;
