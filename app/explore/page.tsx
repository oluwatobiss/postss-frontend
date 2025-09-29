"use client";
import { useContext } from "react";
import { UserTokenNDataContext } from "../_components/context/Contexts";
import { User } from "@/app/_types";
import useSWR from "swr";
import getData from "../_utils/getData";
import BioCard from "../_components/BioCard";

export default function Explore() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/users`;
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userData, userToken } = userTokenNData;
  const { data, error, isLoading } = useSWR({ url, userToken }, getData);

  console.log("=== Explore ===");

  console.log(data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return data.map(
    (followCand: User) =>
      followCand.id !== userData.id &&
      !followCand.followers?.includes(userData.id) && (
        <BioCard key={followCand.id} followCand={followCand} />
      )
  );
}
