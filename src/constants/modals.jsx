import PostModal from "../components/modals/PostModal";

export const modalsData = [
  {
    name: "post modal",
    element: ({ postId }) => <PostModal postId={postId} />,
  },
];
