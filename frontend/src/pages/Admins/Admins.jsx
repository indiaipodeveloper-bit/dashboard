import React, { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BackendUrl } from "../../assets/constant";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import AddNewAdmin from "./components/AddAdmin/AddNewAdmin";
import EditAdmin from "./components/EditAdmin/EditAdmin";
import DeleteAdmin from "./components/DeleteAdmin/DeleteAdmin";

const Admins = () => {
  const allAdmins = useSelector((state) => state.admins.AllAdmins);
  const [admins, setadmins] = useState(allAdmins);
  const user = useSelector((state) => state.auth.userinfo);
  const [search, setSearch] = useState("");
  const filteredAdmins = admins.filter((member) => {
    return member.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className="">
        <div className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-2xl font-semibold text-white">Admins</p>
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

            {user.adminRole === "SuperAdmin" && (
              <AddNewAdmin admins={admins} setadmins={setadmins} />
            )}
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
bg-gradient-to-br from-white/10 via-blue-500/5 to-blue-700/10
backdrop-blur-2xl border border-white/10 shadow-xl
hover:shadow-blue-500/30 hover:-translate-y-1 hover:scale-[1.02]
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
                    {user.email == member.email && (
                      <p className="font-bold text-white mt-2.5">(You)</p>
                    )}
                  </div>

                  {/* Buttons Section */}
                  {user._id !== member._id &&
                    user.adminRole === "SuperAdmin" && (
                      <div className="mt-3 w-full flex gap-3">
                        <EditAdmin member={member} setadmins={setadmins} />

                        <DeleteAdmin member={member} setadmins={setadmins} />
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
