"use client";
import { useContext, useEffect, useState } from "react";
import { ChildrenProps, PostProps } from "@/app/_types";
import { UserDataContext, PostsContext } from "./Contexts";
import { defaultPost } from "../_defaultContexts";
import { socket } from "../_socket";
import useSWRMutation from "swr/mutation";

async function getPosts(url: string, { arg }: { arg: { userToken: string } }) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

export function PostsContextProvider({ children }: ChildrenProps) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`;
  const [posts, setPosts] = useState<PostProps[]>([defaultPost]);
  const { trigger, error, isMutating } = useSWRMutation(url, getPosts);
  const userDataContext = useContext(UserDataContext);
  const userToken = userDataContext.userToken;

  useEffect(() => {
    (async function getInitialPosts() {
      const result = await trigger({ userToken });
      setPosts(result);
    })();
  }, []);

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

  if (isMutating) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <PostsContext value={posts}>{children}</PostsContext>;
}
