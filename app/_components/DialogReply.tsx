"use client";
import { useContext } from "react";
import { DialogSubmissionProp } from "@/app/_types";
import { UserDataContext } from "./Contexts";
import { svg } from "../_svg";
import Image from "next/image";

export default function DialogReply({
  divInputRef,
}: Omit<DialogSubmissionProp, "dialogRef" | "postId">) {
  const { userData } = useContext(UserDataContext);
  return (
    <section className="w-full px-13 pt-4 pb-1.5 grid grid-cols-[48px_minmax(0,1fr)]">
      <span className="select-none pt-1 size-9 bg-[rgb(30,30,30)] rounded-full">
        <Image
          src="https://avatar.iran.liara.run/public"
          alt={userData?.username}
          width={500}
          height={500}
          className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation"
        />
      </span>
      <span>
        <div className="overflow-y-hidden whitespace-nowrap font-semibold text-ellipsis leading-5">
          {userData?.username}
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
