import React from "react";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";
import UserInfo from "../../components/site/UserInfo";
import PostList from "../../components/site/PostList";
import { useParams } from "react-router";

const UserPage = () => {
  const { username } = useParams();
  
  const { isLoading, isError, error, data } = useGetCurrentUserQuery(username);

  
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
          <UserInfo userData={data?.data} />
          <PostList userData={data?.data} />
        </>
      )}
    </div>
  );
};

export default UserPage;
