"use client";
import { useRef } from "react";
import Image from "next/image";
import Aside from "../_components/Aside";
import PostDialog from "../_components/PostDialog";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function openPostDialog() {
    dialogRef.current?.showModal();
  }

  return (
    <article>
      <PostDialog dialogRef={dialogRef} />
      <Aside openPostDialog={openPostDialog} />
      <main className="w-full fixed min-h-screen">
        <h1 className="text-center h-15 leading-15">Profile</h1>
        <div className="w-full fixed top-15 bottom-0 overflow-y-scroll">
          <div className="w-160 mx-auto bg-[#181818] border-[.5px] border-[rgb(45,45,45)] py-3 cursor-pointer shadow-[0_0_12px_0_rgba(0,0,0,0.04)]">
            <section>
              <section className="px-6 pt-4 pb-3">
                <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-x-4">
                  <div>
                    <h1 className="font-bold text-2xl wrap-break-word">
                      Oluwatobi Sofela
                    </h1>
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                      oluwatobiss
                    </div>
                  </div>
                  <div>
                    <Image
                      src="https://avatar.iran.liara.run/public"
                      alt="codesweetly"
                      width={84}
                      height={84}
                      className="object-cover outline-offset-[-.5px] outline-[.5px] outline-solid outline-[rgba(243,245,247,.15)] rounded-full touch-manipulation select-none"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    👋 CodeSweetly makes learning to code so easy and fun.
                  </div>
                  <div className="mt-3 min-h-9 text-[rgb(119,119,119)]">
                    <span>🔎 Explore</span>
                    <span className="px-2">•</span>
                    <span>codesweetly.com</span>
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
            <section>
              <div className="grid grid-cols-[repeat(4,1fr)] items-center [&_div]:border-b [&_div]:px-4 [&_div]:h-12 [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:font-semibold">
                <div className="border-[#fff]">Posts</div>
                <div className="border-[rgba(243,245,247,0.15)] text-[rgb(119,119,119)]">
                  Subscriptions
                </div>
                <div className="border-[rgba(243,245,247,0.15)] text-[rgb(119,119,119)]">
                  Likes
                </div>
                <div className="border-[rgba(243,245,247,0.15)] text-[rgb(119,119,119)]">
                  Followers
                </div>
              </div>
              <div>{children}</div>
            </section>
          </div>
        </div>
      </main>
    </article>
  );
}
