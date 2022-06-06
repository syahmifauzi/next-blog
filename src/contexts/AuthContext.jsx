import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { createContext, useContext, useEffect, useState } from 'react'

import auth from '@services/auth'

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
  isAuthenticated: false
}

const AuthContext = createContext(initialState)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      if (token) {
        auth.defaults.headers.Authorization = `Bearer ${token}`
        const { data } = await auth.post('/api/me')
        if (data) setUser({ ...data, ...token })
      }
      setIsLoading(false)
    }
    loadUserFromCookies()
  }, [])

  const login = async (username, password) => {
    setIsLoading(true)
    try {
      const { data: token } = await auth.post('/api/login', {
        username,
        password
      })
      if (token) {
        Cookies.set('token', token, { expires: 60 })
        auth.defaults.headers.Authorization = `Bearer ${token}`
        const { data } = await auth.post('/api/me')
        if (data) {
          setUser({ ...data, ...token })
          toast.success('Login success!')
        }
      }
    } catch (error) {
      console.log({ error })
      setUser(null)
      Cookies.remove('token')
      toast.error('Invalid username or password!')
    }
    setIsLoading(false)
  }

  const logout = async () => {
    Cookies.remove('token')
    auth.defaults.headers.Authorization = null
    setUser(null)
    setIsLoading(false)
    toast.success('Logout success!')
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
