import { GetFetcherOpt } from "../_types";

export default async function getData({ url, userToken }: GetFetcherOpt) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return await response.json();
}
