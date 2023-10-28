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

export function formatQueryVariables(
  selectedOrder: OrderOption,
  selectedType: FilterType,
) {
  const filter = selectedType === 'all' ? {} : { category: selectedType }

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
    }
  } else {
    return { sortField: '', sortOrder: '', filter }
  }
}
