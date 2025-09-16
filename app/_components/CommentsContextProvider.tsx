"use client";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { defaultComment } from "@/app/_defaultContexts";
import { ChildrenProps, CommentProps } from "@/app/_types";
import { CommentsContext, UserTokenNDataContext } from "./Contexts";
import { socket } from "../_socket";
import useSWRMutation from "swr/mutation";

async function getComments(
  url: string,
  { arg }: { arg: { userToken: string } }
) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

export function CommentsContextProvider({ children }: ChildrenProps) {
  const [comments, setComments] = useState<CommentProps[]>([defaultComment]);
  const { slug } = useParams();
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken } = userTokenNData;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts/${slug}/comments`;
  const { trigger, error, isMutating } = useSWRMutation(url, getComments);

  useEffect(() => {
    async function getInitialComments() {
      const result = await trigger({ userToken });
      setComments(result);
    }
    slug && !slug.includes("%40") && getInitialComments();
  }, [slug]);

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
