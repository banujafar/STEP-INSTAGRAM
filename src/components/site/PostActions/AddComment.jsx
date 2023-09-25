import { useState } from "react";
import {
  useAddCommentMutation,
  useGetCurrentPostQuery,
} from "../../../store/api/postApiSlice";
import { useGetCurrentUserQuery } from "../../../store/api/userApiSlice";

const AddComment = ({ postId, username }) => {
  const [newComment, setNewComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const { refetch: refetchUser } = useGetCurrentUserQuery(username);
  const { refetch: refetchPost } = useGetCurrentPostQuery(postId);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await addComment({ postId, text: newComment }).unwrap();
      setNewComment("");
      refetchPost();
      refetchUser();
    } catch (err) {
      console.log("Error happened:", err);
    }
  };
  return (
    <form
      onSubmit={handleComment}
      className="mt-3 flex items-center p-4 justify-center"
    >
      <input
        placeholder="Add a comment..."
        className="w-full h-6 font-roboto bg-transparent p-0 border-none text-gray-600 flex-grow font-inherit h-30 max-h-80 outline-none resize-none"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={() => handleComment} className="cursor-pointer">
        Post
      </button>
    </form>
  );
};
export default AddComment;
