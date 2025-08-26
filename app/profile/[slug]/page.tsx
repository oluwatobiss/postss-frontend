"use client";
import { use, useContext } from "react";
import { UserDataContext } from "../../_components/Contexts";
import { GetFetcherOptions, PostProps } from "@/app/_types";
import useSWR from "swr";
import Image from "next/image";
import PostCard from "../../_components/PostCard";

async function getPosts({ url, userToken }: GetFetcherOptions) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return await response.json();
}

export default function Profile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const userDataContext = useContext(UserDataContext);
  const userToken = userDataContext.userToken;
  const userId = userDataContext.userData.id;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts/authors/${userId}`;
  const { data, error, isLoading } = useSWR({ url, userToken }, getPosts);

  return (
    <>
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
      {data?.map((post: PostProps) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
