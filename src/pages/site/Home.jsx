import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFeed } from "../../store/feedSlice";
import UserCardSuggestion from "../../components/site/UserCardSuggestion";
import FeedPost from "../../components/site/FeedPost";
import Suggestions from "../../components/site/Suggestions";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const { isLoading, isError, data } = useGetCurrentUserQuery(username);

  const { feedData, loading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchUserFeed());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 my-4">

      <div className="col-start-1 col-span-1"></div>


      <div className="col-start-2 col-span-1">
        {feedData.map((post) => (
          <FeedPost
            key={post.postId}
            userName={post.authorUsername}
            imageUrl={post.imageUrl}
            location={post.location}
            postImageUrl={post.imageUrl}
            caption={post.caption}
            comments={post.comments}
            likes={post.likes}
            postId={post.postId}
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
