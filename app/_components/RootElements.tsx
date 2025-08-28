"use client";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { ChildrenProps, PostProps } from "@/app/_types";
import { PostDialogContext } from "./Contexts";
import { PostsContextProvider } from "./PostsContextProvider";
import { SocketContextProvider } from "./SocketContextProvider";
import { UserDataContextProvider } from "./UserDataContextProvider";
import { defaultPost } from "../_defaultContexts";
import Aside from "./Aside";
import PostDialog from "./PostDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootElements({ children }: ChildrenProps) {
  const [postInfo, setPostInfo] = useState({
    isNewPost: false,
    post: defaultPost,
  });
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pathname = usePathname();
  const heading = pathname === "/" ? "Latest" : "Profile";

  function openPostDialog(postInfo: { isNewPost: boolean; post: PostProps }) {
    setPostInfo(postInfo);
    dialogRef.current?.showModal();
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserDataContextProvider>
          <PostDialog dialogRef={dialogRef} postInfo={postInfo} />
          <PostDialogContext value={openPostDialog}>
            <Aside />
            <SocketContextProvider>
              <PostsContextProvider>
                <main className="w-full fixed min-h-screen">
                  <h1 className="text-center h-15 leading-15">{heading}</h1>
                  <div className="w-full fixed top-15 bottom-0 overflow-y-scroll">
                    <div className="w-160 mx-auto bg-[#181818] border-[.5px] border-[rgb(45,45,45)] py-3 cursor-pointer shadow-[0_0_12px_0_rgba(0,0,0,0.04)]">
                      {children}
                    </div>
                  </div>
                </main>
              </PostsContextProvider>
            </SocketContextProvider>
          </PostDialogContext>
        </UserDataContextProvider>
      </body>
    </html>
  );
}
