import SectionHeader from '../components/SectionHeader'
import PricingCard from '../components/PricingCard'
import CTABanner from '../components/CTABanner'
import PricingSlider from '../components/PricingSlider'
import { BASE_PLANS } from '../services/pricingEngine'

/* Price structure: R2,500 Linux VPS base + R2,500 fully managed = R5,000/mo minimum */

const plans = [
  {
    tier: 'Linux VPS Starter',
    price: '5,000',
    period: '/mo',
    description: 'Managed Linux VPS for small to medium workloads. Includes R2,500 server + R2,500 fully managed support & DirectAdmin license.',
    features: [
      'Linux VPS (Ubuntu/Debian/Alma)',
      '2 vCPU Cores',
      '4 GB DDR4 RAM',
      '50 GB NVMe SSD',
      '2 TB Bandwidth',
      'Root Access (SSH)',
      'DirectAdmin License Included',
      'R2,500 Managed Support Included',
      'Managed Security & Firewall',
      'Weekly Backups',
      'DDoS Protection',
      'Full Server Setup',
      'Standard Support',
    ],
    ctaText: 'Get Started',
  },
  {
    tier: 'Linux VPS Professional',
    price: '8,500',
    period: '/mo',
    featured: true,
    badge: 'Recommended',
    description: 'High-performance managed Linux VPS for production apps, APIs, and e-commerce. Server + fully managed stack.',
    features: [
      'Linux VPS (Ubuntu/Debian/Alma)',
      '4 vCPU Cores',
      '8 GB DDR4 RAM',
      '120 GB NVMe SSD',
      '4 TB Bandwidth',
      'Root Access (SSH)',
      'DirectAdmin License Included',
      'R2,500 Managed Support Included',
      'Full Managed Stack',
      'Daily Backups (14-day)',
      'Dedicated IPv4 Address',
      'DDoS Protection',
      'Full Server Setup',
      'Priority Support',
    ],
    ctaText: 'Get Started',
  },
  {
    tier: 'Linux VPS Enterprise',
    price: '14,999',
    period: '/mo',
    description: 'Enterprise-grade managed Linux VPS for high-traffic, mission-critical applications. Dedicated resources + 24/7 support.',
    features: [
      'Linux VPS (Ubuntu/Debian/Alma)',
      '8 vCPU Cores',
      '16 GB DDR4 RAM',
      '250 GB NVMe SSD',
      '8 TB Bandwidth',
      'Root Access (SSH)',
      'DirectAdmin License Included',
      'R2,500 Managed Support Included',
      'Full Managed Stack',
      'Daily Backups (30-day)',
      'Dedicated IPv4 Address',
      'Load Balancer Ready',
      'Full Server Setup',
      'Dedicated Account Manager',
    ],
    ctaText: 'Contact Sales',
  },
]

const useCases = [
  { icon: '🐧', title: 'Linux Web Apps', desc: 'Node.js, Next.js, Django, Laravel — run any framework on your Linux VPS with full root access and our managed stack.' },
  { icon: '🛒', title: 'E-Commerce Platforms', desc: 'WooCommerce, custom stores, and headless e-commerce on dedicated Linux resources with NVMe performance.' },
  { icon: '📡', title: 'API Servers', desc: 'REST APIs, GraphQL servers, and microservices on Linux with dedicated compute and high throughput networking.' },
  { icon: '📊', title: 'SaaS Applications', desc: 'Multi-tenant SaaS platforms on Linux VPS with isolated resources, auto-scaling ready, and enterprise security.' },
  { icon: '🎮', title: 'Game Servers', desc: 'Low-latency Linux gaming servers with dedicated resources and DDoS protection for competitive gaming.' },
  { icon: '💾', title: 'Database Servers', desc: 'MySQL, PostgreSQL, MongoDB — dedicated Linux database servers with optimized storage and backup strategies.' },
]

const specs = [
  { label: 'Operating System', value: 'Linux — Ubuntu, Debian, CentOS, AlmaLinux, Rocky Linux' },
  { label: 'Processor', value: 'AMD EPYC™ / Intel Xeon® (latest gen)' },
  { label: 'Storage', value: 'Enterprise NVMe SSDs (up to 10x faster than SATA)' },
  { label: 'Network', value: '1 Gbps uplink, Tier-1 SA data centres' },
  { label: 'Hypervisor', value: 'KVM virtualization (full isolation)' },
  { label: 'Control Panel', value: 'DirectAdmin (license included & pre-configured)' },
  { label: 'Security', value: 'Firewall, IDS, DDoS mitigation, fail2ban' },
  { label: 'Monitoring', value: 'Real-time CPU, RAM, disk, network monitoring' },
]

const comparisonHeaders = ['Specification', 'Linux VPS Starter', 'Linux VPS Pro', 'Linux VPS Enterprise']
const comparisonRows = [
  ['Linux OS', '✓', '✓', '✓'],
  ['vCPU Cores', '2', '4', '8'],
  ['RAM', '4 GB', '8 GB', '16 GB'],
  ['NVMe Storage', '50 GB', '120 GB', '250 GB'],
  ['Bandwidth', '2 TB', '4 TB', '8 TB'],
  ['Root Access', '✓', '✓', '✓'],
  ['DirectAdmin License', '✓', '✓', '✓'],
  ['Managed Support (R2,500)', '✓', '✓', '✓'],
  ['Managed Stack', 'Basic', 'Full', 'Full'],
  ['Backup Retention', 'Weekly', '14-day', '30-day'],
  ['Dedicated IP', '—', '✓', '✓'],
  ['Load Balancer', '—', '—', '✓'],
  ['Full Setup', '✓', '✓', '✓'],
  ['Support Level', 'Standard', 'Priority', 'Dedicated Manager'],
]

export default function VPSHostingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 inline-block">
            Managed Linux VPS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Managed <span className="text-gradient">Linux VPS Hosting</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[700px] mx-auto">
            High-performance Linux VPS with dedicated resources, root access, and DirectAdmin — fully provisioned
            and managed by our engineering team. <strong className="text-white">R2,500 server + R2,500 managed support.</strong>
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="plans">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Linux VPS Plans"
            title="Choose Your"
            titleGradient="Linux VPS Plan"
            description="Every Linux VPS includes full server provisioning, DirectAdmin license, security hardening, and R2,500/mo managed support. We handle the entire stack."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <PricingCard key={p.tier} {...p} ctaHref="https://www.technicalrelief.co.za/billing/" />
            ))}
          </div>
          <p className="text-center text-[var(--color-text-muted)] text-xs mt-6">
            All prices exclude VAT. Billed monthly. Custom Linux configurations available on request.
          </p>
        </div>
      </section>

      {/* Tiered Pricing — Interactive */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[800px] mx-auto px-6">
          <SectionHeader
            label="Team Scaling"
            title="Linux VPS Pricing Scales With"
            titleGradient="Your Team"
            description="Our tiered pricing adjusts based on your team size. Resources and support scale automatically across SME, Growth, and Enterprise tiers."
            dark
          />
          <div className="flex flex-col gap-6">
            {BASE_PLANS.vps.map((plan) => (
              <PricingSlider key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Server Specs */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionHeader
            label="Infrastructure"
            title="Linux Server"
            titleGradient="Specifications"
            description="Enterprise-grade Linux hardware with the latest processors and NVMe storage. All servers are hosted in South African Tier-1 data centres."
            dark
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((s) => (
              <div key={s.label} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5 flex gap-4">
                <div>
                  <div className="text-xs text-[var(--color-accent-light)] font-bold uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-white text-sm">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Use Cases"
            title="Built For"
            titleGradient="Any Linux Workload"
            description="Whether you're running a single application or a complex multi-service architecture, our Linux VPS platform scales with you."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u) => (
              <div key={u.title} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 transition-all">
                <div className="text-4xl mb-4">{u.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{u.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="compare">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionHeader
            label="Plan Comparison"
            title="Compare"
            titleGradient="Linux VPS Plans"
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
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title="Need a Custom Linux VPS Configuration?"
            description="We build custom Linux server configurations for unique workloads. Let us design the perfect infrastructure for your project."
            primaryText="Choose a Plan"
            primaryHref="#plans"
            secondaryText="Contact Sales"
            secondaryHref="/about"
          />
        </div>
      </section>
    </main>
  )
}
