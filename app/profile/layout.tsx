"use client";
import { useContext } from "react";
import { UserTokenNDataContext } from "@/app/_components/context/Contexts";
import { ChildrenProps } from "@/app/_types";
import Image from "next/image";

export default function ProfileLayout({ children }: ChildrenProps) {
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userData } = userTokenNData;
  const { firstName, lastName, username, bio, website } = userData;
  return (
    <>
      <section>
        <section className="px-6 pt-4 pb-3">
          <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-x-4">
            <div>
              <h1 className="font-bold text-2xl wrap-break-word">
                {firstName || lastName ? `${firstName} ${lastName}` : username}
              </h1>
              <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {username}
              </div>
            </div>
            <div>
              <Image
                src="https://avatar.iran.liara.run/public"
                alt={username}
                width={84}
                height={84}
                className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation select-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <div>{bio}</div>
            <div className="mt-3 min-h-9 text-[rgb(119,119,119)]">
              {userData.followers.length ? (
                <span>{userData.followers.length} followers</span>
              ) : (
                ""
              )}
              {userData.followers.length && website ? (
                <span className="px-2">•</span>
              ) : (
                ""
              )}
              {website && (
                <span>
                  {website.replace(
                    /^https|^http|\:\/\/www\.|^www\.|\:\/\//g,
                    ""
                  )}
                </span>
              )}
            </div>
          </div>
        </section>
        <section className="text-center px-4 py-3">
          <a href="/edit-profile">
            <div className="border border-[rgb(45,45,45)] rounded-xl px-4 py-1.5 h-9 select-none font-semibold">
              Edit profile
            </div>
          </a>
        </section>
      </section>
      <section>{children}</section>
    </>
  );
}
