import { useState, useEffect, useCallback } from "react";
import { IPostResponse } from "../types/getPost";
import { IUsersResponse } from "../types/getUsers";
import renameKey from "../utils/renameKey";
import { IMergedPostsUsers } from "./userPost.interface";

const usePost = (limit = 10, offset = 10) => {
  const [posts, setPosts] = useState<IMergedPostsUsers[]>([]);
  const [mergedPostsUsers, setMergedPostsUsers] = useState<IMergedPostsUsers[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [hasNext, setHasNext] = useState(true);

  const EMPTY_MERGED_ARRAY_LENGTH = 0;

  const fetchPost = () => fetch("https://jsonplaceholder.typicode.com/posts");

  const fetchUsers = () => fetch("https://jsonplaceholder.typicode.com/users");

  const removeId = (arr: IUsersResponse, id: number) => {
    const obj = [...arr].filter((item) => item.id === id);
    return renameKey("id", "hola", obj[0]);
  };

  const mergePostsUsers = useCallback(
    (posts: IPostResponse, users: IUsersResponse) => {
      return posts.map((post) =>
        Object.assign(post, removeId(users, post.userId))
      );
    },
    []
  );

  const fetchPostsUsers = async () => {
    setIsLoading(true);
    try {
      const response = await Promise.all([fetchPost(), fetchUsers()]);

      const [postsData, usersData] = await Promise.all(
        response.map((res) => res.json())
      );

      const merged = mergePostsUsers(postsData, usersData);

      setMergedPostsUsers(merged);
      setPosts(merged.slice(offset - limit, offset));
    } catch (error) {
      setIsError(true);
      setError("Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsUsers();
  }, []);

  useEffect(() => {
    if (mergedPostsUsers.length === EMPTY_MERGED_ARRAY_LENGTH) return;

    if (offset - limit >= mergedPostsUsers.length) {
      return setHasNext(false);
    }

    setPosts((prev) => [
      ...prev,
      ...mergedPostsUsers.slice(offset - limit, offset),
    ]);
  }, [offset]);

  return { posts, isLoading, isError, error, hasNext };
};

export default usePost;
