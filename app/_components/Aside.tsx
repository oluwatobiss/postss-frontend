import { useEffect, useState } from "react";
import { Mr_Bedfort } from "next/font/google";
import { svg } from "../_svg";
import Link from "next/link";

const mrBedfort = Mr_Bedfort({ weight: "400", subsets: ["latin"] });

function logout() {
  localStorage.removeItem("postssToken");
  localStorage.removeItem("postssUserData");
  window.location.reload();
}

export default function Aside({
  openPostDialog,
}: {
  openPostDialog: VoidFunction;
}) {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("postssToken");
    token && setUserToken(token);
  }, []);

  return (
    <aside className="z-10 fixed bg-[rgba(10, 10, 10, 0.85)] backdrop-blur-lg h-full w-19 flex flex-col items-center">
      <Link href="/">
        <div
          className={`${mrBedfort.className} text-[33px] hover:scale-110 cursor-pointer transition-scale duration-300 linear leading-[1.5] py-4`}
        >
          P
        </div>
      </Link>
      {userToken && (
        <div className="grow flex items-center">
          <div className="grid gap-y-4 [&_div]:size-15 [&_div]:rounded-xl [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:cursor-pointer [&_div]:hover:bg-[rgba(255,255,255,0.08)] [&_svg]:text-[rgb(77,77,77)]">
            <Link href="/profile/@oluwatobiss">
              <div>{svg.person}</div>
            </Link>
            <div
              className="bg-[rgba(255,255,255,0.08)] group [&_svg]:group-hover:text-white"
              onClick={openPostDialog}
            >
              {svg.plus}
            </div>
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
