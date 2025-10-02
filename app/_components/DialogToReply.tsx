import { PostProps } from "@/app/_types";
import Image from "next/image";

export default function DialogToReply({ post }: { post: PostProps }) {
  return (
    <section className="w-full px-6 pt-4 pb-1.5 grid grid-cols-[48px_minmax(0,1fr)]">
      <span className="select-none pt-1 size-9 bg-[rgb(30,30,30)] rounded-full">
        <Image
          src={`${post.authorAvatar}?s=200&v=4`}
          alt={post.author}
          width={500}
          height={500}
          className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation"
        />
      </span>
      <span>
        <div className="overflow-y-hidden whitespace-nowrap font-semibold text-ellipsis leading-5">
          {post.author}
        </div>
        <div className="mt-1 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
          {post.content}
        </div>
        {post?.media?.path && (
          <div className="flex mt-2 max-h-108">
            <img
              src={post.media.path}
              alt={post.media.name}
              className="w-full border-0 outline-1 outline-[rgba(243,245,247,0.15)] outline-offset-[-1px] rounded-xl object-scale-down"
            />
          </div>
        )}
      </span>
    </section>
  );
}
