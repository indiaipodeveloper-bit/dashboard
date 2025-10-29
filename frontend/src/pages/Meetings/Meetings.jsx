import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import AddMeeting from "./components/AddMeeting/AddMeeting";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { BackendUrl } from "../../assets/constant";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const Meetings = () => {
  const meetings = useSelector((state) => state.meetings.allMeetings);
  const [allMeetings, setallMeetings] = useState(meetings);
  const NoToMonths = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return (
    <div>
      <div className="bg-[#222529] shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-2xl font-semibold text-white">Meetings</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Search..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2  text-white bg-[#272a2f] outline-none rounded-md"
            />
          </div>

          <AddMeeting />
        </div>
      </div>

      <div className="w-full  ">
        {allMeetings.length < 1 ? (
          <div>No Meetings</div>
        ) : (
          <div
            className={`flex p-2.5 gap-x-10 gap-y-10 
              justify-evenly flex-wrap`}
          >
            {allMeetings.map((meeting) => (
              <div
                key={meeting._id}
                className="relative flex flex-col items-center justify-between text-center
        h-auto w-full sm:w-[85%] md:w-[48%] lg:w-72 xl:w-80
        rounded-2xl overflow-hidden
        backdrop-blur-2xl border border-white/10 shadow-xl
        hover:shadow-blue-500/30 hover:-translate-y-1 hover:scale-[1.02]
        transition-all duration-500 ease-out"
              >
                {/* Amount */}
                <span className="text-white absolute right-5 top-2.5 flex justify-center items-center gap-1">
                  <RiMoneyRupeeCircleLine className="text-green-400" />
                  {meeting.amountINR} INR
                </span>
                {/* Avatar */}
                <div className="relative flex aspect-square justify-center  w-1/2 items-center mt-2">
                  <Avatar className="h-full w-full  overflow-hidden ">
                    {meeting.userId?.image ? (
                      <AvatarImage
                        src={`${BackendUrl}/${meeting.userId.image}`}
                        alt="profile"
                        className="object-cover w-full h-full "
                      />
                    ) : (
                      <div className="uppercase w-full h-full  text-4xl text-white flex items-center justify-center">
                        A
                      </div>
                    )}
                  </Avatar>
                </div>

                {/* Info Section */}
                <div className="flex justify-between  w-full px-3 py-3 text-white">
                  {/* LEFT - Date */}
                  <div className="flex flex-col items-center max-w-[70px]">
                    <p className="text-lg font-bold text-green-400">
                      {meeting.dateLabel.split("-")[2]}
                    </p>
                    <p className="text-sm font-semibold">
                      {NoToMonths[meeting.dateLabel.split("-")[1]]}{" "}
                      {meeting.dateLabel.split("-")[0]}
                    </p>
                  </div>

                  {/* RIGHT - Details */}
                  <div className="flex flex-col text-start items-end flex-1 ml-3 max-w-[300px] text-xs md:text-sm">
                    <div className="">
                      <p className="text-gray-300 text-xs">
                        Time {meeting.timeLabel} {meeting.timezone}
                      </p>
                      <p className="text-gray-300">
                        Duration: {meeting.durationMin} mins
                      </p>
                      <p className="text-gray-400">
                        Created:{" "}
                        {new Date(meeting.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">
                        ID: {meeting._id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meetings;
