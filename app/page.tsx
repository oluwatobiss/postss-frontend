"use client";
import { useContext } from "react";
import { SocketContext, UserDataContext } from "./_components/Contexts";
import LatestPosts from "./_components/LatestPosts";
import LoginForm from "./_components/LoginForm";

export default function Home() {
  const isConnected = useContext(SocketContext);
  const { userToken } = useContext(UserDataContext);
  return (
    <div>{userToken && isConnected ? <LatestPosts /> : <LoginForm />}</div>
  );
}
