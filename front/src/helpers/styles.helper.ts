export const parseNumericValue = (value?: string | number) => {
  const isNumber = !Number.isNaN(Number(value));
  return isNumber ? `${value}px` : value;
};
