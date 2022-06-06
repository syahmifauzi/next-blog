import React from 'react'
import { render } from '../../test-utils'
import { AppHeader } from '../../src/components'

describe('AppHeader Component', () => {
  it('renders app title', () => {
    const { getByText } = render(<AppHeader />)
    const title = getByText(/next blog/i)
    expect(title).toBeInTheDocument()
  })

  it('render a login button', () => {
    const { getByText } = render(<AppHeader />)
    const loginButton = getByText(/login/i)
    expect(loginButton).toBeInTheDocument()
  })
})
