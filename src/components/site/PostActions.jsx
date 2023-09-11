import { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegComment,
  FaBookmark,
  FaUserCircle,
} from "react-icons/fa";
import { BsBookmark, BsDownload } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  useDeletePostMutation,
  useGetCurrentPostQuery,
  useLikePostMutation,
} from "../../store/api/postApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const IconSection = ({ icons, count }) => (
  <div className="flex   justify-start flex-col">
    <div className="flex items-center space-x-4">
      {icons.map(({ icon }, index) => (
        <button className="flex items-center  text-gray-600" key={index}>
          {icon}
        </button>
      ))}
    </div>
  </div>
);

const CommentSection = ({ comments, authorUsername, caption }) => (
  <div className="flex gap-2 items-center px-4 pt-4">
    {!!comments ? (
      <>
        <FaUserCircle size={"32px"} />
        <p className="text-l">
          <span className="font-semibold mr-2">{authorUsername}</span>
          <span>{caption}</span>
        </p>
      </>
    ) : (
      <span className="text-center w-full">No comments yet</span>
    )}
  </div>
);

const Comment = ({ comment }) => (
  <div className="mt-2 flex items-center gap-2 p-4">
    <FaUserCircle size={"30px"} />
    <p className="text-l">
      <span className="font-semibold mr-2">{comment.authorUsername}</span>
      <span>{comment.text}</span>
    </p>
  </div>
);

const PostActions = ({ likes, comments, authorUsername, caption, postId }) => {
  const [likePost] = useLikePostMutation();
  const { username } = useSelector((state)=>state.auth);
  const liked = likes.filter((item) => item.authorUsername === username);
  const [isLiked, setIsLiked] = useState(() =>
    liked.length === 0 ? false : true
  );
  const [deletePost] = useDeletePostMutation();
  const { refetch } = useGetCurrentPostQuery(postId);

  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      await deletePost({ postId }).unwrap();
    } else {
      await likePost({ postId }).unwrap();
    }
    refetch();
  };

  return (
    <>
      <CommentSection
        comments={comments}
        authorUsername={authorUsername}
        caption={caption}
      />

      <div className="border-b-gray-100 border-b-2 pb-20 h-full ">
        {!!comments &&
          comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
      </div>
      <div className="flex justify-between space-x-4 w-full px-4 mt-2">
        <div className="flex">
          <div className="flex flex-col">
            <button
              className="flex  space-x-2 text-gray-600"
              onClick={toggleLike}
            >
              {isLiked ? (
                <AiFillHeart className="text-2xl" />
              ) : (
                <AiOutlineHeart className="text-2xl" />
              )}
            </button>
            {!!likes?.length && (
              <span className="mt-2">{likes.length} likes</span>
            )}
          </div>
          <IconSection
            icons={[
              {
                icon: <FaRegComment className="text-2xl" />,
              },
              { icon: <BsDownload className="text-2xl" /> },
            ]}
            count={likes.length}
          />
        </div>
        <IconSection icons={[{ icon: <BsBookmark className="text-2xl" /> }]} />
      </div>
    </>
  );
};
export default PostActions;
