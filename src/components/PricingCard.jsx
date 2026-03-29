import { Link } from '@/lib/navigation'

export default function PricingCard({ tier, price, period, description, features = [], ctaText = 'Get Started', ctaHref = '#', featured = false, badge = null }) {
  const btnClass = `inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-sm transition-all no-underline ${
    featured
      ? 'bg-[var(--color-accent)] text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5'
      : 'border-[1.5px] border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white'
  }`

  return (
    <div className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
      featured
        ? 'bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-secondary)]/5 border-2 border-[var(--color-accent)]/30 shadow-[0_0_40px_var(--color-accent-glow)]'
        : 'bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] hover:border-[var(--color-accent)]/20'
    }`}>
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full uppercase tracking-wider whitespace-nowrap">
          {badge}
        </span>
      )}

      <div className="text-[var(--color-accent-light)] text-xs font-bold tracking-[0.12em] uppercase mb-3">
        {tier}
      </div>

      <div className="flex items-end gap-1 mb-3">
        {price && (
          <>
            <span className="text-[var(--color-text-muted)] text-lg">R</span>
            <span className="text-white text-4xl font-extrabold tracking-tight">{price}</span>
          </>
        )}
        {period && (
          <span className="text-[var(--color-text-muted)] text-sm mb-1 ml-1">{period}</span>
        )}
      </div>

      {description && (
        <p className="text-[var(--color-text-muted)] text-sm mb-6 leading-relaxed">{description}</p>
      )}

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[var(--color-text-light)] text-sm">
            <span className="text-[var(--color-success)] mt-0.5 flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {ctaHref.startsWith('/') ? (
        <Link to={ctaHref} className={btnClass}>
          {ctaText}
        </Link>
      ) : (
        <a href={ctaHref} className={btnClass}>
          {ctaText}
        </a>
      )}
    </div>
  )
}
