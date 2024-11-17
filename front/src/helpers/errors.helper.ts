export const getError = (data: any) => {
  if (Array.isArray(data?.errors)) return data.errors.join(". ");
  if (Array.isArray(data?.data)) return data.data.join(". ");
  if (typeof data?.data === "string") return data.data;
  return "Ocorreu um erro!";
};
