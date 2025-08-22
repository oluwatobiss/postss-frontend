"use client";
import { useContext } from "react";
import { UserDataContext } from "./Contexts";
import { GetFetcherOptions, PostProps } from "@/app/_types";
import useSWR from "swr";
import PostCard from "./PostCard";

async function getPosts({ url, userToken }: GetFetcherOptions) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return await response.json();
}

export default function LatestPosts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`;
  const userDataContext = useContext(UserDataContext);
  const userToken = userDataContext.userToken;
  const { data, error, isLoading } = useSWR({ url, userToken }, getPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {data.map((post: PostProps) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
