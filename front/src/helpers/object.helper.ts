import { camelToSnakeCase } from "@/helpers/strings.helper";

export const makeArray = (number = 1, fill?: any) => Array(number).fill(fill);

export const serializeCamelToSnakeCase = (data: any) =>
  Object.keys(data)
    .map((key) => {
      const newKey = camelToSnakeCase(key);
      return { [newKey]: data[key] };
    })
    .reduce((acc, curr) => Object.assign({}, acc, curr));
