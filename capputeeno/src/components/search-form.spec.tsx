import { render } from '@testing-library/react'
import { SearchForm } from './SearchForm'

const searchParamsMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => vi.fn(),
  useSearchParams: () => ({
    get: searchParamsMock.mockReturnValue('Camiseta Outcast'),
  }),
}))

describe('SearchForm', () => {
  it('should set default search input value if is present on search params', () => {
    const { container } = render(<SearchForm />)

    const searchParams = searchParamsMock('q')

    const input = container.querySelector('input') as HTMLInputElement

    expect(input.value).toEqual(searchParams)
  })
})
