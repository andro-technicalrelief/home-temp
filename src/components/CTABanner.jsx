import { Link } from '@/lib/navigation'

export default function CTABanner({ title, description, primaryText, primaryHref, secondaryText, secondaryHref }) {
  return (
    <div className="relative bg-gradient-to-br from-[var(--color-bg-navy)] to-[var(--color-bg-dark)] rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-[var(--color-border-dark)]">
      {/* Glow */}
      <div className="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        {description && (
          <p className="text-[var(--color-text-light)] text-lg max-w-[600px] mx-auto mb-8">{description}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {primaryHref?.startsWith('/') ? (
            <Link to={primaryHref} className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all no-underline text-[17px]">
              {primaryText}
            </Link>
          ) : (
            <a href={primaryHref} className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all no-underline text-[17px]">
              {primaryText}
            </a>
          )}
          {secondaryText && (
            secondaryHref?.startsWith('/') ? (
              <Link to={secondaryHref} className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-white/25 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/50 transition-all no-underline text-[17px]">
                {secondaryText}
              </Link>
            ) : (
              <a href={secondaryHref} className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-white/25 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/50 transition-all no-underline text-[17px]">
                {secondaryText}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  )
}
