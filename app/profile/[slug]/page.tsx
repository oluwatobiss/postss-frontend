"use client";
import { use, useContext, useRef, useState } from "react";
import { PostsContext, UserDataContext } from "@/app/_components/Contexts";
import { PostProps } from "@/app/_types";
import Image from "next/image";
import PostCard from "@/app/_components/PostCard";

export default function Profile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { userData } = useContext(UserDataContext);
  const { posts } = useContext(PostsContext);
  const [tabPosts, setTabPosts] = useState<PostProps[]>([]);
  const activeTab = useRef("");

  function showUserPosts() {
    activeTab.current = "Posts";
    const userPosts = posts.filter((post) => post.authorId === userData.id);
    setTabPosts(userPosts);
  }

  function showLikedPosts() {
    activeTab.current = "Likes";
    const likedPosts = posts.filter((post) => post.likes.includes(userData.id));
    setTabPosts(likedPosts);
  }

  function getStyle(tab: string) {
    return {
      borderColor:
        activeTab.current === tab ? "#fff" : "rgba(243,245,247,0.15)",
      color: activeTab.current === tab ? "#fff" : "rgb(119,119,119)",
    };
  }

  if (!activeTab.current) showUserPosts();

  return (
    <>
      <div className="grid grid-cols-[repeat(4,1fr)] items-center [&_div]:border-b [&_div]:px-4 [&_div]:h-12 [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:font-semibold">
        <div onClick={showUserPosts} style={getStyle("Posts")}>
          Posts
        </div>
        <div className="border-[rgba(243,245,247,0.15)] text-[rgb(119,119,119)]">
          Subscriptions
        </div>
        <div onClick={showLikedPosts} style={getStyle("Likes")}>
          Likes
        </div>
        <div className="border-[rgba(243,245,247,0.15)] text-[rgb(119,119,119)]">
          Followers
        </div>
      </div>
      <div className="px-6 py-4 flex">
        <Image
          src="https://avatar.iran.liara.run/public"
          alt={slug}
          width={36}
          height={36}
          className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation select-none"
        />
        <div className="mx-2 px-1 flex items-center text-[rgb(119,119,119)] cursor-text grow">
          What&apos;s new?
        </div>
        <div className="h-9 border border-[rgba(243,245,247,0.15)] cursor-pointer font-semibold rounded-xl shrink-0 inline-flex items-center px-4">
          Post
        </div>
      </div>
      {tabPosts.map((post: PostProps) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
