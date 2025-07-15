import Image from "next/image";
import PostCard from "../_components/PostCard";

export default function Profile() {
  return (
    <>
      <div className="px-6 py-4 flex">
        <Image
          src="https://avatar.iran.liara.run/public"
          alt="codesweetly"
          width={36}
          height={36}
          className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation select-none"
        />
        <div className="mx-2 px-1 flex items-center text-[rgb(119,119,119)] cursor-text grow">
          What&apos;s new?
        </div>
        <div className="h-9 border border-[rgba(243,245,247,0.15)] cursor-pointer font-semibold rounded-xl shrink-0 inline-flex items-center px-4">
          Post
        </div>
      </div>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </>
  );
}
