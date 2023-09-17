import React, { useCallback } from "react";
import ModalHeader from "./ModalHeader";
import { handleDeleteModal } from "../../utils/modal";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const DeletePostModal = ({ data: postId }) => {
  const { token } = useSelector((state) => state.auth);
  const handleDelete = useCallback(async () => {
    try {
      await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/post?postId=${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Post was deleted successfully!");
      window.location.reload()
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [toast, postId, token]);
  return (
    <div className="bg-white w-96  rounded-xl">
      <ModalHeader isBack={false} isNext={false} label={"Delete Post"} />

      <div className="flex flex-col items-center justify-center p-10 gap-y-10">
        <p className="text-lg font-semibold text-slate-700">
          Are you sure to delete this post?
        </p>
        <div className="flex items-center justify-center gap-x-3 font-medium">
          <button
            onClick={handleDelete}
            className="border w-[100px] py-2 rounded-md border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500 transition-all"
          >
            Yes
          </button>
          <button
            onClick={handleDeleteModal}
            className="border w-[100px] py-2 rounded-md border-slate-500 bg-slate-500 text-white hover:bg-white hover:text-slate-500 transition-all"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
