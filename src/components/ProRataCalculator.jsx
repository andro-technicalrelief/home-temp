import { motion } from 'framer-motion'
import { formatZAR } from '../services/pricingEngine'

/**
 * Visual pro-rata billing calculator.
 * Shows daily rate, days remaining, and total charge for mid-cycle changes.
 */
export default function ProRataCalculator({ proRata, label = 'Pro-Rata Charge' }) {
  if (!proRata) return null

  const { dailyRate, proRataAmount, daysRemaining, totalDays, monthlyPrice, savings } = proRata
  const fillPercent = ((totalDays - daysRemaining) / totalDays) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6"
    >
      <h4 className="text-sm font-bold text-white mb-4">{label}</h4>

      {/* Visual progress bar showing billing cycle */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mb-1">
          <span>Cycle start</span>
          <span>{daysRemaining} days remaining</span>
        </div>
        <div className="h-2 w-full bg-[var(--color-border-dark)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] transition-all"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">Full monthly price</span>
          <span className="text-white">{formatZAR(monthlyPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">Daily rate</span>
          <span className="text-white">{formatZAR(dailyRate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">Days remaining</span>
          <span className="text-white">{daysRemaining} / {totalDays}</span>
        </div>

        <div className="pt-2.5 border-t border-[var(--color-border-dark)] flex justify-between items-end">
          <div>
            <span className="text-[var(--color-text-muted)] text-xs block">You pay today</span>
            <span className="text-xl font-extrabold text-white">{formatZAR(proRataAmount)}</span>
          </div>
          {savings > 0 && (
            <span className="text-xs font-medium text-[var(--color-success)]">
              Save {formatZAR(savings)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
