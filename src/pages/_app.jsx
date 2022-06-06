import '@styles/globals.css'
import AuthProvider from '@contexts/AuthContext'
import { AppHeader } from '@components'
import { Toaster } from 'react-hot-toast'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster position="bottom-center" />
      <AppHeader />
      <div className="container mx-auto max-w-4xl my-6 p-3">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}
