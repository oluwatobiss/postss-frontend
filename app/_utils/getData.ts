import { GetFetcherOpt } from "../_types";

export default async function getData({
  url,
  userToken,
  sendCookie,
}: GetFetcherOpt) {
  const response = await fetch(url, {
    ...(userToken && { headers: { Authorization: `Bearer ${userToken}` } }), // get protected data
    ...(sendCookie && { credentials: "include" as RequestCredentials }), // github login
  });
  return await response.json();
}
