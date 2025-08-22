"use client";
import { useContext, useEffect, useState } from "react";
import { socket } from "./_socket";
import { UserDataContext } from "./_components/Contexts";
import LatestPosts from "./_components/LatestPosts";
import LoginForm from "./_components/LoginForm";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const userDataContext = useContext(UserDataContext);
  const userToken = userDataContext.userToken;

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
