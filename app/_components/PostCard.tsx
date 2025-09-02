"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { PostDialogContext, UserDataContext } from "./Contexts";
import { svg } from "../_svg";
import { DeleteFetcherOptions, PostCardProps } from "@/app/_types";
import Image from "next/image";
import Date from "./Date";
import LikeBtn from "./LikeBtn";
import ReplyBtn from "./ReplyBtn";
import useSWRMutation from "swr/mutation";

async function deletePost(url: string, { arg }: { arg: DeleteFetcherOptions }) {
  const response = await fetch(`${url}/${arg.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

export default function PostCard({ comment, commentSum, post }: PostCardProps) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`;
  const router = useRouter();
  const openPostDialog = useContext(PostDialogContext);
  const { userToken, userData } = useContext(UserDataContext);
  const { trigger } = useSWRMutation(url, deletePost);

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
    if (post) {
      const isLikeBtn = (e.target as HTMLElement).closest(".likeBtn");
      const replyBtn = (e.target as HTMLElement).closest(".replyBtn");
      const isDeleteBtn = (e.target as HTMLElement).closest(".deleteBtn");
      replyBtn && openPostDialog({ isNewPost: false, post });
      !isLikeBtn &&
        !replyBtn &&
        !isDeleteBtn &&
        router.push(`/post/${post.id}`);
    }
  }

  return (
    <div
      className="w-full px-6 py-3 grid grid-cols-[48px_minmax(0,1fr)] not-first:border-t-[.5px] not-first:border-t-[rgba(243,245,247,.15)]"
      onClick={handlePostCardClick}
    >
      <span className="select-none pt-1 size-9 bg-[rgb(30,30,30)] rounded-full">
        <Image
          src="https://avatar.iran.liara.run/public"
          alt={post?.author || comment?.author || ""}
          width={500}
          height={500}
          className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation"
        />
      </span>
      <span>
        <div className="flex gap-x-2 overflow-y-hidden whitespace-nowrap text-ellipsis leading-5">
          <span className="font-semibold">
            {post?.author || comment?.author}
          </span>
          {(post?.id || comment?.id) && (
            <Date
              styles="text-[rgb(119,119,119)]"
              date={`${post?.createdAt || comment?.createdAt}`}
            />
          )}
        </div>
        <div className="mt-1 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
          {post?.content || comment?.content}
        </div>
        <div className="mt-2 h-9 flex text-[#ccc] [&_button]:mr-3 [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:cursor-pointer [&_button]:px-3 [&_button]:rounded-3xl [&_button]:hover:bg-[rgba(255,255,255,0.08)]">
          <LikeBtn
            commentId={comment?.id}
            postId={post?.id}
            likes={post?.likes || comment?.likes || []}
          />
          {post && (
            <ReplyBtn
              hasReply={!!commentSum || !!post.comments}
              total={commentSum || post.comments}
            />
          )}
          {userToken && userData.status === "ADMIN" && (
            <button
              className="deleteBtn"
              onClick={() => trashPost(post?.id || comment?.id || 0)}
            >
              {svg.delete}
            </button>
          )}
        </div>
      </span>
    </div>
  );
}
