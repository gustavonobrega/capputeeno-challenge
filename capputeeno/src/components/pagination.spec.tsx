import { render } from '@testing-library/react'
import { Pagination } from './Pagination'
import userEvent from '@testing-library/user-event'

const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('Pagination', () => {
  beforeEach(() => {
    pushMock.mockClear()
  })

  it('should display a list of pages with size 5 when type is all', () => {
    const wrapper = render(
      <Pagination count={60} page={1} perPage={10} type="all" order="" />,
    )

    const pages = wrapper.getByTestId('pages').querySelectorAll('button')

    expect(pages.length).toEqual(5)
  })

  it('should display a list of pages with size 3 when type is mugs or t-shirts', () => {
    const wrapper = render(
      <Pagination count={60} page={1} perPage={10} type="mugs" order="" />,
    )

    const pages = wrapper.getByTestId('pages').querySelectorAll('button')

    expect(pages.length).toEqual(3)
  })

  it('should be able to navigate to the selected page', async () => {
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination count={60} page={1} perPage={10} type="all" order="" />,
    )

    const selectedPageButton = wrapper.getByRole('button', {
      name: '2',
    })

    await user.click(selectedPageButton)

    expect(pushMock).toHaveBeenCalledWith('/?page=2')
  })

  it('should be able to navigate to the next page', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Pagination count={60} page={1} perPage={10} type="all" order="" />,
    )

    const nextPageButton = container.querySelectorAll('svg')[1]

    await user.click(nextPageButton)

    expect(pushMock).toHaveBeenCalledWith('/?page=2')
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Pagination count={60} page={2} perPage={10} type="all" order="" />,
    )

    const previousPageButton = container.querySelectorAll('svg')[0]

    await user.click(previousPageButton)

    expect(pushMock).toHaveBeenCalledWith('/?page=1')
  })
})
