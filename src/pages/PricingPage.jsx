import SectionHeader from '../components/SectionHeader'
import PricingCard from '../components/PricingCard'
import CTABanner from '../components/CTABanner'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'

/* ════════════════════════════════════════════════════════
   SERVICES & PRICING — Updated tiers
   ════════════════════════════════════════════════════════ */

const serviceTiers = [
  {
    tier: 'Portfolio / Blogs',
    price: '8,000',
    period: 'once-off',
    description: 'Clean, fast single-page or multi-page sites for personal brands, freelancers, and bloggers.',
    features: [
      'Custom Design & Development',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Hosting & Domain Setup',
      'Analytics & Uptime Monitoring',
      '3–4 Week Turnaround',
      'Full Deployment Included',
    ],
    ctaText: 'Get Started',
    retainer: '4,000',
  },
  {
    tier: 'Marketing Sites',
    price: '14,500',
    period: 'once-off',
    description: 'Multi-page marketing websites built for lead generation and brand presence.',
    features: [
      'Everything in Portfolio',
      'Advanced SEO & Meta Setup',
      'Contact Forms & CTA Flows',
      'CMS Integration (optional)',
      'Performance Optimization',
      'Social Media Integration',
      '4–6 Week Turnaround',
      'Full Deployment Included',
    ],
    ctaText: 'Get Started',
    featured: true,
    badge: 'Most Popular',
    retainer: '6,500',
  },
  {
    tier: 'High-Traffic Service Sites',
    price: '34,500',
    period: 'once-off',
    description: 'Scalable service platforms for businesses expecting significant traffic and complex user flows.',
    features: [
      'Everything in Marketing',
      'Custom Booking / Inquiry Systems',
      'User Authentication',
      'API Integrations',
      'Advanced Analytics',
      'Load-Optimized Architecture',
      '6–8 Week Turnaround',
      'Full Deployment Included',
    ],
    ctaText: 'Get Started',
    retainer: '10,500',
  },
  {
    tier: 'Custom Boutique E-commerce',
    price: '54,500',
    period: 'once-off',
    description: 'Bespoke e-commerce solutions with custom checkout, payment integration, and inventory management.',
    features: [
      'Everything in Service Sites',
      'Custom Checkout Flow',
      'Payment Gateway Integration',
      'Inventory & Order Management',
      'Automated Email Notifications',
      'Admin Dashboard',
      '8–12 Week Turnaround',
      'Full Deployment & Training',
    ],
    ctaText: 'Get Started',
    retainer: '27,500',
  },
]

const enterpriseTier = {
  tier: 'Enterprise Systems',
  description: 'Large-scale enterprise applications, SaaS platforms, and multi-tenant systems built with scalable architecture and long-term support.',
  features: [
    'Scalable Microservice Architecture',
    'Advanced UI/UX Design',
    'Database Design & Optimization',
    'Full API Development',
    'CI/CD Pipeline Setup',
    'DevOps & Infrastructure',
    'Dedicated Account Manager',
    'Ongoing Strategic Support',
    '6–12+ Month Engagement',
  ],
}

/* ════════════════════════════════════════════════════════
   SHARED HOSTING PLANS
   ════════════════════════════════════════════════════════ */

const sharedHosting = [
  {
    tier: 'Starter', price: '1,500', period: '/mo',
    description: 'Personal sites and simple blogs. Fully set up and managed.',
    features: ['10 GB NVMe SSD', '1 Website', '5 Email Accounts', 'Free SSL', 'Weekly Backups', '500 GB Bandwidth', 'DirectAdmin Panel', 'Full Setup Included'],
  },
  {
    tier: 'Professional', price: '2,499', period: '/mo', featured: true, badge: 'Most Popular',
    description: 'Growing businesses and professional portfolios. We handle everything.',
    features: ['30 GB NVMe SSD', '5 Websites', '25 Email Accounts', 'Free SSL', 'Daily Backups (14-day)', '1 TB Bandwidth', 'DirectAdmin Panel', 'Priority Support'],
  },
  {
    tier: 'Business', price: '3,999', period: '/mo',
    description: 'High-performance hosting for demanding websites and applications.',
    features: ['60 GB NVMe SSD', '15 Websites', '50 Email Accounts', 'Wildcard SSL', 'Daily Backups (30-day)', '2 TB Bandwidth', 'Redis Caching', 'Premium Support'],
  },
  {
    tier: 'Enterprise', price: '6,499', period: '/mo',
    description: 'Enterprise-grade hosting for mission-critical websites.',
    features: ['120 GB NVMe SSD', 'Unlimited Websites', 'Unlimited Email', 'Wildcard SSL', 'Daily Backups (60-day)', '5 TB Bandwidth', 'Dedicated IP', 'White-Glove Support'],
  },
]

/* ════════════════════════════════════════════════════════
   MANAGED VPS HOSTING
   ════════════════════════════════════════════════════════ */

const vpsPlans = [
  {
    tier: 'Linux VPS Starter', price: '6,500', period: '/mo',
    description: 'Managed Linux VPS for small to medium workloads. Full server management included.',
    features: ['Linux OS (Ubuntu/Debian/Alma)', '2 vCPU · 4 GB RAM', '50 GB NVMe SSD', '2 TB Bandwidth', 'Root Access (SSH)', 'Full Server Setup', 'Managed Security & Firewall', 'Standard Support'],
  },
  {
    tier: 'Linux VPS Professional', price: '10,500', period: '/mo', featured: true, badge: 'Recommended',
    description: 'High-performance managed Linux VPS for production apps and e-commerce.',
    features: ['Linux OS (Ubuntu/Debian/Alma)', '4 vCPU · 8 GB RAM', '120 GB NVMe SSD', '4 TB Bandwidth', 'Root Access (SSH)', 'Full Managed Stack', 'Daily Backups (14-day)', 'Priority Support'],
  },
  {
    tier: 'Linux VPS Enterprise', price: '17,999', period: '/mo',
    description: 'Enterprise-grade managed Linux VPS for mission-critical applications.',
    features: ['Linux OS (Ubuntu/Debian/Alma)', '8 vCPU · 16 GB RAM', '250 GB NVMe SSD', '8 TB Bandwidth', 'Root Access (SSH)', 'Full Managed Stack', 'Daily Backups (30-day)', 'Dedicated Account Manager'],
    ctaText: 'Contact Sales',
  },
]

/* ════════════════════════════════════════════════════════
   USAGE-BASED ADD-ONS
   ════════════════════════════════════════════════════════ */

const addOns = [
  {
    icon: '⚙️',
    title: 'n8n Workflow Tasks',
    description: 'Automate business processes with our managed n8n instance. Tasks billed on usage — only pay for what you run.',
    pricing: 'From R0.05 / task execution',
    features: ['Managed n8n Instance', 'Custom Workflow Design', 'API Integrations', 'Webhook Triggers', 'Error Monitoring & Alerts', 'Included in Retainer Plans'],
  },
  {
    icon: '🤖',
    title: 'AI Token Credits',
    description: 'Integrate AI capabilities into your workflows and applications. Token-based billing for GPT, Claude, and other models.',
    pricing: 'From R0.10 / 1K tokens',
    features: ['GPT-4, Claude & More', 'Custom AI Integrations', 'RAG Pipelines', 'Chatbot Automation', 'Content Generation', 'Usage Dashboard'],
  },
  {
    icon: '🖥️',
    title: 'DirectAdmin VPS Panel',
    description: 'Your clients get their own web server with DirectAdmin pre-configured. We manage the server — they manage their sites.',
    pricing: 'Included with VPS plans',
    features: ['Pre-configured DirectAdmin', 'Client Self-Service Panel', 'Email & DNS Management', 'One-Click SSL', 'File Manager & Backups', 'We Handle Server-Side'],
  },
]

export default function PricingPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Plans & <span className="text-gradient">Pricing</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[700px] mx-auto leading-relaxed">
            Transparent pricing across all services. No hidden fees, no surprises. Every plan includes full
            setup, management, and ongoing support — <strong className="text-white">we handle everything for you.</strong>
          </p>
        </div>
      </section>

      {/* ═══ SERVICES & PRICING ═══ */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="services-pricing">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Services & Pricing"
            title="Project-Based"
            titleGradient="Pricing"
            description={<>Every project includes full deployment, hosting setup, and handover. <strong className="text-white">We build it, deploy it, and manage it — you just provide the vision.</strong></>}
            dark
          />

          {/* Service tier cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {serviceTiers.map((t) => (
              <div key={t.tier} className="flex flex-col">
                <PricingCard {...t} ctaHref="/get-started" />
                {/* Retainer line */}
                <div className="mt-3 text-center py-3 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl">
                  <span className="text-[var(--color-text-muted)] text-xs">Retainer: </span>
                  <span className="text-white font-bold text-sm">R{t.retainer}</span>
                  <span className="text-[var(--color-text-muted)] text-xs">/mo</span>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise tier */}
          <div className="bg-gradient-to-r from-[var(--color-bg-card)] to-[var(--color-bg-navy)] border border-[var(--color-border-dark)] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="text-[var(--color-accent-light)] text-xs font-bold tracking-[0.12em] uppercase mb-3">
                {enterpriseTier.tier}
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-white text-4xl font-extrabold tracking-tight">R750,000+</span>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm mb-2 leading-relaxed">
                {enterpriseTier.description}
              </p>
              <p className="text-[var(--color-text-muted)] text-xs italic">
                6–12+ month engagement • Payment terms negotiable • NDA available
              </p>
            </div>
            <div className="flex-1">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {enterpriseTier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[var(--color-text-light)] text-sm">
                    <span className="text-[var(--color-success)] mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/get-started"
                className="mt-6 inline-flex items-center justify-center py-3 px-8 border-[1.5px] border-[var(--color-accent)] text-[var(--color-accent)] rounded-xl font-semibold text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all no-underline"
              >
                Contact Sales
              </a>
            </div>
          </div>

          {/* Payment terms */}
          <div className="max-w-[700px] mx-auto mt-10 p-5 bg-white/5 rounded-2xl border border-[var(--color-border-dark)] text-center">
            <p className="text-[var(--color-text-light)] text-sm">
              <strong className="text-white">Payment Terms:</strong> 50% deposit on Day 1 to start our process, then 25% at
              the midpoint, and the final 25% on the final day of the project. Before paying or starting any design
              or development work, the relevant contracts must be signed.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ INFRASTRUCTURE — Shared Hosting ═══ */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="shared-hosting">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Infrastructure · Shared Hosting"
            title="Shared Hosting"
            titleGradient="Plans"
            description={<>Fully managed hosting with SSL, backups, and monitoring included in every plan. <strong className="text-white">We set up your entire hosting environment — email, domains, databases, everything.</strong></>}
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {sharedHosting.map((p) => (
              <PricingCard key={p.tier} {...p} ctaHref="https://www.technicalrelief.co.za/billing/client/login/" />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INFRASTRUCTURE — Managed VPS ═══ */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="vps-hosting">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Infrastructure · Managed Linux VPS"
            title="Managed Linux VPS"
            titleGradient="Plans"
            description={<>Dedicated Linux VPS with full management, monitoring, and security. R2,500 server + R2,500 managed support included. <strong className="text-white">We configure your entire Linux server stack from scratch.</strong></>}
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vpsPlans.map((p) => (
              <PricingCard key={p.tier} {...p} ctaHref="/get-started" />
            ))}
          </div>

          {/* VPS disclaimer */}
          <div className="max-w-[700px] mx-auto mt-8 p-5 bg-amber-500/8 rounded-2xl border border-amber-500/15 text-center">
            <p className="text-[var(--color-text-light)] text-sm">
              <strong className="text-amber-400">Please note:</strong> VPS pricing does not include optional add-ons — DirectAdmin license (R100/mo), Paystack integration (R100/mo), or GoHighLevel (R2,500/mo). These are billed separately if required.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ NETLIFY HOSTING ═══ */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="netlify-hosting">
        <div className="max-w-[800px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Modern App Hosting"
              title="Managed Netlify"
              titleGradient="React Hosting"
              description={<>We host and manage your React, Next.js, and static web applications on Netlify — deployed, monitored, and maintained by our team. <strong className="text-white">R1,500/mo all-inclusive.</strong></>}
              dark
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">🚀</div>
                <div>
                  <div className="text-[var(--color-accent-light)] text-xs font-bold tracking-[0.12em] uppercase mb-1">Netlify Managed Hosting</div>
                  <div className="flex items-end gap-1">
                    <span className="text-[var(--color-text-muted)] text-lg">R</span>
                    <span className="text-white text-4xl font-extrabold tracking-tight">1,500</span>
                    <span className="text-[var(--color-text-muted)] text-sm mb-1 ml-1">/mo</span>
                  </div>
                </div>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                Perfect for React, Next.js, Gatsby, and modern JavaScript applications. We handle deployment pipelines, domain configuration, SSL, environment variables, and ongoing maintenance.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {['Continuous Deployment (CI/CD)', 'Custom Domain & SSL', 'Environment Variables Management', 'Build Optimization', 'Edge Network (CDN)', 'Uptime Monitoring', 'Rollback Support', 'Full Setup & Maintenance'].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[var(--color-text-light)] text-sm">
                    <span className="text-[var(--color-success)] mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/get-started"
                className="inline-flex items-center justify-center py-3 px-8 bg-[var(--color-accent)] text-white rounded-xl font-semibold text-sm shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all no-underline"
              >
                Get Started
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INFRASTRUCTURE — Usage-Based Add-Ons ═══ */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="add-ons">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Infrastructure · Add-Ons"
            title="Usage-Based"
            titleGradient="Add-Ons"
            description="Extend your infrastructure with automation, AI capabilities, and client management tools. Pay only for what you use."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <div key={addon.title} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 transition-all duration-300 flex flex-col">
                <div className="text-4xl mb-4">{addon.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{addon.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">{addon.description}</p>
                <div className="py-2 px-4 bg-[var(--color-accent)]/10 rounded-lg border border-[var(--color-accent)]/20 mb-6 inline-block self-start">
                  <span className="text-[var(--color-accent-light)] text-sm font-semibold">{addon.pricing}</span>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {addon.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[var(--color-text-light)] text-sm">
                      <span className="text-[var(--color-success)] mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* API hosting note */}
          <div className="max-w-[700px] mx-auto mt-10 p-5 bg-white/5 rounded-2xl border border-[var(--color-border-dark)] text-center">
            <p className="text-[var(--color-text-light)] text-sm">
              <strong className="text-white">Deployment:</strong> Our API services run on Render for fast, scalable delivery.
              Your clients' web servers are provisioned with DirectAdmin for full self-service management — we handle all server-side configuration.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHY TECHNICAL RELIEF ═══ */}
      <section className="py-24 bg-[var(--color-bg-light)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Why Technical Relief?"
            title="This Is Not DIY Hosting or Development"
            description={<>We provide fully managed infrastructure with engineering-grade development. <strong>Everything is set up and maintained for you.</strong></>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🛡️', title: 'We Set It All Up', desc: 'Every plan includes complete setup — hosting, email, SSL, DNS, databases, deployment. Zero technical knowledge required from you.' },
              { icon: '⚡', title: 'Performance First', desc: 'NVMe SSDs, server-level caching, CDN integration, and continuous optimization. Your sites load fast, always.' },
              { icon: '🤝', title: 'Real Expert Support', desc: "Real engineers, not script readers. Our support team understands your infrastructure because they built and set it up." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-lg text-[var(--color-text-dark)] mb-2">{item.title}</h4>
                <p className="text-[var(--color-text-body)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title="Ready to Get Started?"
            description={<>Choose a plan that fits your needs or talk to our team for a custom solution. No setup fees, 30-day money-back guarantee. <strong className="text-white">We set everything up for you.</strong></>}
            primaryText="Choose a Plan"
            primaryHref="#services-pricing"
            secondaryText="Talk to Sales"
            secondaryHref="/get-started"
          />
        </div>
      </section>
    </main>
  )
}
