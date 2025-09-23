import {
  DeleteFetcherOptions,
  PostLoginOption,
  PostUserOption,
  PutPostOption,
  PutUserOption,
} from "./_types";

export default async function mutateData(
  url: string,
  {
    arg,
  }: {
    arg: {
      admin?: boolean;
      adminCode?: string;
      authorId?: number;
      bio?: string;
      content?: string;
      email?: string;
      firstName?: string;
      follow?: boolean;
      id?: number;
      lastName?: string;
      likePost?: boolean;
      method: string;
      password?: string;
      userId?: number;
      username?: string;
      userToken?: string;
      website?: string;
    };
  }
) {
  const {
    admin,
    adminCode,
    authorId,
    bio,
    content,
    email,
    firstName,
    follow,
    id,
    lastName,
    likePost,
    method,
    password,
    userId,
    username,
    userToken,
    website,
  } = arg;
  const uri = follow ? `${url}?follow=${follow}` : id ? `${url}/${id}` : url;
  const options = {
    method: method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...(userToken && { Authorization: `Bearer ${userToken}` }),
    },
    ...(bio && { body: JSON.stringify({ bio, firstName, lastName, website }) }),
    ...(content && { body: JSON.stringify({ authorId, content }) }),
    ...(email &&
      username && {
        body: JSON.stringify({ admin, adminCode, email, password, username }),
      }),
    ...(email && !username && { body: JSON.stringify({ email, password }) }),
    ...(likePost && { body: JSON.stringify({ likePost, userId }) }),
  };

  const response = await fetch(uri, options);
  return await response.json();
}

async function postUser(url: string, { arg }: PostUserOption) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

async function deleteUser(url: string, { arg }: { arg: DeleteFetcherOptions }) {
  const response = await fetch(`${url}/${arg.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

async function putUsera(url: string, { arg }: PutUserOption) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${arg.userToken}`,
    },
  });
  return await response.json();
}

async function deletePost(url: string, { arg }: { arg: DeleteFetcherOptions }) {
  const response = await fetch(`${url}/${arg.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${arg.userToken}` },
  });
  return await response.json();
}

async function postLoginData(url: string, { arg }: PostLoginOption) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

async function putPost(url: string, { arg }: PutPostOption) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${arg.userToken}`,
    },
  });
  return await response.json();
}

async function postMessage(
  url: string,
  { arg }: { arg: { userToken: string; content: string; authorId: number } }
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${arg.userToken}`,
    },
  });
  return await response.json();
}
