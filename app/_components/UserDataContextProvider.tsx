"use client";
import { useEffect, useState } from "react";
import { ChildrenProps, UserDataType } from "@/app/_types";
import { UserDataContext } from "./Contexts";
import { defaultUserData } from "../_defaultContexts";

export function UserDataContextProvider({ children }: ChildrenProps) {
  const [userData, setUserData] = useState<UserDataType>(defaultUserData);

  useEffect(() => {
    const userDataJson = localStorage.getItem("postssUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
    const userToken = localStorage.getItem("postssToken") || "";
    setUserData({ userToken, userData });
  }, []);

  return <UserDataContext value={userData}>{children}</UserDataContext>;
}
