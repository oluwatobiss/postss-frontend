import { mutateDataArg, mutateDataOpt } from "../_types";

const setBody = (obj: Omit<mutateDataArg, "method">) => ({
  body: JSON.stringify(obj),
});

export default async function mutateData(url: string, { arg }: mutateDataOpt) {
  const { admin, adminCode, authorId, bio, content, email } = arg;
  const { firstName, follow, id, lastName, likePost, method } = arg;
  const { password, userId, username, userToken, website } = arg;
  const uri = follow ? `${url}?follow=${follow}` : id ? `${url}/${id}` : url;
  const options = {
    method: method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...(userToken && { Authorization: `Bearer ${userToken}` }),
    },
    ...(bio && setBody({ bio, firstName, lastName, website })),
    ...(content && setBody({ authorId, content })),
    ...(email &&
      username &&
      setBody({ admin, adminCode, email, password, username })),
    ...(email && !username && setBody({ email, password })),
    ...(likePost && setBody({ likePost, userId })),
  };
  const response = await fetch(uri, options);
  return await response.json();
}
