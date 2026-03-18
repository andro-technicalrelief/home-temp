import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BASE_PLANS, calculateTieredPrice, calculateProRata, formatZAR, getResourceScale } from '../../services/pricingEngine'
import TierBadge from '../../components/TierBadge'
import PricingSlider from '../../components/PricingSlider'
import ProRataCalculator from '../../components/ProRataCalculator'

const CATEGORIES = [
  { id: 'shared', label: 'Shared Hosting', icon: '🖥️', description: 'Managed web hosting with DirectAdmin', floor: 'From R899/mo' },
  { id: 'vps', label: 'Linux VPS Hosting', icon: '🐧', description: 'Managed Linux VPS with root access', floor: 'From R5,000/mo' },
  { id: 'custom_dev', label: 'Custom Development', icon: '⚡', description: 'Bespoke websites & applications', floor: 'From R8,000' },
]

export default function ServiceConfiguratorPage() {
  const [category, setCategory] = useState('shared')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [userCount, setUserCount] = useState(1)
  const [showProRata, setShowProRata] = useState(false)

  const plans = BASE_PLANS[category] || []
  const activePlan = selectedPlan || plans[0]

  const pricing = useMemo(() => {
    return activePlan ? calculateTieredPrice(activePlan, userCount) : null
  }, [activePlan, userCount])

  const proRata = useMemo(() => {
    if (!pricing) return null
    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    const daysRemaining = daysInMonth - today.getDate()
    return calculateProRata(pricing.price, daysRemaining, daysInMonth)
  }, [pricing])

  const resourceScale = useMemo(() => {
    if (!pricing || category === 'custom_dev') return null
    return getResourceScale(category, pricing.tier)
  }, [pricing, category])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Configure Service</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Choose a plan, set your team size, and see your custom pricing.</p>
      </div>

      {/* Category selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat.id); setSelectedPlan(null); setUserCount(1) }}
            className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
              category === cat.id
                ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 ring-1 ring-[var(--color-accent)]/20'
                : 'bg-[var(--color-bg-card)] border-[var(--color-border-dark)] hover:border-[var(--color-accent)]/10'
            }`}
          >
            <div className="text-2xl mb-2">{cat.icon}</div>
            <div className="text-white font-bold text-sm">{cat.label}</div>
            <div className="text-[var(--color-text-muted)] text-xs mt-0.5">{cat.description}</div>
            <div className="text-[var(--color-accent-light)] text-xs mt-1 font-semibold">{cat.floor}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Plan selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan cards */}
          <section>
            <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-4">Select Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plans.map((plan) => {
                const isActive = activePlan?.id === plan.id
                const planPrice = calculateTieredPrice(plan, userCount)
                return (
                  <motion.button
                    key={plan.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(plan)}
                    className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 ring-1 ring-[var(--color-accent)]/20'
                        : 'bg-[var(--color-bg-card)] border-[var(--color-border-dark)] hover:border-[var(--color-accent)]/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-sm">{plan.name}</span>
                      {isActive && <span className="text-[10px] text-[var(--color-accent-light)] font-bold">SELECTED</span>}
                    </div>
                    <div className="text-xl font-extrabold text-white">
                      {formatZAR(planPrice.price)}
                      <span className="text-[var(--color-text-muted)] text-xs font-normal">
                        {category === 'custom_dev' ? ' once-off' : '/mo'}
                      </span>
                    </div>
                    {planPrice.tier.multiplier > 1 && (
                      <div className="text-[var(--color-text-muted)] text-xs mt-1">
                        Base: {formatZAR(plan.base)} × {planPrice.tier.multiplier}x
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </section>

          {/* User count slider */}
          {activePlan && (
            <section>
              <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-4">Team Size & Tier</h2>
              <PricingSlider
                plan={activePlan}
                initialUsers={userCount}
                onPriceChange={(r) => setUserCount(r.userCount)}
              />
            </section>
          )}

          {/* Resource scaling */}
          {resourceScale && (
            <section>
              <h2 className="text-sm font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-4">Resource Allocation</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(resourceScale).map(([key, value]) => (
                  <div key={key} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-white mb-1">{value}</div>
                    <div className="text-[var(--color-text-muted)] text-xs capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: Order summary */}
        <div className="space-y-4">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 sticky top-6">
            <h3 className="text-sm font-bold text-white mb-4">Order Summary</h3>

            {pricing && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">Plan</span>
                  <span className="text-white font-medium">{activePlan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">Users</span>
                  <span className="text-white">{userCount}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-[var(--color-text-muted)]">Tier</span>
                  <TierBadge tier={pricing.tier} size="xs" />
                </div>
                {pricing.tier.multiplier > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">Multiplier</span>
                    <span className="text-white">{pricing.tier.multiplier}x</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[var(--color-border-dark)]">
                  <div className="flex justify-between items-end">
                    <span className="text-[var(--color-text-muted)] text-sm">
                      {category === 'custom_dev' ? 'Total' : 'Monthly'}
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={pricing.price}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-extrabold text-white"
                      >
                        {formatZAR(pricing.price)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {category !== 'custom_dev' && (
                  <button
                    onClick={() => setShowProRata(!showProRata)}
                    className="w-full text-left text-xs text-[var(--color-accent-light)] hover:text-white transition-colors cursor-pointer mt-2"
                  >
                    {showProRata ? '▾ Hide' : '▸ Show'} pro-rata for today
                  </button>
                )}

                <AnimatePresence>
                  {showProRata && proRata && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <ProRataCalculator proRata={proRata} label="Starting Today" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button className="w-full mt-4 py-3.5 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all cursor-pointer">
                  Add to Cart & Pay
                </button>

                <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-2">
                  Payment processed via PayFast. Prices excl. VAT.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
