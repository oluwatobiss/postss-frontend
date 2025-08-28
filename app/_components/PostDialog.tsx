import { useContext, useRef } from "react";
import { svg } from "../_svg";
import { DialogSubmissionProp, PostDialogProps } from "@/app/_types";
import { UserDataContext } from "./Contexts";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

function DialogHeader({ dialogRef }: Omit<PostDialogProps, "isNewPost">) {
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

function DialogToReply() {
  return (
    <section className="w-full px-6 pt-4 pb-1.5 grid grid-cols-[48px_minmax(0,1fr)]">
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
        <div className="overflow-y-hidden whitespace-nowrap font-semibold text-ellipsis leading-5">
          codesweetly
        </div>
        <div className="mt-1 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
          dolorem debitis, vel provident consectetur veniam, ab unde aperiam
          praesentium molestiae maiores est voluptates itaque explicabo magni
          voluptatem voluptatibus? Quidem, officiis.
        </div>
      </span>
    </section>
  );
}

function DialogReply({ divInputRef }: Omit<DialogSubmissionProp, "dialogRef">) {
  return (
    <section className="w-full px-6 pt-4 pb-1.5 grid grid-cols-[48px_minmax(0,1fr)]">
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
        <div className="overflow-y-hidden whitespace-nowrap font-semibold text-ellipsis leading-5">
          codesweetly
        </div>
        <div
          role="textbox"
          ref={divInputRef}
          tabIndex={0}
          contentEditable="true"
          data-placeholder="What's new?"
          aria-label="Empty text field. Start typing to compose a new post."
          spellCheck="true"
          className="mt-1 w-full px-2 overflow-hidden wrap-anywhere whitespace-pre-wrap text-[.9375rem] leading-[140%] empty:before:content-[attr(data-placeholder)] before:block before:text-[#aaa]"
        ></div>
        <div className="mt-2 h-9 flex pr-3 gap-x-1 text-[#ccc] [&_div]:cursor-pointer [&_div]:w-9 [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_svg]:text-[rgb(119,119,119)]">
          <div>{svg.media}</div>
          <div>{svg.emoji}</div>
        </div>
      </span>
    </section>
  );
}

async function postMessage(
  url: string,
  { arg }: { arg: { post: string; authorId: number } }
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

function DialogSubmission({ divInputRef, dialogRef }: DialogSubmissionProp) {
  const userDataContext = useContext(UserDataContext);
  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`,
    postMessage
  );

  async function submitPost() {
    try {
      const post = divInputRef.current?.innerText || "";
      const authorId = userDataContext.userData.id;
      await trigger({ post, authorId });
      if (divInputRef.current && divInputRef.current.innerText)
        divInputRef.current.innerText = "";
      dialogRef.current?.close();
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  return (
    <section className="p-6 text-right">
      <button
        type="button"
        className="border border-[rgba(243,245,247,0.15)] rounded-xl font-semibold text-[rgb(243,245,247)] cursor-pointer px-4 py-2"
        onClick={submitPost}
      >
        Post
      </button>
    </section>
  );
}

export default function PostDialog({ dialogRef, isNewPost }: PostDialogProps) {
  const divInputRef = useRef<HTMLDivElement>(null);

  function closePostDialog(
    e: React.MouseEvent<HTMLDialogElement | HTMLSpanElement, MouseEvent>
  ) {
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
      {!isNewPost && <DialogToReply />}
      <DialogReply divInputRef={divInputRef} />
      <DialogSubmission divInputRef={divInputRef} dialogRef={dialogRef} />
    </dialog>
  );
}
