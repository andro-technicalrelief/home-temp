'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BASE_PLANS, calculateTieredPrice, formatZAR } from '../services/pricingEngine'
import TierBadge from './TierBadge'

/**
 * A unified pricing slider that transitions between hosting/VPS plans
 * and scales pricing dynamically based on user count.
 *
 * @param {object} props
 * @param {'shared'|'vps'} props.category - The category of plans
 * @param {Array} props.plansProp - Array of plan details (containing static copy, features, etc.)
 */
export default function UnifiedPricingSlider({ category, plansProp }) {
  const [userCount, setUserCount] = useState(1)

  // Resolve plan index based on user count
  const planIndex = useMemo(() => {
    if (category === 'shared') {
      if (userCount <= 10) return 0      // Starter (SME: 1–10)
      if (userCount <= 25) return 1      // Professional (Growth: 11–25)
      if (userCount <= 50) return 2      // Business (Growth: 26–50)
      return 3                           // Enterprise (Enterprise: 51+)
    } else {
      if (userCount <= 10) return 0      // Linux VPS Starter (SME: 1–10)
      if (userCount <= 50) return 1      // Linux VPS Professional (Growth: 11–50)
      return 2                           // Linux VPS Enterprise (Enterprise: 51+)
    }
  }, [category, userCount])

  // Get active copy details and calculations
  const activeCopyPlan = plansProp[planIndex]
  const activeBasePlan = BASE_PLANS[category][planIndex]

  const pricing = useMemo(() => {
    return calculateTieredPrice(activeBasePlan, userCount)
  }, [activeBasePlan, userCount])

  const tier = pricing.tier
  const progress = Math.min(100, (userCount / 100) * 100)

  // Range definitions for labels dynamically mapped to plan tier names
  const ranges = useMemo(() => {
    if (category === 'shared') {
      return [
        { label: plansProp[0]?.tier || 'Starter', range: '1–10' },
        { label: plansProp[1]?.tier || 'Professional', range: '11–25' },
        { label: plansProp[2]?.tier || 'Business', range: '26–50' },
        { label: plansProp[3]?.tier || 'Enterprise', range: '51+' },
      ]
    } else {
      return [
        { label: plansProp[0]?.tier || 'Starter', range: '1–10' },
        { label: plansProp[1]?.tier || 'Professional', range: '11–50' },
        { label: plansProp[2]?.tier || 'Enterprise', range: '51+' },
      ]
    }
  }, [category, plansProp])

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      {/* Decorative ambient background glow */}
      <div 
        className="absolute -top-[20%] -right-[20%] w-[350px] h-[350px] rounded-full filter blur-[80px] opacity-10 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: tier.color }}
      />

      {/* Header with User Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Scale Your Infrastructure</h3>
          <p className="text-[var(--color-text-muted)] text-sm">Drag the slider to adjust users and see plans adjust automatically.</p>
        </div>
        <div className="flex items-center gap-4 bg-[var(--color-bg-dark)] px-5 py-3 rounded-2xl border border-[var(--color-border-dark)] self-start sm:self-auto">
          <span className="text-[var(--color-text-light)] text-sm font-semibold">Team Size:</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setUserCount(prev => Math.max(1, prev - 1))}
              className="w-7 h-7 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-lg flex items-center justify-center font-bold transition-all"
            >
              -
            </button>
            <span className="text-xl font-extrabold text-white w-10 text-center">{userCount}</span>
            <button 
              onClick={() => setUserCount(prev => Math.min(100, prev + 1))}
              className="w-7 h-7 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-lg flex items-center justify-center font-bold transition-all"
            >
              +
            </button>
          </div>
          <span className="text-[var(--color-text-muted)] text-xs">users</span>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="mb-8">
        <div className="relative pt-2">
          <input
            type="range"
            min={1}
            max={100}
            value={userCount}
            onChange={(e) => setUserCount(parseInt(e.target.value))}
            className="w-full h-2.5 bg-[var(--color-border-dark)] rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:bg-[var(--thumb-color)]"
            style={{
              background: `linear-gradient(to right, ${tier.color} 0%, ${tier.color} ${progress}%, var(--color-border-dark) ${progress}%, var(--color-border-dark) 100%)`,
              '--thumb-color': tier.color,
            }}
          />
        </div>

        {/* Labels below slider */}
        <div className={`grid gap-2 mt-4 ${category === 'shared' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
          {ranges.map((r, i) => {
            const isActive = planIndex === i
            return (
              <div 
                key={r.label}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isActive 
                    ? 'bg-white/[0.03] border-white/10 shadow-sm' 
                    : 'bg-transparent border-transparent opacity-40'
                }`}
              >
                <div className="text-xs font-bold text-white leading-tight">{r.label}</div>
                <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{r.range} users</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Plan Detail View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCopyPlan.tier}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="border-t border-white/5 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left: Plan Info & Features */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-extrabold text-white tracking-tight">{activeCopyPlan.tier}</h4>
              <TierBadge tier={pricing.tier} size="xs" />
              {activeCopyPlan.badge && (
                <span className="text-[10px] bg-white/10 border border-white/10 text-white font-bold px-2 py-0.5 rounded-full">
                  {activeCopyPlan.badge}
                </span>
              )}
            </div>
            <p className="text-[var(--color-text-light)] text-sm mb-6 leading-relaxed">
              {activeCopyPlan.description}
            </p>

            <h5 className="text-[var(--color-text-muted)] text-[10px] font-bold uppercase tracking-wider mb-3">Plan Features</h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {activeCopyPlan.features.slice(0, 8).map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/95 text-xs">
                  <span className="text-[var(--color-accent)] font-bold text-sm">✓</span>
                  <span className="leading-tight">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Calculated Price Breakdown */}
          <div className="lg:col-span-5 bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-dark)] rounded-2xl p-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[var(--color-text-muted)] text-xs font-semibold">Configured Total</span>
                {tier.multiplier > 1 && (
                  <span className="text-[10px] bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] border border-[var(--color-accent)]/20 rounded-md px-1.5 py-0.5 font-bold">
                    {tier.multiplier}x Multiplier
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {formatZAR(pricing.price)}
                </span>
                <span className="text-[var(--color-text-muted)] text-sm">/mo</span>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[var(--color-text-muted)] border-t border-white/5 pt-3 mb-4">
                <div className="flex justify-between">
                  <span>Base Plan Cost</span>
                  <span className="text-[var(--color-text-light)]">{formatZAR(activeBasePlan.base)}</span>
                </div>
                {tier.multiplier > 1 && (
                  <div className="flex justify-between">
                    <span>{tier.label} Tier scaling</span>
                    <span className="text-[var(--color-text-light)]">× {tier.multiplier}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-white/5 pt-1.5 font-medium text-white/90">
                  <span>Per User Rate</span>
                  <span style={{ color: tier.color }}>{formatZAR(pricing.perUser)} / user</span>
                </div>
              </div>
            </div>

            <a
              href="/get-started"
              className="block w-full text-center py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5 no-underline text-xs"
            >
              Get Started with {activeCopyPlan.tier}
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Tier allocation notes */}
      {tier.multiplier > 1 && (
        <div className="mt-6 pt-4 border-t border-[var(--color-border-dark)] text-xs text-[var(--color-text-muted)] flex items-start gap-2.5">
          <span className="text-sm">💡</span>
          <p>
            Your team size allocates you to the <strong style={{ color: tier.color }}>{tier.label}</strong> tier. This includes custom optimization: 
            {tier.id === 'growth' ? ' enhanced RAM allocation, faster execution pipelines, and priority support response.' : ' private isolated database clusters, dedicated server resources, and 24/7 hotline support.'}
          </p>
        </div>
      )}
    </div>
  )
}
