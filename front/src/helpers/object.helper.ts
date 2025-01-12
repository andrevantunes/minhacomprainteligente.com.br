import { camelToSnakeCase } from "@/helpers/strings.helper";

export const makeArray = (number = 1, fill?: any) => Array(number).fill(fill);

export const serializeCamelToSnakeCase = (data: any): any => {
  if(typeof(data) != 'object') return data;
  if(Array.isArray(data)) return data.map(serializeCamelToSnakeCase);

  if(Object.keys(data).length === 0) return data;
  return Object.keys(data)
    .map((key) => {
      const newKey = camelToSnakeCase(key);
      return {[newKey]: serializeCamelToSnakeCase(data[key])};
    })
    .reduce((acc, curr) => Object.assign({}, acc, curr));
};
