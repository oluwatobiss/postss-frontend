import Image from "next/image";
import { BioType } from "@/app/_types";

export default function BioCard({ user }: { user: BioType }) {
  return (
    <div className="w-full px-6 py-3 grid grid-cols-[48px_minmax(0,1fr)] not-first:border-t-[.5px] not-first:border-t-[rgba(243,245,247,.15)]">
      <span className="select-none pt-1 size-9 bg-[rgb(30,30,30)] rounded-full">
        <Image
          src="https://avatar.iran.liara.run/public"
          alt={""}
          width={500}
          height={500}
          className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation"
        />
      </span>
      <span>
        <div className="flex justify-between overflow-y-hidden whitespace-nowrap text-ellipsis leading-5">
          <span>
            <div className="font-semibold">{user.username}</div>
            {(user.firstName || user.lastName) && (
              <div className="text-[rgb(119,119,119)]">{`${user?.firstName} ${user?.lastName}`}</div>
            )}
          </span>
          <button
            type="button"
            className="min-w-26 h-8.5 rounded-lg font-semibold bg-white text-black"
          >
            Follow
          </button>
        </div>
        <div className="mt-1 mb-4 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
          {user.bio}
        </div>
        <div className="text-[rgb(119,119,119)]">285k followers</div>
      </span>
    </div>
  );
}
