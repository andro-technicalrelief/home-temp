import { TIERS } from '../services/pricingEngine'

/**
 * Reusable tier badge component.
 * Displays SME (blue), Growth (amber), or Enterprise (purple).
 */
export default function TierBadge({ tier, size = 'sm' }) {
  const tierDef = typeof tier === 'string'
    ? Object.values(TIERS).find((t) => t.id === tier || t.label === tier) || TIERS.SME
    : tier

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  }

  return (
    <span className={`inline-flex items-center gap-1 font-bold tracking-wider uppercase rounded-full ${tierDef.badge} ${sizeClasses[size] || sizeClasses.sm}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tierDef.color }} />
      {tierDef.label}
    </span>
  )
}
