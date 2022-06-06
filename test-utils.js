import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthProvider from './src/contexts/AuthContext'

const AppRenderer = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AppRenderer, ...options })

export * from '@testing-library/react'
export { customRender as render }
