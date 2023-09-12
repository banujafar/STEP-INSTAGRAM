import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { handleAppendModal } from "../../utils/modal";
import IconSection from "./PostActions/IconSection";
const PostCard = ({ post }) => {
  return (
    <div
      className="w-64 h-60 mr-6 mt-12"
      onClick={() => handleAppendModal("post modal", { postId: post.postId })}
    >
      <div className="w-full h-full relative group/item shadow-lg cursor-pointer">
        <img src={post.imageUrl} className="w-full h-full" alt="Post" />
        <div className="bg-opacity-0 hover:bg-black-rgba transition-all duration-500 w-full h-full absolute left-0 top-0">
          <span className="group/edit invisible group-hover/item:visible absolute left-1/3 top-1/2 flex">
            <IconSection
              icons={[
                {
                  icon: <AiFillHeart className="text-2xl" fill="white" />,
                  count: post.likes?.length,
                },
                {
                  icon: <FaComment className="text-2xl" fill="white" />,
                  count: post.comments?.length,
                },
              ]}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
