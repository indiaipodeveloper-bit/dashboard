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
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { BackendUrl } from "../../assets/constant";
import { Checkbox } from "../../components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { setNewAdmin } from "../../redux/slices/Admins_Slice";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { FaTrash } from "react-icons/fa";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const Admins = () => {
  const allAdmins = useSelector((state) => state.admins.AllAdmins);
  const [admins, setadmins] = useState(allAdmins);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userinfo);
  const [search, setSearch] = useState("");
  const closeAdminFormRef = useRef(null);
  const closeEditDialogRef = useRef(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [adminRole, setadminRole] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [selectedAdmin, setselectedAdmin] = useState();
  // console.log(selectedAdmin)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filteredAdmins = admins.filter((member) => {
    return member.email.toLowerCase().includes(search.toLowerCase());
  });

  const [editAdminData, seteditAdminData] = useState({
    name: "",
    adminRole: "",
    password: "",
  });

  const handleChange = (e) => {
    seteditAdminData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // <- use square brackets for dynamic key
    }));
  };

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
      console.log(res);
      if (res.status == 200) {
        toast.success(res.data.msg);
        dispatch(setNewAdmin(res.data.newAddedAdmin));
        admins.push(res.data.newAddedAdmin);
        closeAdminFormRef.current.click();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
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
      toast.error(error.response?.data || "Failed to update admin");
    }
  };

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
    <>
      <div className="">
        <div className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                            <SelectItem value="SuperAdmin">
                              Super Admin
                            </SelectItem>
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
          </div>
        </div>

        <div className="mt-5">
          {filteredAdmins.length <= 0 ? (
            <div className="text-white text-3xl text-center mx-auto font-bold my-5">
              No Admins !
            </div>
          ) : (
            <div className="flex p-2.5 gap-x-10 gap-y-10 justify-evenly flex-wrap">
              {filteredAdmins.map((member, idx) => (
                <div
                  key={member._id}
                  className="relative flex flex-col items-center justify-between text-center
  h-auto w-full sm:w-[85%] md:w-[48%] lg:w-72 xl:w-80
  rounded-2xl overflow-hidden
  bg-gradient-to-br from-white/10 via-purple-500/5 to-purple-700/10
  backdrop-blur-2xl border border-white/10 shadow-xl
  hover:shadow-purple-500/30 hover:-translate-y-1 hover:scale-[1.02]
  transition-all duration-500 ease-out p-5"
                >
                  <div className="relative flex justify-center items-center mt-2">
                    <Avatar className="w-28 h-28 rounded-full border-2 border-white/20 overflow-hidden shadow-md">
                      {member.image !== null ? (
                        <AvatarImage
                          src={`${BackendUrl}/${member.image}`}
                          alt="profile image"
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <div className="uppercase w-full h-full bg-white/10 text-4xl text-white flex items-center justify-center rounded-full">
                          {member.name
                            ? member.name.split("").shift()
                            : member.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-col items-center justify-center flex-1 gap-y-2 py-3">
                    <p className="text-lg md:text-xl font-semibold text-white">
                      {member.name}
                    </p>
                    <p className="text-sm md:text-base font-bold text-purple-300">
                      {member.adminRole}
                    </p>
                    <p className="text-sm font-medium text-white/70 break-all">
                      {member.email}
                    </p>
                  </div>

                  {/* Buttons Section */}
                  {user.adminRole === "SuperAdmin" && (
                    <div className="mt-3 w-full flex gap-3">
                      {/* Edit Button */}

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
                              Update admin details and click save when you’re
                              done.
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
                              <Label
                                htmlFor="password"
                                className="text-white/90"
                              >
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
                                value={
                                  selectedAdmin?.adminRole || member.adminRole
                                }
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/20 text-white 
              placeholder-white/50 rounded-lg py-2.5 px-3 focus:border-[#6a5acd] 
              focus:ring-2 focus:ring-[#6a5acd]/50 appearance-none cursor-pointer
              hover:bg-white/10 transition-colors duration-300"
                              >
                                {["Admin", "SuperAdmin"].map((e) => (
                                  <option
                                    key={e}
                                    onChange={(e) =>
                                      setadminRole(e.target.value)
                                    }
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

                      {/* Delete Button */}
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
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteAdminByOnlySuperAdmin(member)
                              }
                              className="cursor-pointer hover:bg-red-500"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
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
