import { useRef, useState, useCallback } from "react";
import usePost from "../../hooks/usePost";
import PostCard from "../PostCard/PostCard";

const InfiniteScroll = () => {
  const [offset, setOffset] = useState(10);

  const LIMIT_POSTS = 10;

  const { posts, isLoading, isError, hasNext } = usePost(LIMIT_POSTS, offset);

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (post: HTMLDivElement) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setOffset((prev) => prev + LIMIT_POSTS);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNext]
  );

  if (isError) return <div className="text-red-600">ocorreu um erro</div>;

  return (
    <div className="flex flex-col gap-20 min-h-screen">
      {posts.map((post, i) => {
        if (posts.length === i + 1)
          return (
            <PostCard
              key={post.id}
              ref={lastPostRef}
              name={post.name}
              username={post.username}
              body={post.body}
              title={post.title}
              userId={post.userId}
              id={post.id}
            />
          );
        return (
          <PostCard
            key={post.id}
            name={post.name}
            username={post.username}
            body={post.body}
            title={post.title}
            userId={post.userId}
            id={post.id}
          />
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
