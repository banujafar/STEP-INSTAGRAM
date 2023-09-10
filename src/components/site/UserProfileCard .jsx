import React from "react";
import ProfileImage from "./ProfileImage"; // Assuming you have a ProfileImage component

const UserProfileCard = ({ username, imageUrl, location, bio }) => {

  return (
    <div className="px-2">
      <div className="flex items-center space-x-4">
        <ProfileImage username={username} imageUrl={imageUrl} hasStory={true} />
        <div>
          <h2 className="text-neutral-800 text-[13px] font-semibold leading-[18px]">{username}</h2>
          {location && <p className="text-neutral-800 text-[11px] font-normal tracking-tight">{location}</p>}
          {bio && <p className="w-[190px] text-black text-opacity-40 text-[13px] font-normal">{bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
