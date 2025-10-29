import UserAvatar from "./components/UserAvatar/UserAvatar";
import { Switch } from "../../../../components/ui/switch";
import { toast } from "sonner";
import axios from "axios";
import { BackendUrl } from "../../../../assets/constant";
import { useState } from "react";
import EditUser from "./components/EditUser/EditUser";
import DeleteUserButton from "./components/DeleteUserButton/DeleteUserButton";

export function UserTable({ users, setUsers }) {
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
      if (res.status == 200) {
        toast.success(
          `User ${res.data.user.isActive ? "Enabled" : "Disabled"} Successfully`
        );
      }
    } catch (err) {
      toast.error(err.response.data);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isActive: !newStatus } : u
        )
      );
    }
  };

  return (
    <div className=" rounded-md p-5 border">
      <div className="overflow-y-auto hide-scroll w-full max-h-[600px] ">
        <table
          className="w-full text-center border-collapse"
          border={1}
          cellSpacing={0}
        >
          <thead className="bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-white">S No</th>
              <th className="p-3 text-white">Image</th>
              <th className="p-3 text-white">Name</th>
              <th className="p-3 text-white">Email</th>
              <th className="p-3 text-white">Phone</th>
              <th className="p-3 text-white">Gender</th>
              <th className="p-3 text-white">Role</th>
              <th className="p-3 text-white">Status</th>
              <th className="p-3 text-white">Edit</th>
              <th className="p-3 text-white">Delete</th>
            </tr>
          </thead>
          <tbody className="">
            {users.length < 1 ? (
              <tr className="p-5"><td>No Users Found</td></tr>
            ) : (
              users.map((e, ind) => (
                <tr key={e._id} className="border-b border-gray-600">
                  <td className="p-3">{ind + 1}</td>
                  <td className="p-3">{<UserAvatar user={e} />}</td>
                  <td className="p-3">{e.name}</td>
                  <td className="p-3">{e.email}</td>
                  <td className="p-3">{e.phone}</td>
                  <td className="p-3">{e.gender}</td>
                  <td className="p-3">{e.isAdmin ? "Admin" : "User"}</td>
                  <td className="p-3">
                    <Switch
                      checked={e.isActive}
                      className={`${
                        e.isActive ? "bg-green-500" : "bg-red-400"
                      } transition-all duration-300 cursor-pointer rounded-full`}
                      onCheckedChange={(newStatus) =>
                        handleEnableDisableUser(e, newStatus)
                      }
                    />
                  </td>
                  <td className="p-3">
                    {<EditUser user={e} setUsers={setUsers} />}
                  </td>
                  <td className="p-3">
                    {<DeleteUserButton setUsers={setUsers} user={e} />}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
