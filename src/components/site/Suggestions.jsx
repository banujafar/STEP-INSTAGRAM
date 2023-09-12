import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCardSuggestion from "../../components/site/UserCardSuggestion";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";

const Suggestions = () => {
  const { username } = useSelector((state) => state.auth);
  const { isLoading, isError, error, data } = useGetCurrentUserQuery(username);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : isError ? (
        <div className="flex justify-center items-center">
          Error happened: {error.data.detail}
        </div>
      ) : (
        <>
          {data.data.subscribers.map((user, index) => {
            return <UserCardSuggestion user={user} key={index} currentUser={data.data} />;
          })}
        </>
      )}
    </div>
  );
};

export default Suggestions;
