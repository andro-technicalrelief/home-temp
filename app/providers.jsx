'use client'

import { AuthProvider } from '@/context/AuthContext'
import { AppProvider } from '@/context/AppContext'

/**
 * Client-side providers wrapper.
 * Auth and App contexts need to be client components.
 */
export function Providers({ children }) {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </AuthProvider>
  )
}
