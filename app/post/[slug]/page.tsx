import { svg } from "../../_svg";
import Image from "next/image";
import PostCard from "../../_components/PostCard";

export default function Post() {
  return (
    <div className="w-full py-3 not-first:border-t-[.5px] not-first:border-t-[rgba(243,245,247,.15)]">
      <div className="px-6 pt-1 pb-3">
        <div className="flex items-center gap-x-2">
          <span className="select-none pt-1 bg-[rgb(30,30,30)] rounded-full">
            <Image
              src="https://avatar.iran.liara.run/public"
              alt="codesweetly"
              width={36}
              height={36}
              className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation"
            />
          </span>
          <span className="flex gap-x-2 overflow-y-hidden whitespace-nowrap text-ellipsis leading-5">
            <span className="font-semibold">codesweetly</span>
            <span className="text-[rgb(119,119,119)]">20m</span>
          </span>
        </div>
        <div className="pt-3">
          <div className="mt-1 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
            dolorem debitis, vel provident consectetur veniam, ab unde aperiam
            praesentium molestiae maiores est voluptates itaque explicabo magni
            voluptatem voluptatibus? Quidem, officiis.
          </div>
          <div className="mt-2 h-9 flex text-[#ccc]">
            <span className="flex pr-3 gap-x-1">
              <span>{svg.heart}</span>
              <span>332</span>
            </span>
            <span className="flex pr-3 gap-x-1">
              <span>{svg.chat}</span>
              <span>14</span>
            </span>
          </div>
        </div>
        <div className="mt-2 pt-4 pb-1 border-t-[.5px] border-t-[rgba(243,245,247,.15)]">
          Replies
        </div>
      </div>
      <div className="border-t-[.5px] border-t-[rgba(243,245,247,.15)]">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="fixed bottom-0 w-full max-w-160 border-b-0 border-[.5px] border-[rgba(243,245,247,.15)] py-2 bg-[rgb(16,16,16)]">
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
            Reply to oluwatobiss...
          </span>
        </div>
      </div>
    </div>
  );
}
