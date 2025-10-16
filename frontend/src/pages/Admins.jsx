import React, { useRef, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { BackendUrl } from "../assets/constant";
import { Checkbox } from "../components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { setNewAdmin } from "../redux/slices/Admins_Slice";
import { Avatar, AvatarImage } from "../components/ui/avatar";

const Admins = () => {
  // const allAdmins = useSelector((state) => state.admins.AllAdmins);
  // console.log(allAdmins);
  const allAdmins = [
    {
      adminRole: "Admin",
      createdAt: "2025-10-15T09:59:49.845Z",
      email: "admin@gmail.com",
      image:
        "uploads/profiles/1760521964243pngtree-man-avatar-image-for-profile-png-image_13001877.png",
      name: "admin3",
      password: "$2b$10$3HteVKHRhoVchW1NaR1qsew6d4oWBlAqo.AD00T.S8b/6/wDGsHdC",
      updatedAt: "2025-10-15T09:59:49.845Z",
      __v: 0,
      _id: "68ef7095c0feb39912f0ad0b",
    },
    {
      adminRole: "Admin",
      createdAt: "2025-10-15T09:59:49.845Z",
      email: "admin@gmail.com",
      image:
        "uploads/profiles/1760521964243pngtree-man-avatar-image-for-profile-png-image_13001877.png",
      name: "admin3",
      password: "$2b$10$3HteVKHRhoVchW1NaR1qsew6d4oWBlAqo.AD00T.S8b/6/wDGsHdC",
      updatedAt: "2025-10-15T09:59:49.845Z",
      __v: 0,
      _id: "68ef7095c0feb39912f0ad0b",
    },
    {
      adminRole: "Admin",
      createdAt: "2025-10-15T09:59:49.845Z",
      email: "admin@gmail.com",
      image:
        "uploads/profiles/1760521964243pngtree-man-avatar-image-for-profile-png-image_13001877.png",
      name: "admin3",
      password: "$2b$10$3HteVKHRhoVchW1NaR1qsew6d4oWBlAqo.AD00T.S8b/6/wDGsHdC",
      updatedAt: "2025-10-15T09:59:49.845Z",
      __v: 0,
      _id: "68ef7095c0feb39912f0ad0b",
    },
    {
      adminRole: "Admin",
      createdAt: "2025-10-15T09:59:49.845Z",
      email: "admin@gmail.com",
      image:
        "uploads/profiles/1760521964243pngtree-man-avatar-image-for-profile-png-image_13001877.png",
      name: "admin3",
      password: "$2b$10$3HteVKHRhoVchW1NaR1qsew6d4oWBlAqo.AD00T.S8b/6/wDGsHdC",
      updatedAt: "2025-10-15T09:59:49.845Z",
      __v: 0,
      _id: "68ef7095c0feb39912f0ad0b",
    },
    {
      adminRole: "Admin",
      createdAt: "2025-10-15T09:59:49.845Z",
      email: "admin@gmail.com",
      image: null,
      name: "admin3",
      password: "$2b$10$3HteVKHRhoVchW1NaR1qsew6d4oWBlAqo.AD00T.S8b/6/wDGsHdC",
      updatedAt: "2025-10-15T09:59:49.845Z",
      __v: 0,
      _id: "68ef7095c0feb39912f0ad0b",
    },
    {
      adminRole: "Admin",
      createdAt: "2025-10-15T09:59:49.845Z",
      email: "admin@gmail.com",
      image: null,
      name: "admin3",
      password: "$2b$10$3HteVKHRhoVchW1NaR1qsew6d4oWBlAqo.AD00T.S8b/6/wDGsHdC",
      updatedAt: "2025-10-15T09:59:49.845Z",
      __v: 0,
      _id: "68ef7095c0feb39912f0ad0b",
    },
  ];
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const addNewAdminButtonRef = useRef(null);
  const closeAdminFormRef = useRef(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [adminRole, setadminRole] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const filteredAdmins = allAdmins.filter((member) => {
    return member.name.toLowerCase().includes(search.toLowerCase());
  });

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
    console.log(name, email, password, adminRole);
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
        closeAdminFormRef.current.click();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <Dialog className="">
        <form>
          <DialogTrigger asChild>
            <Button
              ref={addNewAdminButtonRef}
              className={"hidden"}
              variant="outline"
            >
              Open Dialog
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
                    "cursor-pointer text-black hover:bg-[#171717] outline-none border-none hover:text-white"
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
                className={"cursor-pointer hover:bg-gray-200 hover:text-black"}
              >
                Add Admin
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <div className="">
        <header className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-white">Admins</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2  text-white bg-[#272a2f] outline-none rounded-md"
              />
            </div>
            <button
              onClick={() => {
                addNewAdminButtonRef.current.click();
              }}
              className="inline-flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            >
              <FiPlus /> Add New
            </button>
          </div>
        </header>

        <div className="">
          {filteredAdmins.length <= 0 ? (
            <div className="text-white text-3xl text-center mx-auto font-bold my-5">
              ! No Admins Except You
            </div>
          ) : (
            <div className="flex p-2.5 gap-x-5 gap-y-10 justify-evenly flex-wrap">
              {filteredAdmins.map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-lg flex flex-col h-96 bg-gray-300 shadow-md hover:shadow-lg pt-3.5 transition-shadow duration-300 text-center w-full sm:w-90 lg:w-72  overflow-hidden"
                >
                  {/* <div className="w-full h-1/2">
                    {member.image ? (
                      <Avatar className={"w-full h-full rounded-full bg-red-400"}>
                        <AvatarImage
                          src={`${BackendUrl}/${member.image}`}
                          alt="profile image"
                          className="object-cover w-full h-full"
                        />
                      </Avatar>
                    ) : (
                      <div className="uppercase  text-black flex text-7xl  items-center justify-center h-full w-full bg-gray-200">
                        {member.name
                          ? member.name.charAt(0)
                          : member.email.charAt(0)}
                      </div>
                    )}
                  </div> */}
                  <div className="relative flex gap-2.5 cursor-pointer  transition duration-500 rounded-md  items-center justify-center">
                    <Avatar className="w-1/2 h-full  border-[1px] overflow-hidden">
                      {member.image !== null ? (
                        <AvatarImage
                          src={`${BackendUrl}/${member.image}`}
                          alt="profile imgage"
                          className="object-cover bg-black w-full h-full"
                        />
                      ) : (
                        <div
                          className={`uppercase w-full h-full bg-blue-400 text-3xl text-black flex items-center text-center m-auto justify-center rounded-full`}
                        >
                          {member.name
                            ? member.name.split("").shift()
                            : member.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 py-2">
                    <p className="text-xl font-semibold text-gray-800">
                      {member.name}
                    </p>
                    <p className="text-sm font-bold text-gray-black">
                      {member.adminRole}
                    </p>
                    <p className="text-sm font-bold text-gray-700">
                      {member.email}
                    </p>
                    <div className="mt-3">
                      <button className="text-white cursor-pointer hover:bg-indigo-400 w-full bg-indigo-600 rounded-lg py-2.5 px-10 text-sm font-bold">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admins;
