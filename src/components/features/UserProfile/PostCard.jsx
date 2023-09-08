import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <Link to="#" className="w-64 h-60 mr-6 mt-12">
      <div className="w-full h-full relative group/item shadow-lg cursor-pointer">
        <img src={post.imageUrl} className="w-full h-full" alt="Post" />
        <div className="bg-opacity-0 hover:bg-black-rgba transition-all duration-500 w-full h-full absolute left-0 top-0">
          <span className="group/edit invisible group-hover/item:visible absolute left-1/3 top-1/2 flex">
            <LikeButton post={post} />
            <CommentButton post={post} />
          </span>
        </div>
      </div>
    </Link>
  );
};

const LikeButton = ({ post }) => {
  return (
    <span className="flex justify-center text-xl items-center mr-6 group-hover/item:text-white">
      <AiFillHeart className="mr-1" fill="white" size={"25px"} />
      {post.likes.length}
    </span>
  );
};

const CommentButton = ({ post }) => {
  return (
    <span className="flex justify-center text-xl items-center mr-6 group-hover/item:text-white">
      <FaComment fill="white" className="mr-1" size={"25px"} />
      {post.comments.length}
    </span>
  );
};
export default PostCard;
