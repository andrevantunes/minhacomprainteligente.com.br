import FetchHmac from "@andrevantunes/fetch-hmac";

import { getUser } from "@/helpers/user.helper";

const envs = {
  CLIENT: "WEB",
  API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  HMAC_KEY: process.env.NEXT_PUBLIC_API_KEY,
};

export const newModel = (route: string) => new FetchHmac(route, envs, { get: getUser });
