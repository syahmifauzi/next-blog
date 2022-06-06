import { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import toast from 'react-hot-toast'
import { ImSpinner } from 'react-icons/im'

import { useAuthContext } from '@contexts/AuthContext'

export default function LoginPage() {
  const { user, isLoading, login } = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      Router.push('/')
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username) {
      toast.error('Username is required')
      return
    }
    if (!password) {
      toast.error('Password is required')
      return
    }
    login(username, password)
  }

  return (
    <>
      <Head>
        <title>Login | Next Blog</title>
      </Head>
      <div className="flex flex-col justify-center max-w-sm mx-auto h-[60vh]">
        <h1 className="font-medium text-3xl text-center mb-6">Login</h1>
        <form className="flex flex-col gap-3 justify-center">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="username">
            Username
          </label>
          <input
            disabled={isLoading}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
            type="text"
            id="username"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="password">
            Password
          </label>
          <input
            disabled={isLoading}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
            type="password"
            id="password"
            placeholder="admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={isLoading}
            className={`text-white ${
              isLoading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
            } rounded py-3 px-4 mb-3`}
            type="submit"
            onClick={handleSubmit}>
            {isLoading ? (
              <ImSpinner className="inline animate-spin" />
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </>
  )
}
