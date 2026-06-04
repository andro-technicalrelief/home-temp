'use client'

import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import { checkDomainAvailability } from '../services/hostafricaApi'

const tldPricing = [
  { tld: '.co.za', register: '100', renew: '100', transfer: '100' },
  { tld: '.com', register: '150', renew: '150', transfer: '150' },
  { tld: '.net', register: '180', renew: '180', transfer: '180' },
  { tld: '.org', register: '200', renew: '200', transfer: '200' },
  { tld: '.africa', register: '250', renew: '250', transfer: '250' },
  { tld: '.online', register: '120', renew: '120', transfer: '120' },
  { tld: '.store', register: '120', renew: '120', transfer: '120' },
  { tld: '.io', register: '450', renew: '450', transfer: '450' },
]

const features = [
  { icon: '🔒', title: 'Free WHOIS Privacy', desc: 'Your registration details are hidden from public WHOIS databases — included at no extra cost.' },
  { icon: '🔄', title: 'Auto-Renewal', desc: "Never lose your domain. We'll automatically renew before expiry and notify you in advance." },
  { icon: '⚙️', title: 'DNS Management', desc: 'Full DNS zone editor included — A records, CNAME, MX, TXT and more. We set it all up for you.' },
  { icon: '📧', title: 'Email Forwarding', desc: 'Forward emails from your domain to any existing inbox — included free with every domain.' },
  { icon: '🛡️', title: 'Domain Theft Protection', desc: 'Transfer locks and registrar-level security prevent unauthorized domain transfers.' },
  { icon: '🤝', title: 'Full Setup Included', desc: "We handle DNS configuration, email setup, and pointing to your hosting — you don't touch a thing." },
]

export default function DomainRegisterPage() {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    setResults(null)

    try {
      const domainName = query.trim().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
      const hasExtension = domainName.includes('.')
      const baseName = hasExtension ? domainName.split('.')[0] : domainName

      // Check searched domain, plus standard extensions
      const extensionsToCheck = hasExtension 
        ? [domainName.substring(baseName.length)] 
        : ['.co.za', '.com', '.net', '.org', '.online', '.africa']

      const checkPromises = extensionsToCheck.map(async (tld) => {
        const fullDomain = `${baseName}${tld}`
        try {
          const res = await checkDomainAvailability(fullDomain)
          const isAvailable = res.available === true || res.status === 'available' || res.status === 0 || res.available === 1
          const priceInfo = tldPricing.find((p) => p.tld === tld) || { register: '100' }
          
          return {
            domain: fullDomain,
            sld: baseName,
            tld: tld,
            available: isAvailable,
            price: priceInfo.register,
          }
        } catch (err) {
          console.error(`Failed to check ${fullDomain}:`, err)
          const priceInfo = tldPricing.find((p) => p.tld === tld) || { register: '100' }
          return {
            domain: fullDomain,
            sld: baseName,
            tld: tld,
            available: false,
            error: true,
            price: priceInfo.register,
          }
        }
      })

      const checkedDomains = await Promise.all(checkPromises)

      setResults({
        query: domainName,
        suggestions: checkedDomains,
      })
    } catch (err) {
      console.error('Error searching domains:', err)
    } finally {
      setSearching(false)
    }
  }

  const handleBuyNow = (sld, tld) => {
    const whmcsUrl = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://billing.technicalrelief.co.za'
    const cleanTld = tld.startsWith('.') ? tld : `.${tld}`
    const redirectUrl = `${whmcsUrl}/cart.php?a=add&domain=register&sld=${encodeURIComponent(sld)}&tld=${encodeURIComponent(cleanTld)}`
    
    window.location.href = redirectUrl
  }

  return (
    <main>
      {/* Hero / Search */}
      <section className="pt-32 pb-20 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
        <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
          <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 inline-block">
            Domain Registration
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Find Your Perfect <span className="text-gradient">Domain</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[600px] mx-auto">
            Search, register, and manage your domain names. We set up DNS, email forwarding, and SSL — all included.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-[640px] mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a domain name..."
                className="w-full px-6 py-4 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl text-white text-base placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {searching ? 'Searching...' : '🔍 Search'}
            </button>
          </form>
        </div>
      </section>

      {/* Search Results */}
      {results && (
        <section className="py-12 bg-[var(--color-bg-navy)]">
          <div className="max-w-[800px] mx-auto px-6">
            <h3 className="text-lg font-bold text-white mb-6">
              Results for "<span className="text-[var(--color-accent-light)]">{results.query}</span>"
            </h3>
            <div className="flex flex-col gap-3">
              {results.suggestions.map((r) => (
                <div
                  key={r.domain}
                  className={`flex items-center justify-between p-5 rounded-xl border transition-all ${
                    r.available
                      ? 'bg-[var(--color-bg-card)] border-[var(--color-success)]/20 hover:border-[var(--color-success)]/40'
                      : 'bg-[var(--color-bg-card)]/60 border-[var(--color-border-dark)] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      r.available ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]' : 'bg-[var(--color-error)]/15 text-[var(--color-error)]'
                    }`}>
                      {r.available ? 'Available' : 'Taken'}
                    </span>
                    <span className="text-white font-semibold">{r.domain}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-bold">R{r.price}<span className="text-[var(--color-text-muted)] text-xs">/yr</span></span>
                    {r.available && (
                      <button 
                        onClick={() => handleBuyNow(r.sld, r.tld)}
                        className="px-4 py-2 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer"
                      >
                        Register Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TLD Pricing Table */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="tld-pricing">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionHeader
            label="Domain Pricing"
            title="TLD"
            titleGradient="Pricing"
            description="Transparent per-year pricing. All domains include WHOIS privacy, DNS management, and full setup."
            dark
          />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  <th className="text-left py-4 px-4 text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-semibold">Extension</th>
                  <th className="text-right py-4 px-4 text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-semibold">Register</th>
                  <th className="text-right py-4 px-4 text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-semibold">Renew</th>
                  <th className="text-right py-4 px-4 text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-semibold">Transfer</th>
                </tr>
              </thead>
              <tbody>
                {tldPricing.map((t) => (
                  <tr key={t.tld} className="border-b border-[var(--color-border-dark)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                    <td className="py-4 px-4 text-white font-semibold">{t.tld}</td>
                    <td className="py-4 px-4 text-right text-[var(--color-text-light)]">R{t.register}/yr</td>
                    <td className="py-4 px-4 text-right text-[var(--color-text-light)]">R{t.renew}/yr</td>
                    <td className="py-4 px-4 text-right text-[var(--color-text-light)]">R{t.transfer}/yr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Domain setup fee */}
          <div className="max-w-[700px] mx-auto mt-8 p-5 bg-amber-500/8 rounded-2xl border border-amber-500/15 text-center">
            <p className="text-[var(--color-text-light)] text-sm">
              <strong className="text-amber-400">Domain Setup Fee:</strong> A once-off R350 setup fee applies to all new domain registrations. This covers DNS configuration, email setup, SSL pointing, and full integration with your hosting.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="What's Included"
            title="Every Domain Includes"
            titleGradient="These Features"
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title="Need Help Choosing a Domain?"
            description="Our team can help you find the perfect domain and set everything up — DNS, email, SSL, the lot."
            primaryText="Search Domains"
            primaryHref="#"
            secondaryText="Contact Us"
            secondaryHref="/get-started"
          />
        </div>
      </section>
    </main>
  )
}
