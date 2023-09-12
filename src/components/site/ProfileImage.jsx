import React from "react";

const ProfileImage = ({ username, imageUrl, size, className, hasStory }) => {
  const sizeToClassName = {
    6: "w-6 h-6",
    8: "w-8 h-8",
    10: "w-10 h-10",
    12: "w-12 h-12",
    14: "w-14 h-14",
    16: "w-16 h-16",
    20: "w-20 h-20",
    24: "w-24 h-24",
    32: "w-32 h-32",
  };

  const sizeClass = sizeToClassName[size] || "w-14 h-14";

  // Define the gradient story border style
  const storyBorder =
    hasStory &&
    "border-4 border-gradient-blue-purple absolute top-0 left-0 w-full h-full rounded-full ";

  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden relative ${className} `}
    >
      {hasStory && <div className={storyBorder}></div>}
      <img
        src={imageUrl}
        alt={`${username}'s profile picture`}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default ProfileImage;
