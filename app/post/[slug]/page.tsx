"use client";
import { use, useContext, useEffect, useState } from "react";
import { defaultComment, defaultPost } from "@/app/_defaultContexts";
import { CommentProps } from "@/app/_types";
import { socket } from "@/app/_socket";
import {
  PostDialogContext,
  PostsContext,
  UserDataContext,
} from "@/app/_components/Contexts";
import PostCard from "@/app/_components/PostCard";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

async function getComments(
  url: string,
  { arg }: { arg: { userToken: string; postId: number } }
) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

export default function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const posts = useContext(PostsContext);
  const post = posts.find((post) => post.id === +slug);
  const postId = post?.id || 0;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts/${postId}/comments`;
  const openPostDialog = useContext(PostDialogContext);
  const userDataContext = useContext(UserDataContext);
  const userToken = userDataContext.userToken;
  const { trigger, error, isMutating } = useSWRMutation(url, getComments);
  const [comments, setComments] = useState<CommentProps[]>([defaultComment]);
  const postComments = comments.filter(
    (comment) => comment.postId === post?.id
  );

  useEffect(() => {
    (async function getInitialComments() {
      const result = await trigger({ userToken, postId });
      setComments(result);
    })();
  }, []);

  useEffect(() => {
    // On getting a newComment or deleteComment event from the server, update the list of comments
    const updateList = (updatedList: CommentProps[]) =>
      setComments(updatedList);
    socket.on("newComment", updateList);
    socket.on("deleteComment", updateList);
    return () => {
      socket.off("newComment", updateList);
      socket.off("deleteComment", updateList);
    };
  }, []);

  if (isMutating) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full py-3 not-first:border-t-[.5px] not-first:border-t-[rgba(243,245,247,.15)]">
      <div className="px-6 pt-1 pb-3">
        <PostCard commentSum={postComments.length} post={post} />
        <div className="mt-2 pt-4 pb-1 border-t-[.5px] border-t-[rgba(243,245,247,.15)]">
          Replies
        </div>
      </div>
      <div className="border-t-[.5px] border-t-[rgba(243,245,247,.15)] min-h-screen">
        {postComments.map((comment: CommentProps) => (
          <PostCard key={comment.id} comment={comment} />
        ))}
      </div>
      <div
        onClick={() =>
          openPostDialog({ isNewPost: false, post: post || defaultPost })
        }
        className="fixed bottom-0 w-full max-w-160 border-b-0 border-[.5px] border-[rgba(243,245,247,.15)] py-2 bg-[rgb(16,16,16)]"
      >
        <div className="flex items-center border-[.5px] border-[rgba(0,0,0,0.4)] rounded-3xl mx-6 p-1 bg-[rgb(30,30,30)] cursor-pointer">
          <span className="select-none p-2 bg-[rgb(30,30,30)] rounded-full">
            <Image
              src="https://avatar.iran.liara.run/public"
              alt="codesweetly's profile picture"
              width={20}
              height={20}
              objectFit="cover"
              className="size-5 object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation"
            />
          </span>
          <span className="text-[rgb(119,119,119)]">
            Reply to {post?.author}...
          </span>
        </div>
      </div>
    </div>
  );
}
