import React, { useRef, useState } from "react";
import UserTable from "./components/Usertable/UserTable";
import SearchUser from "./components/SearchUser/SearchUser";
import { useSelector } from "react-redux";
import AddNewUser from "./components/AddNewUser/AddNewUser";

const Users = () => {
  const allusers = useSelector((state) => state.users.allUsers);
  const [users, setUsers] = useState(allusers);
  const [search, setsearch] = useState("");
  const filteredUsers = users.filter((member) => {
    return member.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="text-white  w-full">
      <div className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-2xl font-semibold text-white">Users</p>
        <div className="flex  flex-col sm:flex-row sm:items-center  gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <SearchUser setsearch={setsearch}  />
          </div>
          <AddNewUser setUsers={setUsers} />
        </div>
      </div>
      <div className="my-2.5 py-2.5 px-10">
        <UserTable users={filteredUsers} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default Users;
