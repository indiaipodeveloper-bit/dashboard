import React from "react";
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar";
import { BackendUrl } from "../../../../../../assets/constant";

const UserAvatar = ({ user }) => {
  return (
    <Avatar className="rounded-full w-10 h-10 border-[1px]">
      {user.image ? (
        <AvatarImage
          src={`${BackendUrl}/${user.image}`}
          alt="profile imgage"
          className="object-cover w-full h-full"
        />
      ) : (
        <div
          className={`uppercase  text-xl text-white flex items-center text-center m-auto justify-center rounded-full`}
        >
          {user.name
            ? user.name.split("").shift()
            : user.email.split("").shift()}
        </div>
      )}
    </Avatar>
  );
};

export default UserAvatar;
