'use client'

import { AuthProvider } from '@/context/AuthContext'
import { AppProvider } from '@/context/AppContext'
import BookingModal from '@/components/BookingModal'

/**
 * Client-side providers wrapper.
 * Auth and App contexts need to be client components.
 */
export function Providers({ children }) {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
        <BookingModal />
      </AppProvider>
    </AuthProvider>
  )
}
