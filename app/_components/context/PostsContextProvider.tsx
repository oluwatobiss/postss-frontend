"use client";
import { useContext, useEffect, useState } from "react";
import { ChildrenProps, PostProps } from "@/app/_types";
import { UserTokenNDataContext, PostsContext } from "./Contexts";
import { defaultPost } from "../../_defaultContexts";
import { socket } from "../../_socket";
import useSWRMutation from "swr/mutation";
import getData from "@/app/_getData";

export function PostsContextProvider({ children }: ChildrenProps) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`;
  const [posts, setPosts] = useState<PostProps[]>([defaultPost]);
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken } = userTokenNData;
  const { trigger, error, isMutating } = useSWRMutation(
    { url, userToken },
    getData
  );

  function updatePostCommentSum(postId: number, commentSum: number) {
    const updatedPosts = posts.map((p) =>
      p.id === postId ? { ...p, comments: commentSum } : p
    );
    setPosts(updatedPosts);
  }

  useEffect(() => {
    // On getting a newPost or deletePost event from the server, update the list of posts
    const updateList = (updatedList: PostProps[]) => setPosts(updatedList);
    socket.on("newPost", updateList);
    socket.on("deletePost", updateList);
    return () => {
      socket.off("newPost", updateList);
      socket.off("deletePost", updateList);
    };
  }, []);

  useEffect(() => {
    if (userToken) {
      (async function getInitialPosts() {
        const result = await trigger();
        setPosts(result);
      })();
    }
  }, [userToken]);

  if (isMutating) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <PostsContext value={{ posts, updatePostCommentSum }}>
      {children}
    </PostsContext>
  );
}
