export function toCurrency(country: string, price: number){
  if(country === 'br') return toBrCurrency(price)
}
export function toBrCurrency(price: number){
  return "R$" + price.toFixed(2).replace('.', ',')
}
