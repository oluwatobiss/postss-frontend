"use client";
import { useEffect, useState } from "react";
import LatestPosts from "./_components/LatestPosts";
import LoginForm from "./_components/LoginForm";

export default function Home() {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("postssToken");
    token && setUserToken(token);
  }, []);

  return <div>{userToken ? <LatestPosts /> : <LoginForm />}</div>;
}
