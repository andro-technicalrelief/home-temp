'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_SUBSCRIPTIONS } from '../../services/payfastApi'
import { formatZAR, calculateUpgradeProRata } from '../../services/pricingEngine'
import TierBadge from '../../components/TierBadge'

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(MOCK_SUBSCRIPTIONS)
  const [cancelConfirm, setCancelConfirm] = useState(null)
  const [upgradeModal, setUpgradeModal] = useState(null)

  const cancelSub = (id) => {
    setSubscriptions((subs) => subs.map((s) => s.id === id ? { ...s, status: 'cancelled' } : s))
    setCancelConfirm(null)
  }

  const activeSubs = subscriptions.filter((s) => s.status === 'active')
  const cancelledSubs = subscriptions.filter((s) => s.status === 'cancelled')
  const totalMonthly = activeSubs.reduce((sum, s) => sum + (s.frequency === 'Monthly' ? s.amount : 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Subscriptions</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Manage your active plans and auto-pay subscriptions.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
          <div className="text-[var(--color-text-muted)] text-xs mb-1">Active Plans</div>
          <div className="text-2xl font-extrabold text-white">{activeSubs.length}</div>
        </div>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
          <div className="text-[var(--color-text-muted)] text-xs mb-1">Monthly Total</div>
          <div className="text-2xl font-extrabold text-white">{formatZAR(totalMonthly)}</div>
        </div>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
          <div className="text-[var(--color-text-muted)] text-xs mb-1">Next Billing</div>
          <div className="text-2xl font-extrabold text-white">
            {activeSubs.length > 0 
              ? new Date(activeSubs.sort((a, b) => new Date(a.nextBilling) - new Date(b.nextBilling))[0].nextBilling).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })
              : '—'}
          </div>
        </div>
      </div>

      {/* Active subscriptions */}
      <section className="mb-10">
        <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-4">Active Subscriptions</h2>
        {activeSubs.length === 0 ? (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-white font-bold mb-1">No active subscriptions</h3>
            <p className="text-[var(--color-text-muted)] text-sm">Configure a service to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {activeSubs.map((sub) => (
              <motion.div
                key={sub.id}
                layout
                className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 hover:border-[var(--color-accent)]/20 transition-all relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-bold">{sub.planName}</h3>
                      <TierBadge tier={sub.tier} size="xs" />
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[var(--color-text-muted)]">
                      <span>Card: •••• {sub.cardLast4}</span>
                      <span>{sub.userCount} user{sub.userCount !== 1 ? 's' : ''}</span>
                      <span>Since {new Date(sub.createdAt).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-white text-xl font-extrabold">{formatZAR(sub.amount)}<span className="text-[var(--color-text-muted)] text-xs">/{sub.frequency === 'Annual' ? 'yr' : 'mo'}</span></div>
                      <div className="text-[var(--color-text-muted)] text-xs">Next: {new Date(sub.nextBilling).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setUpgradeModal(sub)}
                        className="px-4 py-1.5 text-xs font-semibold bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] rounded-lg hover:bg-[var(--color-accent)]/20 transition-all cursor-pointer"
                      >
                        Upgrade
                      </button>
                      <button
                        onClick={() => setCancelConfirm(sub.id)}
                        className="px-4 py-1.5 text-xs font-semibold text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cancel confirmation */}
                <AnimatePresence>
                  {cancelConfirm === sub.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-[var(--color-border-dark)] flex items-center justify-between">
                        <p className="text-sm text-[var(--color-text-muted)]">
                          This will stop auto-billing at the end of the current cycle.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => cancelSub(sub.id)}
                            className="px-4 py-2 bg-[var(--color-error)] text-white text-xs font-semibold rounded-lg cursor-pointer"
                          >
                            Confirm Cancel
                          </button>
                          <button
                            onClick={() => setCancelConfirm(null)}
                            className="px-4 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-light)] text-xs rounded-lg cursor-pointer"
                          >
                            Keep Plan
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Cancelled */}
      {cancelledSubs.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-4">Cancelled</h2>
          <div className="flex flex-col gap-3">
            {cancelledSubs.map((sub) => (
              <div
                key={sub.id}
                className="bg-[var(--color-bg-card)]/60 border border-[var(--color-border-dark)] rounded-2xl p-5 opacity-60 flex items-center justify-between"
              >
                <div>
                  <span className="text-white font-medium text-sm">{sub.planName}</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-3">Cancelled</span>
                </div>
                <span className="text-[var(--color-text-muted)] text-sm">{formatZAR(sub.amount)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upgrade modal */}
      <AnimatePresence>
        {upgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-6"
            onClick={() => setUpgradeModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-bg-navy)] border border-[var(--color-border-dark)] rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-white mb-2">Upgrade {upgradeModal.planName}</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">
                Select a higher plan. You'll only be charged the pro-rata difference for the remaining days in this billing cycle.
              </p>

              {/* Pro-rata example */}
              {(() => {
                const upgrade = calculateUpgradeProRata(upgradeModal.amount, upgradeModal.amount * 1.5, 15)
                return (
                  <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[var(--color-text-muted)]">Current plan</span>
                      <span className="text-white">{formatZAR(upgrade.currentMonthly)}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[var(--color-text-muted)]">Next tier</span>
                      <span className="text-white">{formatZAR(upgrade.nextFullCharge)}/mo</span>
                    </div>
                    <div className="pt-2 border-t border-[var(--color-border-dark)] flex justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Pro-rata charge today</span>
                      <span className="text-white font-bold">{formatZAR(upgrade.upgradeCharge)}</span>
                    </div>
                  </div>
                )
              })()}

              <div className="flex gap-3">
                <button
                  onClick={() => setUpgradeModal(null)}
                  className="flex-1 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer"
                >
                  Confirm Upgrade
                </button>
                <button
                  onClick={() => setUpgradeModal(null)}
                  className="px-6 py-3 border border-[var(--color-border-dark)] text-[var(--color-text-light)] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
