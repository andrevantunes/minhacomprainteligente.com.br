import { delay } from "@/helpers/timeout.helper";

export const waitForGlobal = async (name: string, tries = 20): Promise<void> => {
  if (typeof window === "undefined") return;
  // @ts-ignore
  if (typeof window[name] !== "undefined") return Promise.resolve();
  await delay();
  return waitForGlobal(name, tries - 1);
};
