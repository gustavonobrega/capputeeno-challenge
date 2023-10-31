import type { FilterType, OrderOption } from '@/types/filter-types'

const ORDERS = {
  news: {
    field: 'created_at',
    order: 'desc',
  },
  biggest_price: {
    field: 'price_in_cents',
    order: 'desc',
  },
  minor_price: {
    field: 'price_in_cents',
    order: 'asc',
  },
  topseller: {
    field: 'sales',
    order: 'desc',
  },
}

const PERPAGE = 10

export function formatQueryVariables(
  selectedOrder: OrderOption,
  selectedType: FilterType,
  currentPage: number,
  perPage: number,
) {
  const filter = selectedType === 'all' ? {} : { category: selectedType }
  const page = currentPage - 1

  if (
    selectedOrder === 'news' ||
    selectedOrder === 'biggest_price' ||
    selectedOrder === 'minor_price' ||
    selectedOrder === 'topseller'
  ) {
    return {
      sortField: ORDERS[selectedOrder].field,
      sortOrder: ORDERS[selectedOrder].order,
      filter,
      page,
      perPage,
    }
  } else {
    return { sortField: '', sortOrder: '', filter, page, perPage }
  }
}
