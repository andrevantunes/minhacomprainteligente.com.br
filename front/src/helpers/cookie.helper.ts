import type { CookieParseOptions, CookieSerializeOptions } from "cookie";
import type { NextApiRequest, NextApiResponse, NextPageContext } from "next";

import nookies from "nookies";

/**
 * Client-side implementation of cookie parsing.
 * @param ctx Context must be omitted in order to use this function in client-side code. You can do
 *            so by setting it to an empty object `{}`, `null` or `undefined`.
 */
function get(ctx: {} | null | undefined, options?: CookieParseOptions): { [key: string]: string };

/**
 * Server-side implementation of cookie parsing.
 */
function get(
  ctx: Pick<NextPageContext, "req"> | NextApiRequest,
  options?: CookieParseOptions
): { [key: string]: string };

function get(ctx: any, options?: CookieParseOptions) {
  return nookies.get(ctx, options);
}

/**
 * Client-side implementation of cookie setting.
 * @param ctx Context must be omitted in order to use this function in client-side code. You can do
 *            so by setting it to an empty object `{}`, `null` or `undefined`.
 */
function set(
  ctx: {} | null | undefined,
  name: string,
  value: string,
  options?: CookieSerializeOptions
): {};

/**
 * Server-side implementation of cookie setting.
 */
function set(
  ctx: Pick<NextPageContext, "res"> | NextApiResponse,
  name: string,
  value: string,
  options?: CookieSerializeOptions
): {};

function set(ctx: any, name: string, value: string, options?: CookieSerializeOptions) {
  return nookies.set(ctx, name, value, options);
}

/**
 * Client-side implementation of cookie destruction.
 * @param ctx Context must be omitted in order to use this function in client-side code. You can do
 *            so by setting it to an empty object `{}`, `null` or `undefined`.
 */
function destroy(ctx: {} | null | undefined, name: string, options?: CookieSerializeOptions): {};

/**
 * Server-side implementation of cookie destruction.
 */
function destroy(
  ctx: Pick<NextPageContext, "res"> | NextApiResponse,
  name: string,
  options?: CookieSerializeOptions
): {};

function destroy(ctx: any, name: string, options?: CookieSerializeOptions) {
  return nookies.destroy(ctx, name, options);
}

export { destroy, get, set };
