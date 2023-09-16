import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetCurrentUserQuery,
  useSubscribeMutation,
  useUnsubcribeMutation,
} from '../../store/api/userApiSlice'
import UserProfileCard from '../../components/site/UserProfileCard ';
const UserCardSuggestion = ({ user, isSubscriber }) => {
  const currentUserName = useSelector((state) => state.auth.username);
  const { isLoading, isError, error, data } = useGetCurrentUserQuery(currentUserName);
  const currentUser = data.data;
  const [sub, setSub] = useState(isSubscriber); // Initialize with the isSubscriber prop
  const userName = useSelector((state) => state.auth.username);
  const { refetch } = useGetCurrentUserQuery(userName);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubcribeMutation();

  const { username } = user;
  
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

  return (
    <div className="flex justify-between items-center">
      <UserProfileCard username={username} />
      <div className="">
        <p
          className={`${
            sub
              ? 'text-blue-700 font-bold text-base'
              : 'text-black font-bold text-base'
          }`}
          onClick={toggleSubscribe}
        >
          {sub ? 'Unsubscribe' : 'Subscribe'}
        </p>
      </div>
    </div>
  );
};

export default UserCardSuggestion;