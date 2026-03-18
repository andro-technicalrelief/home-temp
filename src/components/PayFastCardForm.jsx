import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { initiateTokenization } from '../services/payfastApi'

/**
 * PayFast Card Tokenization wrapper.
 * Redirects to PayFast's hosted card capture page.
 * No raw card data touches our server — zero-trust architecture.
 */
export default function PayFastCardForm({ onCancel }) {
  const { user } = useAuth()

  const handleLinkCard = () => {
    initiateTokenization({
      clientEmail: user.email,
      clientName: user.first_name,
      clientSurname: user.last_name,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8"
    >
      <div className="text-center max-w-md mx-auto">
        <div className="text-5xl mb-4">🔐</div>
        <h3 className="text-xl font-bold text-white mb-2">Link Your Card Securely</h3>
        <p className="text-[var(--color-text-muted)] text-sm mb-6 leading-relaxed">
          You'll be redirected to <strong className="text-white">PayFast's secure</strong> card capture page.
          Your card details are never stored on our servers — only a secure token is saved for future billing.
        </p>

        {/* Security badges */}
        <div className="flex justify-center gap-4 mb-8 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-success)]">🔒</span> 256-bit encryption
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-success)]">✓</span> PCI DSS compliant
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-success)]">🛡️</span> Zero-trust
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleLinkCard}
            className="px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            🔗 Link Card via PayFast
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-[var(--color-border-dark)] text-[var(--color-text-light)] rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {/* PayFast logo / trust */}
        <p className="mt-6 text-[10px] text-[var(--color-text-muted)]">
          Payments processed by PayFast (Pty) Ltd. South Africa's leading payment gateway.
          <br />
          Visa, Mastercard, and instant EFT supported.
        </p>
      </div>
    </motion.div>
  )
}
