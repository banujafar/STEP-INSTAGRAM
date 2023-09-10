import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserFeed } from "../../store/feedSlice";

import FeedPost from "../../components/site/FeedPost";
import Suggestions from "../../components/site/Suggestions";
import { handleDeleteModal } from "../../utils/modal";

const Home = (props) => {
  console.log(props)
  const dispatch = useDispatch();
  const { feedData, loading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchUserFeed());
    handleDeleteModal()
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
    <div className="col-start-2 col-span-2">
      {feedData.map((post) => (
        <FeedPost
          key={post.postId}
          username={post.authorUsername}
          imageUrl={post.imageUrl}
          location={post.location}
          postImageUrl={post.imageUrl}
          caption={post.caption}
          comments={post.comments}
          likes={post.likes}
          postId={post.postId}
          history={props.history}
        />
      ))}
    </div>
    <div className="col-start-3 col-span-1">
      <Suggestions />
    </div>
  </div>
  
  
  );
};

export default Home;
