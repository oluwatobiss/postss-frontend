"use client";
import { useContext, useState } from "react";
import { DialogSubmissionProp } from "@/app/_types";
import { UserTokenNDataContext } from "./context/Contexts";
import { svg } from "../_svg";
import Image from "next/image";

export default function DialogReply({
  uploadInputRef,
  divInputRef,
}: Omit<DialogSubmissionProp, "setDialogReplyKey" | "dialogRef" | "postId">) {
  const [mediaUrl, setMediaUrl] = useState("");
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userData } = userTokenNData;

  function uploadMedia(e: React.ChangeEvent) {
    const maxSize = 1024 * 1024 * 5; // 5,242,880 bytes (5MB)
    const input = e.target as HTMLInputElement;
    const media = (input.files as FileList)[0];
    if (!/^image/.test(media.type))
      return alert("Invalid file type: Only images allowed.");
    if (media.size > maxSize)
      return alert("Size Exceeded: Images can't be larger than 5MB.");
    setMediaUrl(URL.createObjectURL(media));
  }

  return (
    <section className="w-full px-13 pt-4 pb-1.5 grid grid-cols-[48px_minmax(0,1fr)]">
      <span className="select-none pt-1 size-9 bg-[rgb(30,30,30)] rounded-full">
        <Image
          src={`${userData?.avatar}?s=200&v=4`}
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
        {mediaUrl && (
          <div className="flex relative pt-3 cursor-text max-h-108">
            <img
              src={mediaUrl}
              alt="Uploaded media"
              className="w-full border-0 outline-1 outline-[rgba(243,245,247,0.15)] outline-offset-[-1px] rounded-xl object-scale-down"
            />
            <div
              onClick={() => setMediaUrl("")}
              className="absolute top-5 end-5 size-6.5 border-[rgba(0,0,0,0.4)] rounded-full bg-transparent backdrop-blur-[21.5px] cursor-pointer"
            >
              <div className="bg-[rgba(0,0,0,0.4)] rounded-full size-full flex items-center justify-center">
                {svg.removeSm}
              </div>
            </div>
          </div>
        )}
        <div className="mt-2 h-9 flex pr-3 gap-x-1 text-[#ccc] [&_div]:w-9 [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_svg]:text-[rgb(119,119,119)]">
          <div>
            <label
              className="cursor-pointer nav-btn upload-btn"
              htmlFor="upload"
            >
              {svg.media}
            </label>
            <input
              ref={uploadInputRef}
              type="file"
              className="opacity-0 w-0"
              id="upload"
              name="upload"
              onChange={uploadMedia}
              accept="image/*"
            />
          </div>
          {/* <div>{svg.emoji}</div> */}
        </div>
      </span>
    </section>
  );
}
