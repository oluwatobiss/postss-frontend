import { mutateDataArg, mutateDataOpt } from "../_types";

const setBody = (obj: Omit<mutateDataArg, "method" | "sendCookie">) => ({
  body: JSON.stringify(obj),
});

export default async function mutateData(url: string, { arg }: mutateDataOpt) {
  const { admin, adminCode, authorId, avatar, bio, content, email } = arg;
  const { firstName, follow, id, lastName, likePost, method } = arg;
  const { password, sendCookie, userId, username, userToken, website } = arg;
  const uri = follow ? `${url}?follow=${follow}` : id ? `${url}/${id}` : url;
  const options = {
    method: method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...(userToken && { Authorization: `Bearer ${userToken}` }),
    },
    ...(sendCookie && { credentials: "include" as RequestCredentials }), // logout
    ...(bio &&
      setBody({
        admin,
        adminCode,
        email,
        firstName,
        lastName,
        username,
        bio,
        avatar: avatar?.replace(/\?.*/g, ""),
        website,
      })), // update profile
    ...(content && setBody({ authorId, content })), // write post / comment
    ...(email &&
      !bio &&
      setBody({ admin, adminCode, email, password, username })), // signup
    ...(email && !username && setBody({ email, password })), // login
    ...(userId && setBody({ likePost, userId })), // toggle post like
  };
  const response = await fetch(uri, options);
  return await response.json();
}
