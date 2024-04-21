import { baseApiUrl } from "..";

interface Params {
  url: string;
  body?: any
  method?: any;
}

export async function postData(params: Params) {
  try {
    const response = await fetch(`${baseApiUrl}${params.url}`, {
      method: params?.method,
      body: JSON.stringify(params?.body),
    });
    return response.json();
  } catch (err) {
    return [];
  }
}