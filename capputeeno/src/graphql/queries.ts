export const GET_PRODUCTS = `
  query getProducts($sortField: String, $sortOrder: String, $filter: ProductFilter, $page: Int, $perPage: Int) {
    allProducts(sortField: $sortField,  sortOrder: $sortOrder, filter: $filter, page: $page, perPage: $perPage) {
      id
      name
      image_url
      price_in_cents
    }
    _allProductsMeta(filter: $filter, page: $page, perPage: $perPage) {
      count
    }
  }
`
