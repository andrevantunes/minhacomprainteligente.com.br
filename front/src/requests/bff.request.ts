import type {Page} from "@/types";
import type {AxiosRequestConfig, Method} from "axios";
import type {NextApiRequest, NextPageContext} from "next";

import axios from "axios";
import {serializeCamelToSnakeCase} from "@/helpers/object.helper";

// import {newModel} from "./model.request";
import {get as getCookies} from "@/helpers/cookie.helper";
import {getUser} from "@/helpers/user.helper";

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

const baseUrl = process.env["NEXT_PUBLIC_BFF_URL"] || "https://bff.mesalva.com";
const credentialsCookieName = process.env["CREDENTIALS_COOKIE_NAME"] || "user-credentials";

const emptyPageData: Page = {
  component: "EmptyPage",
  children: [],
};

export const bffPlatform = async (pathname = "") => {
  const [path] = pathname.split("?");
  const url = `/json/app${path}`;
  return bffPage(url);
};

export const bffPage = async (pathname = ""): Promise<Page> => {
  return bff<Page>(pathname)
    .then((data) => data || emptyPageData)
    .catch(() => emptyPageData);
};

export const bff = async <T = any>(
  pathname = "",
  options?: Partial<{
    method: Method;
    headers: {
      [key: string]: string;
    };
    data: Record<string, unknown>;
    req: Pick<NextPageContext, "req"> | NextApiRequest;
    bffUrl: string;
  }>
): Promise<T | undefined> => {
  const url = `${baseUrl}${initialSlash(pathname)}`;
  const credentials = getUser() || getCookies(options?.req)[credentialsCookieName] || {};

  const payload: AxiosRequestConfig = {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "uid": credentials.uid || "",
      "access-token": credentials.accessToken || "",
    },
    data: typeof options?.data === "object" ? JSON.stringify(options?.data) : undefined,
  };

  return axios(url, payload).then(({ data }) => data as T);
};

const initialSlash = (pathname = "") => (pathname.startsWith("/") ? pathname : `/${pathname}`);
