export default function SectionHeader({ label, title, titleGradient, description, dark = false }) {
  return (
    <div className="text-center max-w-[700px] mx-auto mb-16">
      {label && (
        <span className={`text-xs font-bold tracking-[0.12em] uppercase ${dark ? 'text-[var(--color-accent-light)]' : 'text-[var(--color-accent)]'}`}>
          {label}
        </span>
      )}
      <h2 className={`mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight ${dark ? 'text-white' : 'text-[var(--color-text-dark)]'}`}>
        {title} {titleGradient && <span className="text-gradient">{titleGradient}</span>}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed max-w-[800px] mx-auto ${dark ? 'text-[var(--color-text-light)]' : 'text-[var(--color-text-body)]'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
