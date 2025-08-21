"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { RootElementsProps, UserDataType } from "@/app/_types";
import { UserDataContext } from "./Contexts";
import Aside from "./Aside";
import PostDialog from "./PostDialog";
import defaultUserData from "../_defaultUserData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootElements({ children }: RootElementsProps) {
  const [userData, setUserData] = useState<UserDataType>(defaultUserData);
  const [isNewPost, setIsNewPost] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pathname = usePathname();
  const heading = pathname === "/" ? "Latest" : "Profile";

  function openPostDialog(isNewPost: boolean) {
    setIsNewPost(isNewPost);
    dialogRef.current?.showModal();
  }

  console.log("=== RootElements ===");
  console.log(userData);

  useEffect(() => {
    const userDataJson = localStorage.getItem("postssUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
    const userToken = localStorage.getItem("postssToken") || "";
    setUserData({ userToken, userData });
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <article>
          <UserDataContext value={userData}>
            <PostDialog dialogRef={dialogRef} isNewPost={isNewPost} />
            <Aside openPostDialog={openPostDialog} />
            <main className="w-full fixed min-h-screen">
              <h1 className="text-center h-15 leading-15">{heading}</h1>
              <div className="w-full fixed top-15 bottom-0 overflow-y-scroll">
                <div className="w-160 mx-auto bg-[#181818] border-[.5px] border-[rgb(45,45,45)] py-3 cursor-pointer shadow-[0_0_12px_0_rgba(0,0,0,0.04)]">
                  {children}
                </div>
              </div>
            </main>
          </UserDataContext>
        </article>
      </body>
    </html>
  );
}
