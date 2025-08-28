import { useRef } from "react";
import { PostDialogProps } from "@/app/_types";
import DialogHeader from "./DialogHeader";
import DialogReply from "./DialogReply";
import DialogSubmission from "./DialogSubmission";
import DialogToReply from "./DialogToReply";

export default function PostDialog({ dialogRef, postInfo }: PostDialogProps) {
  const divInputRef = useRef<HTMLDivElement>(null);
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
      <DialogReply divInputRef={divInputRef} />
      <DialogSubmission divInputRef={divInputRef} dialogRef={dialogRef} />
    </dialog>
  );
}
