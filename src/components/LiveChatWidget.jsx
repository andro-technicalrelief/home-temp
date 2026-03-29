'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Floating live-chat-style help widget.
 * Shows a chat bubble in the bottom-right corner with quick action links.
 */
export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      drag
      dragConstraints={{ left: -1000, right: 0, top: -800, bottom: 0 }}
      className="fixed bottom-6 right-6 z-50 origin-bottom-right"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-[70px] right-0 w-[320px] bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl shadow-2xl overflow-hidden cursor-default"
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag when interacting with content
          >
            {/* Header */}
            <div className="bg-[var(--color-accent)] px-5 py-4 cursor-move">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-white text-sm font-semibold">Technical Relief</span>
              </div>
              <p className="text-white/80 text-xs">Drag widget to reposition • Usually replies in 2h</p>
            </div>

            {/* Quick actions */}
            <div className="p-4 flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              <p className="text-[var(--color-text-muted)] text-xs mb-1">How can we help?</p>

              <a
                href="/hosting"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline border border-transparent hover:border-[var(--color-accent)]/20"
              >
                <span className="text-lg">🚀</span>
                <div>
                  <div className="font-medium">Discover Managed Hosting</div>
                  <div className="text-[var(--color-text-muted)] text-xs">High-performance React/Node apps</div>
                </div>
              </a>

              <a
                href="/vps"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline border border-transparent hover:border-[var(--color-accent)]/20"
              >
                <span className="text-lg">💻</span>
                <div>
                  <div className="font-medium">Linux VPS Solutions</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Full root access & dedicated resources</div>
                </div>
              </a>

              <a
                href="/pricing"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline border border-transparent hover:border-[var(--color-accent)]/20"
              >
                <span className="text-lg">💳</span>
                <div>
                  <div className="font-medium">Compare All Plans</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Find the perfect fit for your project</div>
                </div>
              </a>

              <a
                href="/about"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline border border-transparent hover:border-[var(--color-accent)]/20"
              >
                <span className="text-lg">🏢</span>
                <div>
                  <div className="font-medium">What We Do</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Our philosophy and engineering team</div>
                </div>
              </a>

              <a
                href="/dashboard/support"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline border border-transparent hover:border-[var(--color-accent)]/20"
              >
                <span className="text-lg">🎫</span>
                <div>
                  <div className="font-medium">Support Center</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Open a ticket with our technicians</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  )
}
