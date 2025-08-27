"use client";
import { useContext, useEffect } from "react";
import { UserDataContext } from "./Contexts";
import { svg } from "../_svg";
import { DeleteFetcherOptions, PostProps, PostCardProps } from "@/app/_types";
import { socket } from "../_socket";
// import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import Date from "./Date";
import LikeBtn from "./LikeBtn";

async function deletePost(url: string, { arg }: { arg: DeleteFetcherOptions }) {
  const response = await fetch(`${url}/${arg.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

export default function PostCard({ post, setPosts }: PostCardProps) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`;
  const { userToken, userData } = useContext(UserDataContext);
  const { trigger } = useSWRMutation(url, deletePost);

  // const router = useRouter();

  async function trashPost(id: number) {
    try {
      if (confirm("Delete post permanently?")) {
        const result = await trigger({ id, userToken });
        if (result.message) {
          alert("Error: Invalid delete credentials");
          throw new Error(result.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  function handlePostCardClick(e: React.MouseEvent<HTMLElement>) {
    console.log("=== Toggle Like ===");
    console.log("The toggleLike button");

    // const isLikeBtn = (e.target as HTMLElement).closest(".likeBtn");
    // isLikeBtn
    //   ? console.log("Like button clicked!")
    //   : router.push("/post/testing123");
  }

  useEffect(() => {
    // On getting a newPost event from the server, update the list of latest posts
    const onDeletePost = (updatedList: PostProps[]) => setPosts(updatedList);
    socket.on("deletePost", onDeletePost);
    return () => {
      socket.off("deletePost", onDeletePost);
    };
  }, []);

  return (
    <div
      className="w-full px-6 py-3 grid grid-cols-[48px_minmax(0,1fr)] not-first:border-t-[.5px] not-first:border-t-[rgba(243,245,247,.15)]"
      onClick={handlePostCardClick}
    >
      <span className="select-none pt-1 size-9 bg-[rgb(30,30,30)] rounded-full">
        <Image
          src="https://avatar.iran.liara.run/public"
          alt="codesweetly"
          width={500}
          height={500}
          className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation"
        />
      </span>
      <span>
        <div className="flex gap-x-2 overflow-y-hidden whitespace-nowrap text-ellipsis leading-5">
          <span className="font-semibold">{post.author}</span>
          <Date styles="text-[rgb(119,119,119)]" date={`${post.createdAt}`} />
        </div>
        <div className="mt-1 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
          {post.content}
        </div>
        <div className="mt-2 h-9 flex text-[#ccc] [&_button]:mr-3 [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:cursor-pointer [&_button]:px-3 [&_button]:rounded-3xl [&_button]:hover:bg-[rgba(255,255,255,0.08)]">
          <LikeBtn postId={post.id} likes={post.likes} />
          <button>
            <div className="flex gap-x-1">
              {svg.chat}
              {!!post.comments && <span>{post.comments}</span>}
            </div>
          </button>
          {userToken && userData.status === "ADMIN" && (
            <button onClick={() => trashPost(post.id)}>{svg.delete}</button>
          )}
        </div>
      </span>
    </div>
  );
}
