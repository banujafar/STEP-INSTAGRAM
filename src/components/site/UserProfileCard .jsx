import React from "react";
import ProfileImage from "./ProfileImage"; // Assuming you have a ProfileImage component
import { Link, useNavigate } from "react-router-dom";

const UserProfileCard = ({ username, imageUrl, location, bio }) => {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    navigate(`/${username}`);
  };

  return (
    <div className="px-2">
      <div className="flex items-center space-x-4">
        <ProfileImage username={username} imageUrl={imageUrl} hasStory={true} />
        <div>
          <Link to={`/${username}`}>
            <h2
              className="text-neutral-800 text-[13px] font-semibold leading-[18px]"
              onClick={handleUsernameClick}
            >
              {username}
            </h2>
          </Link>
          {location && (
            <p className="text-neutral-800 text-[11px] font-normal tracking-tight">
              {location}
            </p>
          )}
          {bio && (
            <p className="w-[190px] text-black text-opacity-40 text-[13px] font-normal">
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
