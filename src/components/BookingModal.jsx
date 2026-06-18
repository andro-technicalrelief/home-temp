'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/context/AppContext'

export default function BookingModal() {
  const { isBookingOpen, closeBooking } = useApp()
  const [loading, setLoading] = useState(true)

  // Reset loading state when modal opens
  useEffect(() => {
    if (isBookingOpen) {
      setLoading(true)
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isBookingOpen])

  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    'https://api.leadconnectorhq.com/widget/booking/mVorgr835HYpP90X68o5'

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-4xl h-[80vh] md:h-[85vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-lg">📅</span> Book a Strategy Session
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Select a convenient date and time to speak with our technical team.
                </p>
              </div>
              <button
                onClick={closeBooking}
                className="w-10 h-10 rounded-xl bg-slate-200/50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-200/80 hover:text-slate-800 active:scale-95 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Iframe Body */}
            <div className="flex-1 w-full h-full relative bg-white">
              {/* Custom Loading Spinner */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white flex flex-col items-center justify-center gap-4 z-20"
                  >
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
                      <div className="absolute inset-0 rounded-full border-2 border-t-[var(--color-accent)] animate-spin" />
                    </div>
                    <p className="text-slate-500 text-sm animate-pulse">
                      Loading schedule calendar...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Booking Iframe */}
              <iframe
                src={bookingUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                onLoad={() => setLoading(false)}
                title="Book an appointment"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
