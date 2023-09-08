import React from "react";

const ProfileImage = ({ username, imageUrl, size, className }) => {
  const sizeToClassName = {
    6: "w-6 h-6",
    8: "w-8 h-8",
    10: "w-10 h-10",
    12: "w-12 h-12",
    14: "w-14 h-14",
    16: "w-16 h-16",
    20: "w-20 h-20",
    24: "w-24 h-24",
  };

  const sizeClass = sizeToClassName[size] || "w-8 h-8";

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden ${className}`}>
      <img
        src={imageUrl}
        alt={`${username}'s profile picture`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfileImage;
