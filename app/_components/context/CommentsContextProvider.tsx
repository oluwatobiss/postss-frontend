"use client";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { defaultComment } from "@/app/_defaultContexts";
import { socket } from "@/app/_socket";
import { ChildrenProps, CommentProps } from "@/app/_types";
import { CommentsContext, UserTokenNDataContext } from "./Contexts";
import useSWRMutation from "swr/mutation";
import getData from "@/app/_getData";

export function CommentsContextProvider({ children }: ChildrenProps) {
  const [comments, setComments] = useState<CommentProps[]>([defaultComment]);
  const { slug } = useParams();
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken } = userTokenNData;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts/${slug}/comments`;
  const { trigger, error, isMutating } = useSWRMutation(
    { url, userToken },
    getData
  );

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

  useEffect(() => {
    async function getInitialComments() {
      const result = await trigger();
      setComments(result);
    }
    slug && !slug.includes("%40") && getInitialComments();
  }, [slug]);

  if (isMutating) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <CommentsContext value={comments}>{children}</CommentsContext>;
}
