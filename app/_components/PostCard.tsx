"use client";
import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { CommentProps, PostCardProps } from "@/app/_types";
import {
  PostsContext,
  PostDialogContext,
  UserTokenNDataContext,
} from "./context/Contexts";
import { svg } from "../_svg";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import Date from "./Date";
import LikeBtn from "./LikeBtn";
import ReplyBtn from "./ReplyBtn";
import mutateData from "../_utils/mutateData";

export default function PostCard({ comment, commentSum, post }: PostCardProps) {
  const { slug = 0 } = useParams();
  const router = useRouter();
  const openPostDialog = useContext(PostDialogContext);
  const { updatePostCommentSum } = useContext(PostsContext);
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken, userData } = userTokenNData;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}${
    post ? "/posts" : `/posts/${slug}/comments`
  }`;
  const { trigger } = useSWRMutation(url, mutateData);

  async function trashPost(id: number) {
    try {
      if (confirm(`Delete ${post ? "post" : "comment"} permanently?`)) {
        const result = await trigger({ method: "DELETE", id, userToken });
        if (result.message) {
          alert("Error: Invalid delete credentials");
          throw new Error(result.message);
        }
        if (comment) {
          const postComments = result.filter(
            (r: CommentProps) => r.postId === +slug
          );
          updatePostCommentSum(+slug, postComments.length);
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
          src={
            post?.authorAvatar || comment?.authorAvatar
              ? `${post?.authorAvatar || comment?.authorAvatar}?s=200&v=4`
              : "https://avatar.iran.liara.run/public"
          }
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
              onClick={() => trashPost(comment?.id || post?.id || 0)}
            >
              {svg.delete}
            </button>
          )}
        </div>
      </span>
    </div>
  );
}
