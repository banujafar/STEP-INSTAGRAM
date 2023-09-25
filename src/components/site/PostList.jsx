import { BsFillFilePersonFill, BsPersonCircle } from "react-icons/bs";
import PostCard from "./PostCard";
import { AiOutlineInsertRowAbove } from "react-icons/ai";
import React, { useState } from "react";

const PostList = ({ userData }) => {
  const posts = userData.posts;
  const copiedPosts = posts ? [...posts] : [];
  copiedPosts.sort((a, b) => b.timestamp - a.timestamp);
  const [isActive, setIsActive] = useState("POSTS");
  const handleChange = (option) => {
    setIsActive(option);
  };

  return (
    <div className="post-list flex flex-wrap w-full justify-start max-w-4xl mx-auto z-10 border-t-2 relative">
      <ul className="flex absolute top-0 left-96 mt-3">
        <li
          className={`mr-12 flex gap-1 justify-center items-center cursor-pointer ${
            isActive === "POSTS" ? "text-black font-bold" : ""
          }`}
          onClick={() => handleChange("POSTS")}
        >
          <AiOutlineInsertRowAbove size={20} />
          POSTS
        </li>
        <li
          className={`flex gap-1 justify-center items-center cursor-pointer ${
            isActive === "TAGGED" ? "text-black font-bold" : ""
          }`}
          onClick={() => handleChange("TAGGED")}
        >
          <BsFillFilePersonFill />
          TAGGED
        </li>
      </ul>
      {isActive === "POSTS" ? (
        !!copiedPosts.length ? (
          copiedPosts?.map((post, index) => (
            <PostCard key={index} post={post} data-testid="post-card" />
          ))
        ) : (
          <div className="w-full h-60 mt-12 flex flex-col items-center justify-center ml-8 text-2xl">
            <span className="font-bold">No Posts Yet</span>
          </div>
        )
      ) : (
        <div className="w-full h-60 mt-12 flex flex-col items-center justify-center ml-8 ">
          <BsPersonCircle size={32} />
          <span className="font-bold mt-2">No Photos</span>
        </div>
      )}
    </div>
  );
};
export default PostList;
