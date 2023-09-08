import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.userProfile.userInfo);
  console.log(userInfo);

  //TODO!! WILL BE CHANGED
  const [sub, setSub] = useState(false);

  return (
    <div className="flex justify-center  items-center">
      <FaUserCircle size={"140px"} />
      <div className="flex flex-col  ml-16">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl mr-2 ">{userInfo.username}</h1>
          <button
            className="border-solid border-2 border-gray-400 rounded px-4 mt-2 ml-2 mr-2"
            onClick={() => setSub(!sub)}
          >
            {sub ? "Unsubscribe" : "Subscribe"}
          </button>
          <button className="border-solid border-2 border-gray-400 rounded mt-2 mr-2">
            <MdOutlineArrowDropDown size={"24px"} />
          </button>
          <button className="mt-2">
            <BsThreeDots />
          </button>
        </div>
        <div className="flex items-center mt-3 mb-2">
          <UserDetails details={userInfo.posts?.length} text={"posts"} />
          <UserDetails
            details={userInfo.subscribers?.length}
            text={"subscribers"}
          />
          <UserDetails
            details={userInfo.subscriptions?.length}
            text={"subscriptions"}
          />
        </div>
        <span className="my-1">
          {userInfo.firstName} {userInfo.lastName}
        </span>
        <span>Subscribed by {/*  //TODO!! Will be added */}</span>
      </div>
    </div>
  );
};

export const UserDetails = ({ details, text }) => {
  return (
    <div className="mr-3">
      <span className="font-bold mr-1">{details}</span>
      {text}
    </div>
  );
};

export default UserInfo;
