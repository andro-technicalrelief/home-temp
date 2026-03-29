'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { MOCK_WALLET, MOCK_TRANSACTIONS } from '../../services/payfastApi'
import PayFastCardForm from '../../components/PayFastCardForm'

export default function WalletPage() {
  const { user } = useAuth()
  const [wallet, setWallet] = useState(MOCK_WALLET)
  const [transactions] = useState(MOCK_TRANSACTIONS)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(null)

  const toggleConsent = () => {
    setWallet((w) => ({ ...w, billingConsent: !w.billingConsent }))
  }

  const removeCard = (cardId) => {
    setWallet((w) => ({ ...w, cards: w.cards.filter((c) => c.id !== cardId) }))
    setShowRemoveConfirm(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Wallet</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Manage your linked payment methods and billing preferences.</p>
        </div>
      </div>

      {/* Linked Cards */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider">Linked Cards</h2>
          <button
            onClick={() => setShowAddCard(true)}
            className="px-4 py-2 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer"
          >
            + Link New Card
          </button>
        </div>

        <AnimatePresence>
          {showAddCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <PayFastCardForm onCancel={() => setShowAddCard(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {wallet.cards.length === 0 ? (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">💳</div>
            <h3 className="text-white font-bold mb-1">No cards linked</h3>
            <p className="text-[var(--color-text-muted)] text-sm">Link a card via PayFast to enable auto-billing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallet.cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 relative group hover:border-[var(--color-accent)]/20 transition-all"
              >
                {card.isDefault && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold bg-[var(--color-success)]/15 text-[var(--color-success)] px-2 py-0.5 rounded-full uppercase">
                    Default
                  </span>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {card.brand === 'Visa' ? 'VISA' : card.brand === 'Mastercard' ? 'MC' : card.brand}
                  </div>
                  <div>
                    <div className="text-white font-semibold">•••• •••• •••• {card.last4}</div>
                    <div className="text-[var(--color-text-muted)] text-xs">Expires {card.expiry}</div>
                  </div>
                </div>
                <div className="text-[var(--color-text-muted)] text-xs">
                  Linked on {new Date(card.linkedAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!card.isDefault && (
                    <button className="text-xs text-[var(--color-accent-light)] hover:text-white transition-colors cursor-pointer">
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => setShowRemoveConfirm(card.id)}
                    className="text-xs text-[var(--color-error)] hover:text-red-300 transition-colors cursor-pointer"
                  >
                    Remove Card
                  </button>
                </div>

                {/* Remove confirmation */}
                <AnimatePresence>
                  {showRemoveConfirm === card.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-[var(--color-bg-card)]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6"
                    >
                      <p className="text-white text-sm font-semibold mb-1">Remove this card?</p>
                      <p className="text-[var(--color-text-muted)] text-xs mb-4">Active subscriptions using this card will be paused.</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => removeCard(card.id)}
                          className="px-4 py-2 bg-[var(--color-error)] text-white text-xs font-semibold rounded-lg cursor-pointer"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => setShowRemoveConfirm(null)}
                          className="px-4 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-light)] text-xs rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Billing Consent */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-4">Billing Preferences</h2>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Auto-Pay</h3>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">
              {wallet.billingConsent
                ? 'Your linked card will be automatically charged on each billing date.'
                : 'You will receive manual invoices for each billing cycle.'}
            </p>
          </div>
          <button
            onClick={toggleConsent}
            className={`w-14 h-7 rounded-full flex items-center px-1 transition-all cursor-pointer ${
              wallet.billingConsent ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border-dark)]'
            }`}
          >
            <motion.div
              animate={{ x: wallet.billingConsent ? 24 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow"
            />
          </button>
        </div>
      </section>

      {/* Transaction History */}
      <section>
        <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-4">Recent Transactions</h2>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">No transactions yet.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  <th className="text-left py-3 px-5 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-5 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Description</th>
                  <th className="text-right py-3 px-5 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-right py-3 px-5 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-[var(--color-border-dark)] last:border-b-0 hover:bg-[var(--color-bg-card-hover)] transition-colors">
                    <td className="py-3.5 px-5 text-[var(--color-text-light)] text-sm">
                      {new Date(tx.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 px-5 text-white text-sm">{tx.description}</td>
                    <td className="py-3.5 px-5 text-right text-white text-sm font-semibold">R{tx.amount.toLocaleString()}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        tx.status === 'Completed' ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]' : 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
