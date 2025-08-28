import { PostDialogProps } from "@/app/_types";

export default function DialogHeader({
  dialogRef,
}: Omit<PostDialogProps, "postInfo">) {
  return (
    <section className="border-b-[.5px] border-b-[rgba(243,245,247,0.15)] h-14 grid grid-cols-[minmax(64px,100px)_minmax(0,1fr)_minmax(64px,100px)] items-center">
      <span
        onClick={() => dialogRef.current?.close()}
        className="justify-self-center cursor-pointer"
      >
        Cancel
      </span>
      <span className="justify-self-center font-bold">New post</span>
    </section>
  );
}
