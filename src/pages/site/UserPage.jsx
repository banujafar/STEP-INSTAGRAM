import React from "react";
import {  useSelector } from "react-redux";

import { PostList, UserInfo } from "../../components/features/UserProfile";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";

const UserPage = () => {

  const {username} = useSelector(state => state.auth)
  const {isLoading, isError,  error} = useGetCurrentUserQuery(username)


  return (
    <div className="my-16">
      {isLoading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : isError ? (
        <div className="flex justify-center items-center">
          Error happened: {error.data.detail}
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
