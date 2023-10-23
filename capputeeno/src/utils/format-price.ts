export function formatPrice(priceInCents: number) {
  const formattedPrice = priceInCents / 100

  return formattedPrice.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}
