"use client";
import { useContext } from "react";
import { SocketContext, UserTokenNDataContext } from "./_components/Contexts";
import LatestPosts from "./_components/LatestPosts";
import LoginForm from "./_components/LoginForm";

export default function Home() {
  const isConnected = useContext(SocketContext);
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken } = userTokenNData;
  return (
    <div>{userToken && isConnected ? <LatestPosts /> : <LoginForm />}</div>
  );
}
