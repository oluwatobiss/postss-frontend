import { svg } from "../_svg";
import Image from "next/image";
import Link from "next/link";

export default function PostCard() {
  return (
    <Link href="/post/testing123">
      <div className="w-full px-6 py-3 grid grid-cols-[48px_minmax(0,1fr)] not-first:border-t-[.5px] not-first:border-t-[rgba(243,245,247,.15)]">
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
          <div className="flex gap-x-2 overflow-y-hidden whitespace-nowrap text-ellipsis leading-5">
            <span className="font-semibold">codesweetly</span>
            <span className="text-[rgb(119,119,119)]">20m</span>
          </div>
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
        </span>
      </div>
    </Link>
  );
}
