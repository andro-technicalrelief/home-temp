'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

/**
 * Global app context — provides toast notifications and shared state.
 * Replaces scattered state management across pages.
 */
export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  return (
    <AppContext.Provider value={{ toasts, addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-5 py-3 rounded-xl text-sm font-medium shadow-xl border backdrop-blur-md animate-[fadeIn_0.3s_ease-out] ${
              toast.type === 'success' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
              toast.type === 'error'   ? 'bg-red-500/15 text-red-400 border-red-500/30' :
              toast.type === 'warning' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                                         'bg-blue-500/15 text-blue-400 border-blue-500/30'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
