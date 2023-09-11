import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useSubscribeMutation,
  useUnsubcribeMutation,
} from "../../store/api/userApiSlice";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";

const UserInfo = ({ userData }) => {
  const { username } = useParams();
  const profilename = useSelector((state) => state.auth.username);
  const [sub, setSub] = useState(
    userData.subscribers.some((data) => data.username === profilename)
  );
  const { refetch } = useGetCurrentUserQuery(username);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubcribeMutation();

  const toggleSubscribe = async () => {
    try {
      setSub(!sub);
      if (sub) {
        await unsubscribe({ username });
      } else {
        await subscribe({ username });
      }
      refetch();
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  const canEditProfile = profilename === username;

  return (
    <div className="flex justify-center items-center">
      <FaUserCircle size={"140px"} />
      <div className="flex flex-col ml-16">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl mr-2 ">{userData.username}</h1>
          <div className="border-solid border-2 border-gray-400 rounded px-4 mt-2 ml-2 mr-2">
            {canEditProfile ? (
              "Edit profile"
            ) : (
              <button onClick={toggleSubscribe}>
                {sub ? "Unsubscribe" : "Subscribe"}
              </button>
            )}
          </div>

          <button className="border-solid border-2 border-gray-400 rounded mt-2 mr-2">
            <MdOutlineArrowDropDown size={"24px"} />
          </button>
          <button className="mt-2">
            <BsThreeDots />
          </button>
        </div>
        <div className="flex items-center mt-3 mb-2">
          <UserDetails details={userData.posts?.length} text={"posts"} />
          <UserDetails
            details={userData.subscribers?.length}
            text={"subscribers"}
          />
          <UserDetails
            details={userData.subscriptions?.length}
            text={"subscriptions"}
          />
        </div>
        <span className="my-1">
          {userData.firstName} {userData.lastName}
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
