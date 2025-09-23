"use client";
import { useContext } from "react";
import { UserTokenNDataContext } from "@/app/_components/context/Contexts";
import { BioType } from "@/app/_types";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import mutateData from "../_utils/mutateData";

export default function BioCard({ followCand }: { followCand: BioType }) {
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken, userData } = userTokenNData;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/users`;
  const userId = userData.id;
  const { data, trigger } = useSWRMutation(
    `${url}/${followCand.id}/${userId}`,
    mutateData
  );
  const following =
    data?.following.includes(followCand.id) ||
    userData.following.includes(followCand.id);

  async function followUser(follow: boolean) {
    try {
      const result = await trigger({ method: "PUT", userToken, follow });
      if (result.message) {
        alert("Error: Invalid update credentials");
        throw new Error(result.message);
      }
      localStorage.setItem("postssUserData", JSON.stringify(result));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  function unFollowUser() {
    if (confirm(`Unfolow ${followCand.username}?`)) followUser(false);
  }

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
            <div className="font-semibold">{followCand.username}</div>
            {(followCand.firstName || followCand.lastName) && (
              <div className="text-[#777]">{`${followCand?.firstName} ${followCand?.lastName}`}</div>
            )}
          </span>
          <button
            type="button"
            className="min-w-26 h-8.5 rounded-lg font-semibold cursor-pointer"
            style={
              following
                ? { border: "1px solid #777", color: "#777" }
                : { backgroundColor: "#fff", color: "#000" }
            }
            onClick={() => (following ? unFollowUser() : followUser(true))}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>
        <div className="mt-1 mb-4 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
          {followCand.bio}
        </div>
        {followCand.followers.length ? (
          <div className="text-[#777]">{followCand.followers.length}</div>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}
