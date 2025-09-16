"use client";
import { useEffect, useState } from "react";
import { ChildrenProps, UserTokenNDataType } from "@/app/_types";
import { UserTokenNDataContext } from "./Contexts";
import { defaultUserTokenNData } from "../_defaultContexts";

export function UserTokenNDataContextProvider({ children }: ChildrenProps) {
  const [userTokenNData, setUserTokenNData] = useState<UserTokenNDataType>(
    defaultUserTokenNData
  );
  const updateUserTokenNData = (data: UserTokenNDataType) =>
    setUserTokenNData(data);

  useEffect(() => {
    const userDataJson = localStorage.getItem("postssUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
    const userToken = localStorage.getItem("postssToken") || "";
    setUserTokenNData({ userToken, userData });
  }, []);

  return (
    <UserTokenNDataContext value={{ userTokenNData, updateUserTokenNData }}>
      {children}
    </UserTokenNDataContext>
  );
}
