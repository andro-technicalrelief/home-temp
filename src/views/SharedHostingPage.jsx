import SectionHeader from '../components/SectionHeader'
import PricingCard from '../components/PricingCard'
import CTABanner from '../components/CTABanner'
import PricingSlider from '../components/PricingSlider'
import { BASE_PLANS } from '../services/pricingEngine'

/* Price floor: minimum R550/mo — DirectAdmin license included */

const plans = [
  {
    tier: 'Starter',
    price: '1,500',
    period: '/mo',
    description: 'Perfect for personal sites and small blogs. Fully set up and managed by our team.',
    features: [
      '10 GB NVMe SSD Storage',
      '1 Website',
      '5 Email Accounts',
      'Free SSL Certificate',
      'DirectAdmin Control Panel',
      'Weekly Managed Backups',
      '500 GB Bandwidth',
      'Full Setup Included',
      'Standard Support',
    ],
    ctaText: 'Get Started',
  },
  {
    tier: 'Professional',
    price: '2,499',
    period: '/mo',
    featured: true,
    badge: 'Most Popular',
    description: 'For growing businesses and professional portfolios. We handle every aspect.',
    features: [
      '30 GB NVMe SSD Storage',
      '5 Websites',
      '25 Email Accounts',
      'Free SSL Certificate',
      'DirectAdmin Control Panel',
      'Daily Backups (14-day Retention)',
      '1 TB Bandwidth',
      'Full Setup Included',
      'Priority Support',
    ],
    ctaText: 'Get Started',
  },
  {
    tier: 'Business',
    price: '3,999',
    period: '/mo',
    description: 'High-performance hosting for demanding websites and applications.',
    features: [
      '60 GB NVMe SSD Storage',
      '15 Websites',
      '50 Email Accounts',
      'Free Wildcard SSL',
      'DirectAdmin Control Panel',
      'Daily Backups (30-day Retention)',
      '2 TB Bandwidth',
      'Redis Caching',
      'Full Setup Included',
      'Premium Support',
    ],
    ctaText: 'Get Started',
  },
  {
    tier: 'Enterprise',
    price: '6,499',
    period: '/mo',
    description: 'Enterprise-grade shared hosting for mission-critical websites.',
    features: [
      '120 GB NVMe SSD Storage',
      'Unlimited Websites',
      'Unlimited Email Accounts',
      'Wildcard SSL',
      'DirectAdmin Control Panel',
      'Daily Backups (60-day Retention)',
      '5 TB Bandwidth',
      'Full Caching Stack',
      'Dedicated IP Address',
      'Full Setup Included',
      'White-Glove Support',
    ],
    ctaText: 'Contact Sales',
  },
]

const features = [
  { icon: '🖥️', title: 'DirectAdmin Control Panel', desc: 'Industry-leading web hosting control panel for managing websites, email, databases, and files. We pre-configure it for you.' },
  { icon: '🔒', title: 'Free SSL Certificates', desc: 'Every domain gets a free SSL certificate automatically installed and renewed. Wildcard SSL on Business plans and above.' },
  { icon: '💾', title: 'Managed Backups', desc: 'Automated backups with configurable retention periods. One-click restore available. We monitor backup health proactively.' },
  { icon: '📧', title: 'Professional Email', desc: 'Full email hosting with your domain name. Webmail access, IMAP/POP3/SMTP, spam filtering, and forwarding — all set up for you.' },
  { icon: '⚡', title: 'NVMe SSD Performance', desc: 'All plans run on NVMe SSDs for blazing-fast read/write speeds. Up to 10x faster than traditional SATA SSDs.' },
  { icon: '🛡️', title: 'Security & Monitoring', desc: 'Firewall, malware scanning, DDoS protection, and 24/7 monitoring included. We handle security patches and updates.' },
]

const comparisonHeaders = ['Feature', 'Starter', 'Professional', 'Business', 'Enterprise']
const comparisonRows = [
  ['NVMe Storage', '10 GB', '30 GB', '60 GB', '120 GB'],
  ['Websites', '1', '5', '15', 'Unlimited'],
  ['Email Accounts', '5', '25', '50', 'Unlimited'],
  ['SSL Certificate', 'Free', 'Free', 'Wildcard', 'Wildcard'],
  ['DirectAdmin', '✓', '✓', '✓', '✓'],
  ['Backups', 'Weekly', '14-day', '30-day', '60-day'],
  ['Bandwidth', '500 GB', '1 TB', '2 TB', '5 TB'],
  ['Caching (Redis)', '—', '—', '✓', '✓'],
  ['Dedicated IP', '—', '—', '—', '✓'],
  ['Full Setup', '✓', '✓', '✓', '✓'],
  ['Support Level', 'Standard', 'Priority', 'Premium', 'White-Glove'],
]

export default function SharedHostingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 inline-block">
            Shared Web Hosting
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Managed <span className="text-gradient">Web Hosting</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[700px] mx-auto">
            High-performance shared hosting with DirectAdmin, managed backups, SSL, and email — all fully set up and managed for you.
            <strong className="text-white"> You never touch a server.</strong>
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="plans">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Hosting Plans"
            title="Choose Your"
            titleGradient="Hosting Plan"
            description="Every plan includes full setup, DirectAdmin access, managed backups, and ongoing management. We handle all the technical work."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((p) => (
              <PricingCard key={p.tier} {...p} ctaHref="/get-started" />
            ))}
          </div>
          <p className="text-center text-[var(--color-text-muted)] text-xs mt-6">
            All prices exclude VAT. Billed monthly. No long-term contracts required.
          </p>
        </div>
      </section>

      {/* Tiered Pricing — Interactive */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[800px] mx-auto px-6">
          <SectionHeader
            label="Team Scaling"
            title="Pricing Scales With"
            titleGradient="Your Team"
            description="Our tiered pricing adjusts based on your team size. Slide to see how your plan scales across SME, Growth, and Enterprise tiers."
            dark
          />
          <div className="flex flex-col gap-6">
            {BASE_PLANS.shared.map((plan) => (
              <PricingSlider key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="What's Included"
            title="Every Plan Includes"
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

      {/* Comparison Table */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="compare">
        <div className="max-w-[1000px] mx-auto px-6">
          <SectionHeader
            label="Plan Comparison"
            title="Compare"
            titleGradient="All Plans"
            dark
          />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-accent)]/20">
                  {comparisonHeaders.map((h, i) => (
                    <th key={h} className={`py-4 px-4 text-xs uppercase tracking-wider font-bold ${i === 0 ? 'text-left text-[var(--color-text-muted)]' : 'text-center text-white'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--color-border-dark)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={`py-3.5 px-4 text-sm ${j === 0 ? 'text-left text-[var(--color-text-light)] font-medium' : 'text-center text-[var(--color-text-muted)]'} ${cell === '✓' ? '!text-[var(--color-success)]' : cell === '—' ? 'opacity-40' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title="Ready for Hassle-Free Hosting?"
            description="Get started today. We set up your hosting, email, SSL, DNS, and backups — you just send us your content."
            primaryText="Choose a Plan"
            primaryHref="#plans"
            secondaryText="Talk to Sales"
            secondaryHref="/get-started"
          />
        </div>
      </section>
    </main>
  )
}
