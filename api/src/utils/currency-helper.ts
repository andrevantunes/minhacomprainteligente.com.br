export function toCurrency(country: string, price: number | string) {
  if (country === 'br') return toBrCurrency(price);
  return '';
}
export function toBrCurrency(price: number | string) {
  return 'R$' + (Number(price) / 100).toFixed(2).replace('.', ',');
}
