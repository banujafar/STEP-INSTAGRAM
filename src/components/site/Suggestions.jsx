import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCardSuggestion from "../../components/site/UserCardSuggestion";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";
import Footer from "./Footer";
const Suggestions = () => {
  const { username } = useSelector((state) => state.auth);
  const { isLoading, isError, error, data } = useGetCurrentUserQuery(username);


  const [subscribers, setSubscribers] = useState([]);
  const [nonSubscribers, setNonSubscribers] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError) {
      const subscribedUsernames = data.data.subscribers.map((user) => user.username);
    
      const subscribersList = data.data.subscriptions.filter((user) =>
        subscribedUsernames.includes(user.username)
      );

      const nonSubscribersList = data.data.subscribers.filter(
        (user) => !subscribersList.includes(user.username)
      );
    
      setSubscribers(subscribersList);
      setNonSubscribers(nonSubscribersList);
    }
    
    
  }, [isLoading, isError, data]);

  return (
    <div className="w-[70%]  px-4 flex flex-col gap-6">
      <div className="border border-gray-300 rounded-md max-h-[250px] w-[100%] overflow-y-auto">
        <h2 className="text-lg font-semibold px-4 pt-2">Subscribers</h2>
        {isLoading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : isError ? (
          <div className="flex justify-center items-center">
            Error happened: {error.data.detail}
          </div>
        ) : (
          <>
            {subscribers.map((user, index) => {
              return (
                <div key={index} className="mb-4">
                  <UserCardSuggestion user={user} isSubscriber={true} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="border border-gray-300 rounded-md max-h-[250px] w-[100%] overflow-y-auto">
        <h2 className="text-lg font-semibold px-4 pt-2">Non-Subscribers</h2>
        {isLoading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : isError ? (
          <div className="flex justify-center items-center">
            Error happened: {error.data.detail}
          </div>
        ) : (
          <>
            {nonSubscribers.map((user, index) => {
              return (
                <div key={index} className="mb-4">
                  <UserCardSuggestion user={user} isSubscriber={false} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Suggestions;