import { httpClient } from "@/lib/api";

export async function getAll() {
  const { data } = await httpClient.get('/tasks');

  return data;
}