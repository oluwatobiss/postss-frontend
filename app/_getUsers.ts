import { GetFetcherOptions } from "./_types";

export default async function getUsers({ url, userToken }: GetFetcherOptions) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.json();
}
