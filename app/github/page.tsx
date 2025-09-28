"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserTokenNDataContext } from "@/app/_components/context/Contexts";
import useSWRMutation from "swr/mutation";
import getData from "@/app/_utils/getData";

export default function GitHub() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/login/user`;
  const router = useRouter();
  const { updateUserTokenNData } = useContext(UserTokenNDataContext);
  const { trigger, error } = useSWRMutation({ url, sendCookie: true }, getData);
  useEffect(() => {
    async function setUserInfo() {
      const result = await trigger();
      const { payload, token } = result;
      localStorage.setItem("postssToken", token);
      localStorage.setItem(
        "postssUserData",
        JSON.stringify({ ...payload, isGitHub: true })
      );
      updateUserTokenNData({ userToken: token, userData: payload });
      router.push("/");
    }
    setUserInfo();
  }, []);
  if (error) return <div>Error: {error.message}</div>;
  return <div>GitHub Login in progress...</div>;
}
