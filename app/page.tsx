"use client";
import { useEffect, useState } from "react";
import { socket } from "./_socket";
import LatestPosts from "./_components/LatestPosts";
import LoginForm from "./_components/LoginForm";

export default function Home() {
  const [userToken, setUserToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("postssToken");
    token && setUserToken(token);
  }, []);

  useEffect(() => {
    if (userToken) {
      socket.connect();
      const onConnect = () => setIsConnected(true);
      const onDisconnect = () => setIsConnected(false);
      if (socket.connected) onConnect();
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }
  }, [userToken]);

  return (
    <div>{userToken && isConnected ? <LatestPosts /> : <LoginForm />}</div>
  );
}
