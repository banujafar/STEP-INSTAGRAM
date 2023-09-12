import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetCurrentUserQuery,
  useSubscribeMutation,
  useUnsubcribeMutation,
} from '../../store/api/userApiSlice'
import UserProfileCard from '../../components/site/UserProfileCard '
const UserCardSuggestion = ( user, currentUser ) => {
  console.log(currentUser, ' cur');
  const [sub, setSub] = useState(currentUser?.subscribers?.some((data) => data.username === user.user.username));
  const userName = useSelector((state) => state.auth.username);
  const { refetch } = useGetCurrentUserQuery(userName);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubcribeMutation();

  const {username} = user.user
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
    <div className='flex justify-between items-center '>
      
      <UserProfileCard username={username} />
      <p
        className={`${
          sub
            ? 'absolute top-35 right-1/2 transform -translate-x-1/2 text-blue-700 font-bold text-base'
            : 'absolute top-25 right-1/2 text-black font-bold text-base'
        }`}
        onClick={toggleSubscribe}
      >
        {sub ? <p>Unsubscribe</p> : <p>Subscribe</p>}
      </p>
    </div>
  );
};

export default UserCardSuggestion;
