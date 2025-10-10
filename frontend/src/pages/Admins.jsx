import React, { useState } from "react";
import {FiPlus, FiSearch} from "react-icons/fi"

const Admins = () => {
  const [search, setSearch] = useState("");

  const teamMembers = [
    {
      name: "Angela Bernier",
      role: "Admin",
      img: "https://randomuser.me/api/portraits/women/11.jpg",
      email: "angela@example.com",
    },
    {
      name: "David Grasso",
      role: "Admin",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      email: "david@example.com",
    },
    {
      name: "Mike Bunch",
      role: "Admin",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
      email: "mike@example.com",
    },
    {
      name: "Sophia Carter",
      role: "Admin",
      img: "https://randomuser.me/api/portraits/women/17.jpg",
      email: "sophia@example.com",
    },
    {
      name: "Ethan Ray",
      role: "SuperAdmin",
      img: "https://randomuser.me/api/portraits/men/16.jpg",
      email: "ethan@example.com",
    },
  ];

  const filteredTeam = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Admins</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow-sm">
            <FiPlus /> Add New
          </button>
        </div>
      </header>

      <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTeam.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500">{member.role}</p>
            <p className="text-xs text-gray-400 mt-1">{member.email}</p>
            <div className="mt-4">
              <button className="text-indigo-600 font-medium hover:underline text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Admins;
