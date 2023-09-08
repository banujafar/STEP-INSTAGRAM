import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userProfileSlice";
import { PostList, UserInfo } from "../../components/features/UserProfile";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userProfile);
  const userName = "alexbird"; //TODO!! will be changed,

  useEffect(() => {
    dispatch(fetchUser(userName));
  }, [dispatch]);

  return (
    <div className="my-16">
      {loading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : error ? (
        <div className="flex justify-center items-center">
          Error happened: {error}
        </div>
      ) : (
        <>
          <UserInfo />
          <PostList />
        </>
      )}
    </div>
  );
};

export default UserPage;
