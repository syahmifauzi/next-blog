import Link from 'next/link'
import Router from 'next/router'

import { useAuthContext } from '@contexts/AuthContext'

const AppHeader = () => {
  const { isAuthenticated, logout } = useAuthContext()

  return (
    <div className="border-b shadow-sm">
      <div className="container mx-auto max-w-5xl flex items-center justify-between px-2 py-3">
        <div className="text-3xl font-medium">
          <Link href="/">
            <a className="hover:text-blue-500">Next Blog</a>
          </Link>
        </div>
        {isAuthenticated ? (
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
            onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
            onClick={() => Router.push('/login')}>
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default AppHeader
