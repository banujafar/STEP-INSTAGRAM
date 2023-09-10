import React, { useState, useEffect, useRef } from "react";
import UserProfileCard from "./UserProfileCard ";
import Heart from "../../assets/icons/heart.svg";
import Comment from "../../assets/icons/comment.svg";
import Save from "../../assets/icons/save.svg";

import HeartFilled from "../../assets/icons/heartFilled.svg";
const FeedPost = ({
  username,
  imageUrl,
  location,
  postImageUrl,
  caption,
  comments,
  likes,
  postId,
}) => {
  const [liked, setLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState(comments);
  const commentInputRef = useRef(null);

  const token = "ec8bd96c25fb46319cdf49779182333c";
  const handleLike = async () => {
    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/post/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ec8bd96c25fb46319cdf49779182333c",
          },
          body: JSON.stringify({ postId }),
        }
      );

      if (response.ok) {
        setLiked(true);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/post/like?postId=${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setLiked(false);
      }
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  const toggleLike = () => {
    if (liked) {
      handleRemoveLike();
      setLiked(false);
    } else {
      handleLike();
      setLiked(true);
    }
  };

  const handleComment = async () => {

    if (!newComment.trim()) {
      return;
    }

    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/post/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId, text: newComment }),
        }
      );

      if (response.ok) {
        const commentData = await response.json();
        setPostComments([...postComments, commentData.data]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  const handleCommentIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };
  

  return (
    <div className="border border-gray-300 bg-white py-1 rounded-md shadow-md mb-4 w-[40%]">
      <UserProfileCard
        username={username}
        imageUrl={imageUrl}
        location={location}
      />
      <div className="mt-4 w-full h-full object-contain">
        <img
          src={postImageUrl}
          alt="Post"
          className="w-full h-[600px] object-cover"
          onDoubleClick={handleLike}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="mt-2 p-2 flex justify-between">
        <div className="">
          <button className="mr-2" onClick={toggleLike}>
            <img src={liked ? HeartFilled : Heart} alt="heart" />
          </button>
          <button onClick={handleCommentIconClick}>
            <img src={Comment} alt="Comment" />
          </button>
        </div>
        <div>
          <img src={Save} alt="Save" />
        </div>
      </div>
      <div className="mt-2 p-2">
        <div className="flex items-center">
          <span className="text-neutral-800 text-[14px] font-semibold leading-[18px]">
            {username}
          </span>
          <span className="text-neutral-800 text-opacity-60 text-[14px] font-normal ml-2 leading-[18px]">
            {caption}
          </span>
        </div>
        <div className="mt-2">
          {postComments
            .slice(0, showAllComments ? undefined : 1)
            .map((comment) => (
              <div key={comment.commentId} className="mb-1">
                <span className="font-semibold">{comment.authorUsername}</span>:{" "}
                {comment.text}
              </div>
            ))}
          {postComments.length > 1 && !showAllComments && (
            <button
              onClick={handleShowAllComments}
              className="text-blue-500 font-semibold cursor-pointer"
            >
              Show more
            </button>
          )}
        </div>
        <div className="mt-3 flex items-center">
          <div className="w-full relative">
            <input
              ref={commentInputRef}
              placeholder="Add a comment..."
              className="w-full h-6 font-roboto bg-transparent p-0 border-none text-gray-600 flex-grow font-inherit h-30 max-h-80 outline-none resize-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></input>
          </div>

          <button
            onClick={handleComment}
            className=" cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
