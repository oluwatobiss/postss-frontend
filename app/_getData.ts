import { GetFetcherOptions } from "./_types";

export default async function getData({ url, userToken }: GetFetcherOptions) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return await response.json();
}
