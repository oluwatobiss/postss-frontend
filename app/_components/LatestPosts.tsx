"use client";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "./Contexts";
import { PostProps } from "@/app/_types";
import { socket } from "../_socket";
import useSWRMutation from "swr/mutation";
import PostCard from "./PostCard";

async function getPosts(url: string, { arg }: { arg: { userToken: string } }) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

export default function LatestPosts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`;
  const [posts, setPosts] = useState<PostProps[]>([]);
  const userDataContext = useContext(UserDataContext);
  const userToken = userDataContext.userToken;
  const { trigger, error, isMutating } = useSWRMutation(url, getPosts);

  function updatePosts(dbPosts: PostProps[]) {
    setPosts(dbPosts);
  }

  useEffect(() => {
    (async function getInitialPosts() {
      const result = await trigger({ userToken });
      setPosts(result);
    })();
  }, []);

  useEffect(() => {
    // On getting a newPost event from the server, update the list of latest posts
    const onNewPost = (latestPosts: PostProps[]) => setPosts(latestPosts);
    socket.on("newPost", onNewPost);
    return () => {
      socket.off("newPost", onNewPost);
    };
  }, []);

  if (isMutating) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {posts.map((post: PostProps) => (
        <PostCard key={post.id} post={post} setPosts={updatePosts} />
      ))}
    </>
  );
}
