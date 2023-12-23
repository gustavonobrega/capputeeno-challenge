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
export const GET_PRODUCT = `
  query getProduct($id: ID!) {
    Product(id: $id) {
      id
      name
      category
      description
      image_url
      price_in_cents
    }
  }
`

export const GET_TOP5 = `
  query getTop5 {
    allProducts(sortField: "sales",  sortOrder: "desc", page: 1, perPage: 5) {
      id
      name
      image_url
      price_in_cents
    }
  }
`
