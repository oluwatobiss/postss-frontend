"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "./_socket";
import { UserDataContext } from "./_components/Contexts";
import LatestPosts from "./_components/LatestPosts";
import LoginForm from "./_components/LoginForm";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const userDataContext = useContext(UserDataContext);
  if (!userDataContext) {
    throw new Error(
      "Home Error: Home component must be used within the UserDataContext provider"
    );
  }
  const userToken = userDataContext.userToken;
  // const [userToken, setUserToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("postssToken");
  //   token && setUserToken(token);
  // }, []);

  // useEffect(() => {
  //   if (userToken) {
  //     socket.connect();
  //     const onConnect = () => setIsConnected(true);
  //     const onDisconnect = () => setIsConnected(false);
  //     if (socket.connected) onConnect();
  //     socket.on("connect", onConnect);
  //     socket.on("disconnect", onDisconnect);
  //     return () => {
  //       socket.off("connect", onConnect);
  //       socket.off("disconnect", onDisconnect);
  //     };
  //   }
  // }, [userToken]);

  console.log("=== Home ===");
  console.log(userToken);

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
