import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Comment = ({ comment }) => (
    <div className="mt-2 flex items-center gap-2 p-4">
      <FaUserCircle size={"30px"} />
      <p className="text-l">
        <span className="font-semibold mr-2">{comment.authorUsername}</span>
        <span>{comment.text}</span>
      </p>
    </div>
  );
  export default Comment