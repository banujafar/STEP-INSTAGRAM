import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import {
  useGetCurrentUserQuery,
  useSubscribeMutation,
  useUnsubcribeMutation,
} from "../../store/api/userApiSlice";
import ProfileImage from "./ProfileImage";

const UserInfo = ({ userData }) => {
  const { username } = useParams();
  const { username: profilename } = useSelector((state) => state.auth);
  const isCurrentUser = profilename === username;
  const { subscribers, subscriptions, posts, firstName, lastName } = userData;
  const [subscribed, setSubscribed] = useState(
    subscribers.some((data) => data.username === profilename)
  );

  const { refetch: refetchUser } = useGetCurrentUserQuery(username);
  const { data, refetch: refetchOwnAccount } =
    useGetCurrentUserQuery(profilename);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubcribeMutation();

  const imageUrl = posts?.map((post) => post.imageUrl);

  let matchingUsernames = data?.data.subscriptions.map((current) => {
    const matchingSubscription = subscriptions.find(
      (item) => item.username === current.username
    );
    return matchingSubscription ? matchingSubscription.username : null;
  });

  matchingUsernames = matchingUsernames?.filter((username) => username != null);

  const toggleSubscribe = async () => {
    setSubscribed(!subscribed);
    try {
      if (subscribed) {
        await unsubscribe({ username });
      } else {
        await subscribe({ username });
      }
      refetchUser();
      refetchOwnAccount();
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mb-8">
      {!!imageUrl.length ? (
        <ProfileImage
          username={username}
          imageUrl={imageUrl}
          size={32}
          hasStory={true}
        />
      ) : (
        <FaUserCircle size={140} />
      )}

      <div className="flex flex-col ml-16">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl mr-2">{username}</h1>
          <div className="border-solid border-2 border-gray-400 rounded px-4 mt-2 ml-2 mr-2">
            {isCurrentUser ? (
              <span data-testid="edit-profile">Edit profile</span>
            ) : (
              <button onClick={toggleSubscribe}>
                {subscribed ? "Unsubscribe" : "Subscribe"}
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
          <UserDetails details={posts?.length} text={"posts"} />
          <UserDetails details={subscribers?.length} text={"subscribers"} />
          <UserDetails details={subscriptions?.length} text={"subscriptions"} />
        </div>
        <span className="my-1">
          {firstName} {lastName}
        </span>
        {!!matchingUsernames?.length && !isCurrentUser && (
          <span>
            Subscribed by {""}
            {matchingUsernames.slice(0, 3).map((item, index) => (
              <span key={index}>{item} </span>
            ))}
            {matchingUsernames.length > 3 && (
              <span>+{matchingUsernames.length - 3} more</span>
            )}
          </span>
        )}
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
