"use client";
import { BioType } from "@/app/_types";
import useSWR from "swr";
import BioCard from "../_components/BioCard";

async function getUsers(url: string) {
  const response = await fetch(url);
  return response.json();
}

export default function Explore() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/users`,
    getUsers
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log("=== Explore ===");
  console.log(data);

  return data.map((followCand: BioType) => (
    <BioCard key={followCand.id} followCand={followCand} />
  ));
}
