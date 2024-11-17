import { DateTime } from "luxon";

export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter, index) =>
    index == 0 ? letter.toLowerCase() : "_" + letter.toLowerCase()
  );

export const isDateBetween = (date: string, startDate: string, endDate: string): boolean => {
  const dateObj = DateTime.fromFormat(date, "yyyy-MM-dd");
  const startDateObj = DateTime.fromFormat(startDate, "yyyy-MM-dd");
  const startEndObj = DateTime.fromFormat(startDate, "yyyy-MM-dd");
  if (!dateObj.isValid) throw new Error("Invalid date");
  if (!startDateObj.isValid) throw new Error("Invalid startDate");
  if (!startEndObj.isValid) throw new Error("Invalid endDate");
  return date >= startDate && date <= endDate;
};

export const getLetterFromNumber = (value: number, upperCase = false) => {
  const target = (upperCase ? 65 : 97) + value;
  if (upperCase) {
    if (target < 65 || target > 90) throw new Error("Invalid value");
  } else {
    if (target < 97 || target > 122) throw new Error("Invalid value");
  }
  return String.fromCharCode(target);
};
