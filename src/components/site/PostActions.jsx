import React from "react";
import {
  FaHeart,
  FaRegComment,
  FaBookmark,
  FaUserCircle,
} from "react-icons/fa";
import { BsBookmark, BsDownload } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const IconSection = ({ icons, count }) => (
  <div className="flex  space-x-2 justify-start flex-col">
    <div className="flex items-center space-x-2">
      {icons.map(({ icon }, index) => (
        <button
          className="flex items-center space-x-2 text-gray-600"
          key={index}
        >
          {icon}
        </button>
      ))}
    </div>
    {count && <span className="mt-2">{count} likes</span>}
  </div>
);

const CommentSection = ({ comments, authorUsername, caption }) => (
  <div className="flex gap-2 items-center px-4 pt-4">
    {!!comments.length ? (
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

const PostActions = ({ likesCount, comments, authorUsername, caption }) => (
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
      <div className="flex items-center space-x-4 ">
        <IconSection
          icons={[
            { icon: <AiOutlineHeart className="text-2xl" /> },
            {
              icon: <FaRegComment className="text-2xl" />,
            },
            { icon: <BsDownload className="text-2xl" /> },
          ]}
          count={likesCount}
        />
      </div>
      <IconSection icons={[{ icon: <BsBookmark className="text-2xl" /> }]} />
    </div>
  </>
);

export default PostActions;
