import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark, BsDownload } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  useDeletePostMutation,
  useGetCurrentPostQuery,
  useLikePostMutation,
} from "../../../store/api/postApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../../../store/api/userApiSlice";
import IconSection from "./IconSection";
import CommentSection from "./CommentSection";

const PostActions = ({ likes, comments, authorUsername, caption, postId }) => {
  const { username } = useParams();
  const profilename = useSelector((state) => state.auth.username);
  const liked = likes.filter((item) => item.authorUsername === profilename);
  const [isLiked, setIsLiked] = useState(() =>
    liked.length === 0 ? false : true
  );
  const [likesCount, setLikesCount] = useState(likes.length);

  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { refetch: refetchUser } = useGetCurrentUserQuery(username);

  const toggleLike = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      await deletePost({ postId });
      setLikesCount((prev) => prev - 1);
    } else {
      await likePost({ postId });
      setLikesCount((prev) => prev + 1);
    }
    refetchUser();
  };

  return (
    <>
      <CommentSection
        comments={comments}
        authorUsername={authorUsername}
        caption={caption}
      />
      <div className="flex justify-between space-x-4 w-full px-4 mt-2">
        <div className="flex">
          <div className="relative">
            <button
              className="flex mr-3 text-gray-600"
              onClick={toggleLike}
              data-testid="toggle-like"
            >
              {isLiked ? (
                <AiFillHeart className="text-2xl" />
              ) : (
                <AiOutlineHeart className="text-2xl" />
              )}
            </button>
            <span
              className="mt-2 absolute top-4 w-64"
              data-testid="likes-count"
            >
              {!!likesCount ? `${likesCount} likes` : "Be first"}
            </span>
          </div>
          <IconSection
            icons={[
              {
                icon: <FaRegComment className="text-2xl" />,
              },
              { icon: <BsDownload className="text-2xl" /> },
            ]}
          />
        </div>
        <IconSection icons={[{ icon: <BsBookmark className="text-2xl" /> }]} />
      </div>
    </>
  );
};
export default PostActions;
