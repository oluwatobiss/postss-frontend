"use client";
import { useContext } from "react";
import { Mr_Bedfort } from "next/font/google";
import { PostDialogContext, UserTokenNDataContext } from "./context/Contexts";
import { defaultPost } from "../_defaultContexts";
import { svg } from "../_svg";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import mutateData from "../_utils/mutateData";

const mrBedfort = Mr_Bedfort({ weight: "400", subsets: ["latin"] });

export default function Aside() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/logout`;
  const openPostDialog = useContext(PostDialogContext);
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken, userData } = userTokenNData;
  const { trigger } = useSWRMutation(url, mutateData);

  async function logout() {
    try {
      await trigger({ method: "POST", sendCookie: true });
      localStorage.removeItem("postssToken");
      localStorage.removeItem("postssUserData");
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  return (
    <aside className="fixed z-10 not-md:bottom-0 md:h-full md:w-19 not-md:w-full flex flex-col items-center bg-[rgba(10, 10, 10, 0.85)] backdrop-blur-lg">
      <Link href="/" className="not-md:hidden">
        <div
          className={`${mrBedfort.className} text-[33px] hover:scale-110 cursor-pointer transition-scale duration-300 linear leading-[1.5] py-4`}
        >
          P
        </div>
      </Link>
      {userToken && (
        <div className="grow flex items-center">
          <div className="grid gap-4 not-md:grid-cols-5 [&_div]:size-15 [&_div]:rounded-xl [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:cursor-pointer [&_div]:hover:bg-[rgba(255,255,255,0.08)] [&_svg]:text-[rgb(77,77,77)]">
            <Link href="/">
              <div>{svg.home}</div>
            </Link>
            <Link href="/explore">
              <div>{svg.search}</div>
            </Link>
            <div
              className="bg-[rgba(255,255,255,0.08)] group [&_svg]:group-hover:text-white"
              onClick={() =>
                openPostDialog({ isNewPost: true, post: defaultPost })
              }
            >
              {svg.plus}
            </div>
            <Link href={`/profile/@${userData.username}`}>
              <div>{svg.person}</div>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="size-15 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[rgba(255,255,255,0.08)]"
            >
              {svg.boxArrowRight}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
