"use client";
import { useContext } from "react";
import { CommentsContext, PostsContext } from "./Contexts";
import { PostProps } from "@/app/_types";
import PostCard from "./PostCard";

export default function LatestPosts() {
  const posts = useContext(PostsContext);
  const comments = useContext(CommentsContext);
  function getLatestPosts() {
    return posts.map((post: PostProps) => {
      const postComments = comments.filter((c) => c.postId === post.id);
      return (
        <PostCard key={post.id} commentSum={postComments.length} post={post} />
      );
    });
  }
  return getLatestPosts();
}
