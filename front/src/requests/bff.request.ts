import { serializeCamelToSnakeCase } from "@/helpers/object.helper";

// import {newModel} from "./model.request";

export const getBffApi = async (endpoint?: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`).then((r) => r.json());
};
export const getPageApi = async (endpoint?: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_HOST}pages/${endpoint}`)
    .then((r) => {
      if (r.status === 404 || r.headers.get("content-type") === null) {
        return { value: {} };
      }
      return r.json();
    })
    .then((x) => x.value);

export const savePageApi = async (endpoint?: string, value: any = {}) =>
  // BffApi.get({ route: endpoint, data });
  fetch(`${process.env.NEXT_PUBLIC_API_HOST}pages/${endpoint}`, {
    body: JSON.stringify({ value }),
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
    .then((r) => r.json())
    .then((x) => x.value);

export const postBffApi = async <T = any>(endpoint?: string, data?: T) => {
  const serializedData = serializeCamelToSnakeCase(data);
  return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serializedData),
  }).then((r) => r.json());
};

export const putBffApi = async <T = any>(endpoint?: string, data?: T) => {
  const serializedData = serializeCamelToSnakeCase(data);
  return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serializedData),
  }).then((r) => r.json());
};
