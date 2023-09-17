import AddPostModal from "../components/modals/AddPostModal";
import DeletePostModal from "../components/modals/DeletePostModal";
import PostModal from "../components/modals/PostModal";

export const modalsData = [
  {
    name: "post modal",
    element: ({ postId }) => <PostModal postId={postId} />,
  },
  {
    name: "add-post",
    element: AddPostModal,
  },
  {
    name: "delete-post",
    element: DeletePostModal
  },
];
