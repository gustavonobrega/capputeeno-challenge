export const GET_PRODUCTS = `
query getProducts($sortField: String, $sortOrder: String, $filter: ProductFilter) {
  allProducts(sortField: $sortField,  sortOrder: $sortOrder, filter: $filter) {
    id
    name
    image_url
    price_in_cents
  }
}
`
