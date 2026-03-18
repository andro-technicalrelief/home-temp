import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateTieredPrice, formatZAR, getTierForUserCount, TIERS } from '../services/pricingEngine'
import TierBadge from './TierBadge'

/**
 * Interactive user count slider with live tiered pricing.
 * Shows current tier, price, and per-user cost.
 *
 * @param {object} props
 * @param {object} props.plan - Plan definition from BASE_PLANS
 * @param {function} [props.onPriceChange] - Callback when price changes
 * @param {number} [props.initialUsers] - Initial user count
 */
export default function PricingSlider({ plan, onPriceChange, initialUsers = 1 }) {
  const [userCount, setUserCount] = useState(initialUsers)

  const result = useMemo(() => {
    const r = calculateTieredPrice(plan, userCount)
    onPriceChange?.(r)
    return r
  }, [plan, userCount])

  const tier = result.tier
  const progress = Math.min(100, (userCount / 100) * 100)

  // Tier breakpoint positions on slider
  const breakpoints = [
    { pos: 10, label: 'SME', tier: TIERS.SME },
    { pos: 50, label: 'Growth', tier: TIERS.GROWTH },
    { pos: 100, label: 'Enterprise', tier: TIERS.ENTERPRISE },
  ]

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-text-muted)]">Users</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={userCount}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-xl font-bold text-white"
            >
              {userCount}
            </motion.span>
          </AnimatePresence>
        </div>
        <TierBadge tier={tier} size="sm" />
      </div>

      {/* Slider */}
      <div className="mt-4 mb-6 relative">
        <input
          type="range"
          min={1}
          max={100}
          value={userCount}
          onChange={(e) => setUserCount(parseInt(e.target.value))}
          className="w-full h-2 bg-[var(--color-border-dark)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${tier.color} 0%, ${tier.color} ${progress}%, var(--color-border-dark) ${progress}%, var(--color-border-dark) 100%)`,
            '--tw-slider-thumb-bg': tier.color,
          }}
        />
        {/* Tick marks */}
        <div className="flex justify-between mt-1.5 px-0.5">
          {breakpoints.map((bp) => (
            <div key={bp.label} className="flex flex-col items-center">
              <div className={`w-px h-2 ${userCount >= bp.pos ? 'bg-white/50' : 'bg-[var(--color-border-dark)]'}`} />
              <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{bp.pos}+</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price display */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[var(--color-text-muted)] text-xs mb-1">{plan.name} — Monthly</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={result.price}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-3xl font-extrabold text-white">{formatZAR(result.price)}</span>
              <span className="text-[var(--color-text-muted)] text-sm">/mo</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-right">
          <div className="text-[var(--color-text-muted)] text-xs mb-1">Per user</div>
          <span className="text-lg font-bold" style={{ color: tier.color }}>
            {formatZAR(result.perUser)}
          </span>
        </div>
      </div>

      {/* Tier multiplier note */}
      {tier.multiplier > 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-3 border-t border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-xs"
        >
          <span style={{ color: tier.color }}>{tier.label}</span> tier includes enhanced resources: {tier.multiplier}x base allocation.
          {tier.id === 'enterprise' && ' Dedicated private cluster + 24/7 redline support.'}
          {tier.id === 'growth' && ' Priority support + enhanced CPU/RAM.'}
        </motion.div>
      )}
    </div>
  )
}
