"use client";
import { useContext } from "react";
import { UserDataContext } from "@/app/_components/Contexts";
import { BioType } from "@/app/_types";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

async function putUser(
  url: string,
  { arg }: { arg: { userToken: string | false | null } }
) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${arg.userToken}`,
    },
  });
  return await response.json();
}

export default function BioCard({ userToFollow }: { userToFollow: BioType }) {
  // const router = useRouter();
  const userDataContext = useContext(UserDataContext);
  const { userToken, userData } = userDataContext;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/users`;
  const userId = userData.id;
  const { data, trigger } = useSWRMutation(
    `${url}/${userToFollow.id}/${userId}`,
    putUser
  );

  console.log("=== BioCard ===");
  console.log(data);
  const following =
    data?.following.includes(userToFollow.id) ||
    userData.following.includes(userToFollow.id);

  async function updateUser() {
    try {
      const result = await trigger({ userToken });
      if (result.message) {
        alert("Error: Invalid update credentials");
        throw new Error(result.message);
      }
      console.log("=== updateUser in BioCard ===");

      console.log(result);

      localStorage.setItem("postssUserData", JSON.stringify(result));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
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
            <div className="font-semibold">{userToFollow.username}</div>
            {(userToFollow.firstName || userToFollow.lastName) && (
              <div className="text-[#777]">{`${userToFollow?.firstName} ${userToFollow?.lastName}`}</div>
            )}
          </span>
          <button
            type="button"
            className="min-w-26 h-8.5 rounded-lg font-semibold"
            disabled={following}
            style={
              following
                ? { border: "1px solid #777", color: "#777" }
                : { backgroundColor: "#fff", color: "#000" }
            }
            onClick={updateUser}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>
        <div className="mt-1 mb-4 overflow-hidden wrap-anywhere text-[.9375rem] leading-[140%] whitespace-pre-wrap">
          {userToFollow.bio}
        </div>
        <div className="text-[#777]">285k followers</div>
      </span>
    </div>
  );
}
