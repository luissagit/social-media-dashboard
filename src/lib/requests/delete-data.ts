import { baseApiUrl } from "..";

interface Params {
  url: string;
  id?: any;
}

export async function deleteData(params: Params) {
  try {
    const response = await fetch(`${baseApiUrl}${params.url}/${params?.id}`, {
      method: 'delete',
    });
    return response.json();
  } catch (err) {
    return [];
  }
}