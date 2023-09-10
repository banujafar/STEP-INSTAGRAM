import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../store/feedSlice'; 

const UserCardSuggestion = ({ user, currentUser, token }) => {
  const dispatch = useDispatch();
  const isFollowing = currentUser.following.includes(user.username);

  const handleFollowClick = () => {
    if (isFollowing) {
      dispatch(unfollowUser(user.username, token));
    } else {
      dispatch(followUser(user.username, token));
    }
  };

  return (
    <div className='flex justify-between'>
      <UserProfileCard bio={user.bio} username={user.username} imageUrl={user.imageUrl} />
      <p
        className={`${
          isFollowing
            ? 'absolute top-35 right-1/2 transform -translate-x-1/2 text-blue-700 font-bold text-base'
            : 'absolute top-25 right-1/2 text-black font-bold text-base'
        }`}
        onClick={handleFollowClick}
      >
        {isFollowing ? <p>Unfollow</p> : <p>Follow</p>}
      </p>
    </div>
  );
};

export default UserCardSuggestion;
