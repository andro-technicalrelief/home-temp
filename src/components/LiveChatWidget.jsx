import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Floating live-chat-style help widget.
 * Shows a chat bubble in the bottom-right corner with quick action links.
 */
export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-[70px] right-0 w-[320px] bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--color-accent)] px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-white text-sm font-semibold">Technical Relief</span>
              </div>
              <p className="text-white/80 text-xs">We typically reply within 2 hours</p>
            </div>

            {/* Quick actions */}
            <div className="p-4 flex flex-col gap-2">
              <p className="text-[var(--color-text-muted)] text-xs mb-1">How can we help?</p>

              <a
                href="/pricing"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline"
              >
                <span className="text-lg">💳</span>
                <div>
                  <div className="font-medium">View Plans & Pricing</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Hosting, VPS, Development</div>
                </div>
              </a>

              <a
                href="/dashboard/support"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline"
              >
                <span className="text-lg">🎫</span>
                <div>
                  <div className="font-medium">Submit a Support Ticket</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Get help from our team</div>
                </div>
              </a>

              <a
                href="/knowledge-base"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline"
              >
                <span className="text-lg">📖</span>
                <div>
                  <div className="font-medium">Knowledge Base</div>
                  <div className="text-[var(--color-text-muted)] text-xs">FAQs & how-tos</div>
                </div>
              </a>

              <a
                href="mailto:support@technicalrelief.co.za"
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-dark)] rounded-xl text-sm text-white hover:bg-[var(--color-accent)]/10 transition-colors no-underline"
              >
                <span className="text-lg">📧</span>
                <div>
                  <div className="font-medium">Email Us</div>
                  <div className="text-[var(--color-text-muted)] text-xs">support@technicalrelief.co.za</div>
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
        className="w-14 h-14 rounded-full bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30 flex items-center justify-center cursor-pointer hover:bg-[var(--color-accent-hover)] transition-colors"
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
    </div>
  )
}
