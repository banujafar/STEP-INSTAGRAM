import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Comment from "./Comment";

const CommentSection = ({ comments, authorUsername, caption }) => {
  return (
    <>
      <div className="flex gap-2 items-center px-4 pt-4">
        {!!caption && (
          <>
            <FaUserCircle size={"32px"} />
            <p className="text-l">
              <span className="font-semibold mr-2">{authorUsername}</span>
              <span>{caption}</span>
            </p>
          </>
        )}
      </div>
      <div className="border-b-gray-100 border-b-2 pb-20 h-full overflow-y-scroll">
        {!!comments ? (
          comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))
        ) : (
          <span className="text-center w-full">No comments yet</span>
        )}
      </div>
    </>
  );
};
export default CommentSection;
