"use client";
import { useContext, useRef, useState } from "react";
import { PostDialogProps } from "@/app/_types";
import { UserTokenNDataContext } from "./context/Contexts";
import DialogHeader from "./DialogHeader";
import DialogReply from "./DialogReply";
import DialogSubmission from "./DialogSubmission";
import DialogToReply from "./DialogToReply";

export default function PostDialog({ dialogRef, postInfo }: PostDialogProps) {
  const [dialogReplyKey, setDialogReplyKey] = useState(crypto.randomUUID());
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken } = userTokenNData;
  const divInputRef = useRef<HTMLDivElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  function closePostDialog(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    const dialogRect = dialogRef.current?.getBoundingClientRect();
    if (dialogRect) {
      if (
        e.clientX < dialogRect.left ||
        e.clientX > dialogRect.right ||
        e.clientY < dialogRect.top ||
        e.clientY > dialogRect.bottom
      ) {
        dialogRef.current?.close();
      }
    }
  }
  return (
    <dialog
      className="m-auto backdrop:bg-[rgba(0,0,0,0.7)] w-155 max-w-[calc(100vw-32px)] border-[.5px] border-[rgba(243,245,247,0.15)] bg-[rgb(24,24,24)] rounded-2xl shadow-[0_12px_24px_0_rgba(0,0,0,0.08)] text-[rgb(243,245,247)]"
      ref={dialogRef}
      onClick={(e) => closePostDialog(e)}
    >
      <DialogHeader dialogRef={dialogRef} />
      {!postInfo.isNewPost && <DialogToReply post={postInfo.post} />}
      {userToken && (
        <DialogReply
          key={dialogReplyKey}
          uploadInputRef={uploadInputRef}
          divInputRef={divInputRef}
        />
      )}
      <DialogSubmission
        setDialogReplyKey={setDialogReplyKey}
        uploadInputRef={uploadInputRef}
        divInputRef={divInputRef}
        dialogRef={dialogRef}
        postId={postInfo.isNewPost ? 0 : postInfo.post.id}
      />
    </dialog>
  );
}
