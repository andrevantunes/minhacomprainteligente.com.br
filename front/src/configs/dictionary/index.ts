export { ptBr as default } from "./pt-br";

export const getDictionaryTypes = <T>(dictionary: T) =>
  Object.keys(dictionary as any).reduce((acc, key) => ({ ...acc, [key]: key }), {}) as Record<
    keyof typeof dictionary,
    string
  >;
