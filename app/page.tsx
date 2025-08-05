"use client";
import { useEffect, useState } from "react";
import { socket } from "./_socket";
import LatestPosts from "./_components/LatestPosts";
import LoginForm from "./_components/LoginForm";

export default function Home() {
  const [userToken, setUserToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    const token = localStorage.getItem("postssToken");
    token && setUserToken(token);
  }, []);

  useEffect(() => {
    if (userToken) {
      function onConnect() {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);
        socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
        });
      }
      function onDisconnect() {
        setIsConnected(false);
        setTransport("N/A");
      }
      socket.connect();
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
    <div>
      {userToken ? (
        <>
          {console.log(isConnected)}
          <p>Status: {isConnected ? "connected" : "disconnected"}</p>
          <p>Transport: {transport}</p>
          <LatestPosts />
        </>
      ) : (
        <>
          {console.log(isConnected)}
          <p>Status: {isConnected ? "connected" : "disconnected"}</p>
          <p>Transport: {transport}</p>
          <LoginForm />
        </>
      )}
    </div>
  );
}
