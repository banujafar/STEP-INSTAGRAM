import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useGetCurrentPostQuery } from "../../store/api/postApiSlice";
import PostActions from "../site/PostActions/PostActions";
import AddComment from "../site/PostActions/AddComment";

const UserProfile = ({ username }) => (
  <div className="flex gap-2 items-center">
    <FaUserCircle size={"26px"} />
    <h1 className="text-xl font-semibold">{username}</h1>
  </div>
);

const PostModal = () => {
  const { modals } = useSelector((state) => state.modal);
  const { postId } = modals[0].data;
  const { data } = useGetCurrentPostQuery(postId);

  if (!data) {
    return null;
  }

  const { authorUsername, imageUrl, caption, comments, likes } = data.data;

  return (
    <div className="fixed z-50 left-48 top-5 bottom-5 w-3/4">
      <div className="bg-white md:max-w-2xl lg:max-w-6xl h-full rounded-lg overflow-hidden shadow-lg flex mx-auto">
        <img src={imageUrl} alt="Post" className="w-2/3 bg-center bg-cover" />

        <div className="w-1/3 flex flex-col justify-between ">
          <div className="flex items-center space-x-2 justify-between p-4 border-b-gray-100 border-b-2">
            <UserProfile username={authorUsername} />
            <button className="ml-auto">
              <BsThreeDots className="text-gray-600" />
            </button>
          </div>
          <PostActions
            authorUsername={authorUsername}
            caption={caption}
            likes={likes}
            comments={comments}
            postId={postId}
          />
          <AddComment postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
