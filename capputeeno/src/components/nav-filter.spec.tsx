import { render } from '@testing-library/react'
import { NavFilter } from './NavFilter'
import userEvent from '@testing-library/user-event'

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('NavLink', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should highlight the nav link when is the current filter', () => {
    const wrapper = render(<NavFilter type="all" />)

    const activeNavLink = wrapper.getByText('Todos os produtos')

    expect(activeNavLink).toBeDisabled()
    expect(activeNavLink).toHaveClass('border-app-light-orange')
  })

  it('should be able to navigate to the all products page', async () => {
    const user = userEvent.setup()
    const wrapper = render(<NavFilter type="mugs" />)

    const navLinkButton = wrapper.getByRole('button', {
      name: 'Todos os produtos',
    })

    await user.click(navLinkButton)

    expect(mockPush).toHaveBeenCalledWith('/?type=all')
  })

  it('should be able to navigate to the mugs page', async () => {
    const user = userEvent.setup()
    const wrapper = render(<NavFilter type="all" />)

    const navLinkButton = wrapper.getByRole('button', { name: 'Canecas' })

    await user.click(navLinkButton)

    expect(mockPush).toHaveBeenCalledWith('/?type=mugs')
  })

  it('should be able to navigate to the t-shirts page', async () => {
    const user = userEvent.setup()
    const wrapper = render(<NavFilter type="all" />)

    const navLinkButton = wrapper.getByRole('button', { name: 'Camisetas' })

    await user.click(navLinkButton)

    expect(mockPush).toHaveBeenCalledWith('/?type=t-shirts')
  })
})
