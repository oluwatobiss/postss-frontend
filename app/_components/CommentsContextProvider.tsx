"use client";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { defaultComment } from "@/app/_defaultContexts";
import { ChildrenProps, CommentProps } from "@/app/_types";
import { CommentsContext, UserDataContext } from "./Contexts";
import { socket } from "../_socket";
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

export function CommentsContextProvider({ children }: ChildrenProps) {
  const [comments, setComments] = useState<CommentProps[]>([defaultComment]);
  const { slug = 0 } = useParams();
  const userDataContext = useContext(UserDataContext);
  const userToken = userDataContext.userToken;
  const postId = +slug;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts/${postId}/comments`;
  const { trigger, error, isMutating } = useSWRMutation(url, getComments);

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

  return <CommentsContext value={comments}>{children}</CommentsContext>;
}
