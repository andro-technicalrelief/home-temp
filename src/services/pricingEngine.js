/**
 * Tiered Dynamic Pricing Engine
 *
 * Calculates scaled pricing based on:
 * - Base plan (Shared, VPS, Custom Dev)
 * - Client user count → tier multiplier
 * - Pro-rata billing for mid-month changes
 *
 * Price floors enforced: Shared ≥ R550/mo, VPS ≥ R5,000/mo (R2,500 server + R2,500 management)
 */

// ═══════════════════════════════════════════════════════
// TIER DEFINITIONS
// ═══════════════════════════════════════════════════════

export const TIERS = {
  SME:        { id: 'sme',        label: 'SME',        min: 1,  max: 10,  multiplier: 1.0,  color: '#3B82F6', badge: 'bg-blue-500/15 text-blue-400' },
  GROWTH:     { id: 'growth',     label: 'Growth',     min: 11, max: 50,  multiplier: 1.45, color: '#F59E0B', badge: 'bg-amber-500/15 text-amber-400' },
  ENTERPRISE: { id: 'enterprise', label: 'Enterprise', min: 51, max: 999, multiplier: 2.2,  color: '#8B5CF6', badge: 'bg-purple-500/15 text-purple-400' },
}

// ═══════════════════════════════════════════════════════
// PRICE FLOORS — Hard-coded minimum monthly prices
// ═══════════════════════════════════════════════════════

export const PRICE_FLOORS = {
  shared: 1500,
  vps: 6500,   // Linux VPS base + managed support
  custom_dev: 0,
}

// ═══════════════════════════════════════════════════════
// BASE PLAN DEFINITIONS
// ═══════════════════════════════════════════════════════

export const BASE_PLANS = {
  shared: [
    { id: 'shared-starter',      name: 'Starter',      base: 1500,  category: 'shared' },
    { id: 'shared-professional', name: 'Professional',  base: 2499,  category: 'shared' },
    { id: 'shared-business',     name: 'Business',      base: 3999,  category: 'shared' },
    { id: 'shared-enterprise',   name: 'Enterprise',    base: 6499,  category: 'shared' },
  ],
  vps: [
    { id: 'vps-starter',         name: 'Linux VPS Starter',       base: 6500,   category: 'vps' },
    { id: 'vps-professional',    name: 'Linux VPS Professional',  base: 10500,  category: 'vps' },
    { id: 'vps-enterprise',      name: 'Linux VPS Enterprise',    base: 17999,  category: 'vps' },
  ],
  custom_dev: [
    { id: 'dev-portfolio',       name: 'Portfolio / Blog',       base: 8000,   category: 'custom_dev' },
    { id: 'dev-marketing',       name: 'Marketing Site',         base: 14500,  category: 'custom_dev' },
    { id: 'dev-high-traffic',    name: 'High-Traffic Service',   base: 34500,  category: 'custom_dev' },
    { id: 'dev-ecommerce',       name: 'Boutique E-commerce',    base: 54500,  category: 'custom_dev' },
    { id: 'dev-enterprise',      name: 'Enterprise System',      base: 750000, category: 'custom_dev' },
  ],
}

// ═══════════════════════════════════════════════════════
// TIER RESOLUTION
// ═══════════════════════════════════════════════════════

/**
 * Get the tier for a given user count
 * @param {number} userCount
 * @returns {object} Tier definition
 */
export function getTierForUserCount(userCount) {
  const count = Math.max(1, Math.round(userCount))
  if (count <= TIERS.SME.max) return TIERS.SME
  if (count <= TIERS.GROWTH.max) return TIERS.GROWTH
  return TIERS.ENTERPRISE
}

// ═══════════════════════════════════════════════════════
// PRICE CALCULATION
// ═══════════════════════════════════════════════════════

/**
 * Calculate the tiered monthly price for a plan + user count.
 * Formula: base × tier_multiplier, clamped to price floor.
 *
 * @param {object} plan - Plan from BASE_PLANS
 * @param {number} userCount - Number of users
 * @returns {{ price: number, tier: object, monthlyTotal: number }}
 */
export function calculateTieredPrice(plan, userCount) {
  const tier = getTierForUserCount(userCount)
  const rawPrice = Math.round(plan.base * tier.multiplier)
  const floor = PRICE_FLOORS[plan.category] || 0
  const price = Math.max(rawPrice, floor)

  return {
    price,
    tier,
    monthlyTotal: price,
    perUser: userCount > 0 ? Math.round(price / userCount) : price,
    basePlan: plan,
    userCount,
  }
}

/**
 * Calculate all plan prices for a given category and user count.
 * @param {'shared'|'vps'|'custom_dev'} category
 * @param {number} userCount
 * @returns {Array} Array of pricing results
 */
export function calculateAllPlans(category, userCount) {
  const plans = BASE_PLANS[category] || []
  return plans.map((plan) => calculateTieredPrice(plan, userCount))
}

// ═══════════════════════════════════════════════════════
// PRO-RATA BILLING
// ═══════════════════════════════════════════════════════

/**
 * Calculate pro-rata charge for adding a service mid-billing-cycle.
 *
 * @param {number} monthlyPrice - Full monthly price
 * @param {number} daysRemaining - Days left in current billing period
 * @param {number} totalDays - Total days in billing period (default 30)
 * @returns {{ dailyRate: number, proRataAmount: number, daysRemaining: number, totalDays: number }}
 */
export function calculateProRata(monthlyPrice, daysRemaining, totalDays = 30) {
  const dailyRate = monthlyPrice / totalDays
  const proRataAmount = Math.round(dailyRate * daysRemaining * 100) / 100

  return {
    dailyRate: Math.round(dailyRate * 100) / 100,
    proRataAmount,
    daysRemaining,
    totalDays,
    monthlyPrice,
    savings: Math.round((monthlyPrice - proRataAmount) * 100) / 100,
  }
}

/**
 * Calculate pro-rata for upgrading from one plan to another mid-cycle.
 *
 * @param {number} currentMonthly - Current plan monthly price
 * @param {number} newMonthly - New plan monthly price
 * @param {number} daysRemaining - Days left in current billing period
 * @param {number} totalDays - Total days in billing period
 * @returns {{ upgradeCharge: number, dailyDifference: number }}
 */
export function calculateUpgradeProRata(currentMonthly, newMonthly, daysRemaining, totalDays = 30) {
  const dailyDifference = (newMonthly - currentMonthly) / totalDays
  const upgradeCharge = Math.max(0, Math.round(dailyDifference * daysRemaining * 100) / 100)

  return {
    upgradeCharge,
    dailyDifference: Math.round(dailyDifference * 100) / 100,
    daysRemaining,
    currentMonthly,
    newMonthly,
    nextFullCharge: newMonthly,
  }
}

// ═══════════════════════════════════════════════════════
// RESOURCE SCALING (for VPS/Shared display)
// ═══════════════════════════════════════════════════════

const RESOURCE_SCALES = {
  shared: {
    SME:        { storage: '1x',  email: '1x',  bandwidth: '1x'  },
    GROWTH:     { storage: '2x',  email: '3x',  bandwidth: '2x'  },
    ENTERPRISE: { storage: '4x',  email: '∞',   bandwidth: '5x'  },
  },
  vps: {
    SME:        { vcpu: '1x',  ram: '1x',  storage: '1x',  bandwidth: '1x'  },
    GROWTH:     { vcpu: '2x',  ram: '2x',  storage: '2x',  bandwidth: '2x'  },
    ENTERPRISE: { vcpu: '3x',  ram: '3x',  storage: '3x',  bandwidth: '4x'  },
  },
}

/**
 * Get scaled resource levels for a category + tier.
 * @param {'shared'|'vps'} category
 * @param {object} tier - Tier from getTierForUserCount
 * @returns {object} Resource scale multipliers
 */
export function getResourceScale(category, tier) {
  const tierKey = tier.label.toUpperCase()
  return RESOURCE_SCALES[category]?.[tierKey] || {}
}

// ═══════════════════════════════════════════════════════
// FORMATTERS
// ═══════════════════════════════════════════════════════

/**
 * Format price in ZAR with comma thousand separators
 */
export function formatZAR(amount) {
  return `R${amount.toLocaleString('en-ZA')}`
}
