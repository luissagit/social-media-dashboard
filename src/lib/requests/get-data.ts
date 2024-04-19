import { baseApiUrl } from "..";

interface Params {
  url: string;
}

export async function getData(params: Params) {
  try {
    const response = await fetch(`${baseApiUrl}${params.url}`);
    return response.json();
  } catch (err) {
    return [];
  }
}