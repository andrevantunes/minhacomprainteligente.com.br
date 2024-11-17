export const testMinNumber = (min = 1, message: string) => ({
  message,
  test: (value?: string | number) => {
    if (!value) return false;
    const str = String(value);
    return str.replace(/\D/g, "").length >= min;
  },
});
