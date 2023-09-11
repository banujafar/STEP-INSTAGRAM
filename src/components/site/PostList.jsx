import PostCard from "./PostCard";

const PostList = ({ userData }) => {
  const posts = userData.posts;
  const copiedPosts = posts ? [...posts] : [];
  copiedPosts.sort((a, b) => b.timestamp - a.timestamp);
  
  return (
    <div className="post-list flex flex-wrap w-full justify-start max-w-4xl mx-auto z-10">
      {copiedPosts?.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};
export default PostList;
