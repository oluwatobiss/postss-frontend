"use client";
import { useContext, useEffect, useState } from "react";
import { ChildrenProps } from "@/app/_types";
import { socket } from "../../_socket";
import { SocketContext, UserTokenNDataContext } from "./Contexts";

export function SocketContextProvider({ children }: ChildrenProps) {
  const [isConnected, setIsConnected] = useState(false);
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken } = userTokenNData;

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

  return <SocketContext value={isConnected}>{children}</SocketContext>;
}
