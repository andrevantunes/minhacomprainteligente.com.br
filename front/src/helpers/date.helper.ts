import { DateTime } from "luxon";

const SEPARATOR = " • ";

export const dateToBrTimezone = (stringDate: string | Date) => {
  const data = new Date(stringDate);
  const brTimezone = data.setMinutes(data.getMinutes());
  return new Date(brTimezone);
};

export const dateToLocaleString = (date: string | Date) => {
  return dateToBrTimezone(date).toLocaleDateString("pt-BR");
};

export const dateBr = (date: string) => dateBrFull(date).replace(/\/\d{4}/, "");

export const hourBr = (date: string) => dateBrFull(date).replace(new RegExp(`.*${SEPARATOR}`), "");

export const dateBrFull = (date: string) =>
  dateToBrTimezone(date)
    .toLocaleString("pt-br")
    .replace(",", "")
    .replace(/:\d{2}$/, "")
    .replace(" ", SEPARATOR);

export function objectFieldsToDate(data: any, ...fields: string[]) {
  const parseObject = ({ ...obj }: any) => {
    fields.forEach((name: string) => {
      obj[name] = new Date(obj[name]);
    });
    return obj;
  };
  if (!data) return data;
  if (Array.isArray(data)) return data.map(parseObject);
  return parseObject(data);
}

export const isValidDate = (date: string): boolean => {
  return DateTime.fromFormat(date, "yyyy-MM-dd").isValid;
};
