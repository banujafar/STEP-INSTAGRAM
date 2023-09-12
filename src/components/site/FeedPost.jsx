import { useState, useRef } from "react";
import UserProfileCard from "./UserProfileCard ";
import Comment from "../../assets/icons/comment.svg";
import Save from "../../assets/icons/save.svg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const FeedPost = ({
  userName,
  imageUrl,
  location,
  postImageUrl,
  caption,
  comments,
  likes,
  postId,
}) => {
  const { username, token } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(
    likes?.some((like) => like.authorUsername === username)
  );

  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState(comments);
  const [likeCount, setLikeCount] = useState(likes.length);
  const commentInputRef = useRef(null);

  const handleLike = async () => {
    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/post/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId }),
        }
      );

      if (response.ok) {
        setLiked(true);
        setLikeCount(likeCount + 1);
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
        setLikeCount(likeCount - 1);
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

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/post/comment?commentId=${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove the deleted comment from the state
        setPostComments(
          postComments.filter((comment) => comment.commentId !== commentId)
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // const handleShowAllComments = () => {
  //   setShowAllComments(true);
  // };

  const handleCommentIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="border border-gray-300 bg-white py-1 rounded-md shadow-md mb-4 w-[40%]">
      <UserProfileCard
        username={userName}
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
        <div className="flex items-center">
          <button className="mr-2 hover:opacity-60 duration-300" onClick={toggleLike}>
            {liked ? (
              <AiFillHeart style={{ color: "red" }} size={30} />
            ) : (
              <AiOutlineHeart size={30} />
            )}
          </button>
          <button onClick={handleCommentIconClick}>
            <img src={Comment} alt="Comment" />
          </button>
        </div>
        <div>
          <img src={Save} alt="Save" />
        </div>
      </div>
      {likes.length > 0 && (
        <p className="p-2">{`liked by ${likes[0].authorUsername} and ${
          likeCount - 1
        } others`}</p>
      )}
      <div className="p-2">
     { caption &&  <div className="flex items-center">
          <span className="text-neutral-800 text-[14px] font-semibold leading-[18px]">
            {userName}
          </span>
          <span className="text-neutral-800 text-opacity-60 text-[14px] font-normal ml-2 leading-[18px]">
            {caption}
          </span>
        </div>}
        <div className="mt-2">
          {postComments
            .slice(0, showAllComments ? undefined : 1)
            .map((comment) => (
              <div key={comment.commentId} className="mb-1 flex justify-between">
                <div>
                   <span className="font-semibold">{comment.authorUsername}</span>:{" "}
              {comment.text}
                </div>
             
              {comment.authorUsername === username && (
                <button onClick={() => handleDeleteComment(comment.commentId)} className="hover:opacity-60 duration-300">
                  <RiDeleteBin6Line size={20} />
                </button>
              )}
            </div>
            ))}
          {postComments.length > 1 && (
            <button
              onClick={handleShowAllComments}
              className="text-blue-500 font-semibold cursor-pointer"
            >
              {showAllComments ? "Show Less" : "Show More"}
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

          <button onClick={handleComment} className=" cursor-pointer hover:opacity-60 duration-300">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
