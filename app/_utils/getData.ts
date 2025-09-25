import { GetFetcherOpt } from "../_types";

export default async function getData({
  url,
  userToken,
  sendCookie,
}: GetFetcherOpt) {
  const response = await fetch(url, {
    ...(userToken && { headers: { Authorization: `Bearer ${userToken}` } }),
    ...(sendCookie && { credentials: "include" }),
  });
  return await response.json();
}
