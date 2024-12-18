export function normalizeCpf(value: string) {
  if (!value) return value;
  return value
    .substr(0, 14)
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .substr(0, 14);
}

export const normalizeCardNumber = (value: string) => {
  if (!value) return value
  return value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
    .substr(0, 19)
}

export function normalizeZipcode(value: string) {
  if (!value) return value
  return value
    .substr(0, 9)
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .substr(0, 9)
}
