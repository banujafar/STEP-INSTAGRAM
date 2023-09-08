import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComment, FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";

const PostList = () => {
  const userInfo = useSelector((state) => state.userProfile.userInfo);
  const posts = userInfo.posts;
  console.log(posts);
  return (
    <div className="post-list flex flex-wrap w-full justify-start max-w-4xl mx-auto">
      {posts?.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};
export default PostList;
