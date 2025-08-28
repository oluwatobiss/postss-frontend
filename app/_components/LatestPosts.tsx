"use client";
import { useContext } from "react";
import { PostsContext } from "./Contexts";
import { PostProps } from "@/app/_types";
import PostCard from "./PostCard";

export default function LatestPosts() {
  const posts = useContext(PostsContext);
  return (
    <>
      {posts.map((post: PostProps) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
