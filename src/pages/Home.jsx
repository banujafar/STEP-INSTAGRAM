import React, { useEffect } from "react";
import { getUsers } from "../store/actions/userList";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";

const Home = () => {
  const { users, loading, error } = useSelector((state) => state.userList);
    const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, []);
  return (
    <div>
      {!!loading && <h1 className="px-3 py-4 rounded-md bg-yellow-500 text-like-white flex items-center justify-center text-3xl font-semibold">Loading...</h1>}
      {!!error && <h1>Something went wrong</h1>} 
      {!!users &&
        users.map((user) => (
          <div>
            <p>
              {user.id}. {user.firstName} {user.lastName}
            </p>
            <p>Followers: {user.followers}</p>
            <br />
            <br />
          </div>
        ))}
    </div>
  );
};

export default Home;
