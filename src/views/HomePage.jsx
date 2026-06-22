'use client'

import { useState } from 'react'
import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'
import { useApp } from '@/context/AppContext'

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const stats = [
  { value: '99.9%', label: 'Guaranteed Uptime', icon: '🟢' },
  { value: '<200ms', label: 'Avg Response Time', icon: '⚡' },
  { value: '24/7', label: 'Active Monitoring', icon: '🛡️' },
  { value: '100%', label: 'Fully Managed', icon: '🤝' },
]

const partners = [
  { name: 'DirectAdmin', desc: 'Control Panel' },
  { name: 'HostAfrica', desc: 'Infrastructure' },
  { name: 'PayFast', desc: 'Payments' },
  { name: "Let's Encrypt", desc: 'SSL' },
  { name: 'CloudLinux', desc: 'OS' },
  { name: 'Imunify360', desc: 'Security' },
]

const services = [
  { icon: '💻', title: 'Custom Web Development', desc: 'Bespoke Next.js frontends engineered for flawless speed, premium UX, and maximum search engine visibility.', to: '/pricing' },
  { icon: '🔌', title: 'Backend Integrations', desc: 'Custom databases, automated API workflows, and workflow integrations built to scale your business operations.', to: '/pricing' },
  { icon: '🖥️', title: 'Managed Hosting', desc: 'Fully managed shared hosting with SSL, email accounts, and automated backups. We configure everything for you.', to: '/hosting' },
  { icon: '🐧', title: 'Linux VPS Hosting', desc: 'High-performance managed Linux VPS servers optimized for heavy workloads. Root access and managed support included.', to: '/vps' },
  { icon: '🌐', title: 'Domain Management', desc: 'Domain registration, WHOIS privacy, and DNS management. We handle all DNS pointing and configuration.', to: '/domains/register' },
  { icon: '🛠️', title: 'Operational Relief', desc: 'Proactive server maintenance, security patching, backups, and real-time monitoring. Focus on your business.', to: '/about' },
]

const industries = [
  { icon: '🩺', title: 'Medical & Doctors', desc: 'POPIA & HIPAA compliant booking and secure client records portals.', to: '/industries/doctors' },
  { icon: '🏗️', title: 'Property & Construction', desc: 'Build stage tracking, bid pipelines, and tender document repositories.', to: '/industries/construction' },
  { icon: '🧠', title: 'Coaches & Educators', desc: 'Course delivery hubs, subscriptions, and automated booking reminders.', to: '/industries/coaches' },
  { icon: '⚖️', title: 'Lawyers & Accountants', desc: 'Secure, encrypted file exchanges and online consultations with audit logs.', to: '/industries/lawyers-accountants' },
  { icon: '🏠', title: 'Realtors & Agencies', desc: 'Automated Property24 lead response, viewing schedules, and client CRM.', to: '/industries/realtors' },
]

const architectureSteps = [
  {
    num: '01',
    icon: '⚡',
    title: 'The Frontend Engine',
    subtitle: 'Next.js',
    desc: 'Your custom application frontend is built using Next.js — static-rendered at the edge for flawless Core Web Vitals, instantaneous search engine indexation, and premium brand presentation.',
    highlights: ['Sub-200ms page loads', 'Perfect Lighthouse scores', 'Instant SEO indexing'],
  },
  {
    num: '02',
    icon: '🔐',
    title: 'Version-Controlled Source',
    subtitle: 'GitHub',
    desc: 'Your codebase is securely compiled and versioned in a private GitHub repository. Your custom logic remains clean, modular, and serves as your own proprietary intellectual property.',
    highlights: ['Enterprise-grade security', 'Full version history', 'Your code, your IP'],
  },
  {
    num: '03',
    icon: '🚀',
    title: 'Bulletproof Edge Hosting',
    subtitle: 'Netlify',
    desc: 'We deploy your app on Netlify\'s global CDN network. This eliminates traditional hosting bottlenecks, provides serverless scaling to handle massive spikes, and leaves the site unhackable.',
    highlights: ['Global edge network', 'Zero-downtime deploys', 'Immune to traffic spikes'],
  },
  {
    num: '04',
    icon: '🎛️',
    title: 'Your Command Center',
    subtitle: 'Custom Backend',
    desc: 'Managing content, viewing form data, and tracking leads shouldn\'t require a bloated dashboard. We build clean, lightweight administrative controls tailored exactly to your workflows.',
    highlights: ['Zero bloat, zero clutter', 'Built for your workflows', 'Secure portal access'],
  },
]

const commandCenterFeatures = [
  { icon: '📊', title: 'Live Business Metrics', desc: 'Real-time dashboards showing only the KPIs that matter to your specific operation.' },
  { icon: '📝', title: 'Content Management', desc: 'Update text, images, and data without any risk of breaking your live site layout or SEO.' },
  { icon: '🔗', title: 'API Integrations', desc: 'Connected to your CRM, payment systems, and third-party tools — all in one workspace.' },
  { icon: '👥', title: 'Team Access Controls', desc: 'Role-based permissions ensuring your staff sees only what they need to operate.' },
  { icon: '📦', title: 'Asset Management', desc: 'Upload high-resolution imagery and operational files directly into your cloud storage buckets.' },
  { icon: '🔔', title: 'Automated Workflows', desc: 'Trigger notifications, emails, and process automations directly from your command center.' },
]

const features = [
  { num: '01', title: 'Complete Setup', desc: 'We handle the full setup — hosting, email, SSL, DNS, databases, and deployment. You get a ready-to-go system from day one.' },
  { num: '02', title: 'Proactive Monitoring', desc: 'Real-time server monitoring with automated alerts and response. Issues resolved before they impact your users.' },
  { num: '03', title: 'Ongoing Management', desc: 'Security updates, performance optimization, backups, and maintenance — all handled continuously by our team.' },
]

const infra = [
  { icon: '🏗️', title: 'Tier-1 Data Centres', desc: 'Enterprise-grade facilities in Johannesburg & Cape Town with redundant power, cooling, and network connectivity.' },
  { icon: '🛡️', title: 'Defense in Depth', desc: 'Multi-layer security with WAF, IDS, encryption at rest, CSF firewall, fail2ban, and automated threat response.' },
  { icon: '💾', title: 'Automated Backups', desc: 'Daily automated backups with off-site replication and one-click restore. Up to 60-day retention on enterprise plans.' },
  { icon: '📊', title: 'Real-time Monitoring', desc: '1-minute health checks, CPU/RAM/disk alerting, uptime tracking, and automated incident response.' },
]

const trustBadges = ['✓ SLA-Backed', '✓ SSL Included', '✓ DDoS Protected', '✓ Daily Backups', '✓ Active Monitoring', '✓ Full Setup Included']

const testimonials = [
  { text: "Migrating to Technical Relief was the best infrastructure decision we've made. Their managed hosting eliminated our DevOps overhead entirely — they set everything up and we haven't touched a server config since.", name: 'James M.', role: 'CTO, TechVentures SA', initials: 'JM', stars: 5 },
  { text: "The development team delivered our custom platform ahead of schedule with incredible attention to detail. Having our own dedicated backend workspace means we never worry about breaking our site — it just works.", name: 'Sarah K.', role: 'Founder, Digital Commerce Co', initials: 'SK', stars: 5 },
  { text: "We needed enterprise-level infrastructure without the enterprise complexity. Technical Relief delivered exactly that — a blazing-fast frontend and a custom admin dashboard built specifically for our team's daily workflows.", name: 'David P.', role: 'Operations Director, LogiFlow', initials: 'DP', stars: 5 },
]

const faq = [
  { q: 'What does "fully managed" actually mean?', a: 'It means we handle everything — server setup, software installation, SSL certificates, email configuration, DNS pointing, backups, security updates, performance optimization, and monitoring. You never need to SSH into a server or learn any technical tools. We do it all for you.' },
  { q: 'Do I need technical knowledge to use your services?', a: 'Absolutely not. Our entire service model is designed for business owners who want reliable technology without the complexity. You tell us what you need, and we build, deploy, and manage it. Zero technical knowledge required.' },
  { q: 'What\'s the difference between Shared Hosting and VPS?', a: 'Shared Hosting (from R3,000/mo) is ideal for standard websites, blogs, and small applications. VPS Hosting (from R12,000/mo) provides dedicated Linux server resources for high-traffic sites, custom applications, and businesses that need root access with managed support.' },
  { q: 'Can I migrate my existing website to Technical Relief?', a: 'Yes — we handle the entire migration for free. We\'ll move your files, databases, emails, and DNS records with zero downtime. We\'ve migrated hundreds of sites from cPanel, Plesk, and other hosting providers.' },
  { q: 'What happens if my server goes down?', a: 'Our 24/7 monitoring detects issues within 60 seconds. Automated failover handles most incidents instantly. For anything requiring human intervention, our engineering team is paged immediately. Our SLA guarantees 99.9% uptime.' },
  { q: 'Do you offer refunds?', a: 'Yes — all hosting plans come with a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment in full. No questions asked.' },
]

/* ═══════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════ */

function FAQAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-[var(--color-bg-card-hover)] transition-colors"
          >
            <span className="text-white text-sm font-semibold pr-4">{item.q}</span>
            <motion.span
              animate={{ rotate: openIdx === i ? 45 : 0 }}
              className="text-[var(--color-accent)] text-xl flex-shrink-0 font-light"
            >
              +
            </motion.span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: openIdx === i ? 'auto' : 0, opacity: openIdx === i ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-4 text-[var(--color-text-muted)] text-sm leading-relaxed">{item.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function HomePage() {
  const { openBooking } = useApp()

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center bg-[var(--color-bg-dark)] overflow-hidden" id="hero">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 py-32">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 py-2 px-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full"
            >
              100% Fully Managed — We Set It All Up For You
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-gradient">The technical peace of mind</span> you have been waiting for.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-[var(--color-text-light)] leading-relaxed mb-10 max-w-2xl"
            >
              We don't just host your website — we build, deploy, manage, and scale your entire digital infrastructure.
              From custom high-performance Next.js frontends to secure backend integrations and fully managed server environments.
              <strong className="text-white"> Everything is set up, configured, and monitored by our team.</strong>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link to="/pricing" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)] transition-all no-underline text-[17px]">
                View Plans & Pricing
              </Link>
              <button onClick={openBooking} className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-white/25 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/50 transition-all no-underline text-[17px] cursor-pointer">
                Book a Consultation Call
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{s.icon}</span>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
                    <div className="text-[var(--color-text-muted)] text-sm mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PARTNER LOGOS STRIP ─── */}
      <section className="py-8 bg-[var(--color-bg-navy)] border-y border-[var(--color-border-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-semibold">Powered By</span>
            <div className="flex items-center gap-8 flex-wrap">
              {partners.map((p) => (
                <div key={p.name} className="flex items-center gap-2 opacity-50 hover:opacity-90 transition-opacity">
                  <span className="text-white text-sm font-bold">{p.name}</span>
                  <span className="text-[var(--color-text-muted)] text-[10px]">· {p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES OVERVIEW ─── */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="services">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Our Services"
              title="Everything You Need —"
              titleGradient="Set Up & Managed For You"
              description="From domain registration to custom web application development and backend workflow integrations. Every service is fully managed, meaning we handle the technical side so you can focus on scale."
              dark
            />
          </FadeIn>
          <StaggerContainer stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <Link to={s.to} className="block bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 hover:-translate-y-1 transition-all duration-300 group no-underline h-full">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">{s.desc}</p>
                  <span className="text-[var(--color-accent)] text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                    Learn More →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── INDUSTRIES WE SERVE ─── */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="industries">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Niche Focus"
              title="Operational Solutions for"
              titleGradient="Target Industries"
              description="We design custom workflows, database pipelines, and booking portals specifically tailored to remove operational bottlenecks in your industry."
              dark
            />
          </FadeIn>
          <StaggerContainer stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {industries.map((ind) => (
              <StaggerItem key={ind.title}>
                <Link to={ind.to} className="block bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-6 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 transition-all group no-underline h-full">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{ind.icon}</div>
                  <h4 className="text-white font-bold text-base mb-2 group-hover:text-[var(--color-accent-light)] transition-colors">{ind.title}</h4>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed mb-4">{ind.desc}</p>
                  <span className="text-[var(--color-accent)] text-xs font-semibold uppercase tracking-wider">
                    View Solutions →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── DECOUPLED ARCHITECTURE DEEP DIVE ─── */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="architecture">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="The Technical Stack"
              title="Enterprise Infrastructure."
              titleGradient="Handled For You."
              description="We don't use slow, fragile templates. We design custom Next.js frontends and pair them with optimized edge deployment pipelines and dedicated workspaces."
              dark
            />
          </FadeIn>

          {/* Architecture Diagram */}
          <FadeIn delay={0.1}>
            <div className="mb-20 relative">
              <div className="max-w-[700px] mx-auto">
                <div className="flex flex-col items-center gap-0">
                  {/* Frontend */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-[var(--color-bg-card)] border border-[var(--color-accent)]/30 rounded-2xl p-6 text-center relative"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Your Visitors See This</div>
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-white font-bold text-lg">High-Performance Next.js Frontend</div>
                    <div className="text-[var(--color-text-muted)] text-sm mt-1">Compiled & served via Netlify Global Edge</div>
                  </motion.div>

                  {/* Connector */}
                  <div className="w-px h-10 bg-gradient-to-b from-[var(--color-accent)]/50 to-[var(--color-accent)]/20 relative">
                    <motion.div
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"
                    />
                  </div>

                  {/* Stored on GitHub */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5 text-center flex items-center justify-center gap-4"
                  >
                    <span className="text-2xl">🔐</span>
                    <div className="text-left">
                      <div className="text-white font-semibold text-sm">Stored securely on Enterprise GitHub</div>
                      <div className="text-[var(--color-text-muted)] text-xs">Version-controlled, transparent, your IP</div>
                    </div>
                  </motion.div>

                  {/* Connector */}
                  <div className="w-px h-10 bg-gradient-to-b from-[var(--color-border-dark)] to-[var(--color-accent)]/20" />

                  {/* Portal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-navy)] border border-[var(--color-accent)]/20 rounded-2xl p-6 text-center relative"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--color-success)] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">You Control This</div>
                    <div className="text-3xl mb-2">🎛️</div>
                    <div className="text-white font-bold text-lg">Technical Relief Portal Login</div>
                    <div className="text-[var(--color-text-muted)] text-sm mt-1">Launches your Custom Command Center Backend</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Four pillars */}
          <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architectureSteps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{step.title}</div>
                      <div className="text-[var(--color-accent-light)] text-xs font-semibold uppercase tracking-wider">{step.subtitle}</div>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-5 flex-1">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.highlights.map((h) => (
                      <span key={h} className="inline-flex items-center px-3 py-1.5 bg-[var(--color-success)]/10 text-[var(--color-success)] text-xs font-semibold rounded-full border border-[var(--color-success)]/20">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── CUSTOM COMMAND CENTER ─── */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="command-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)]">Your Custom Backend</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                  A Command Center <em className="text-gradient not-italic">Built For Your Business</em>
                </h2>
                <p className="mt-6 text-lg text-[var(--color-text-light)] leading-relaxed">
                  Most admin panels are cluttered with hundreds of unused database fields, legacy plugin settings, and complex options.
                  We design your dashboard from scratch — showing you <strong className="text-white">only the metrics, content inputs, and operational controls</strong> you actually need.
                </p>
                <p className="mt-4 text-[var(--color-text-light)] leading-relaxed">
                  Because the content database is decoupled from the frontend, your staff can manage items, upload assets, and check form inputs <strong className="text-white">without any risk of breaking the live website or affecting its SEO.</strong>
                </p>
                <div className="mt-8">
                  <Link to="/get-started" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all no-underline text-sm">
                    Request Your Custom Build →
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Mockup */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[var(--color-bg-dark)] to-[var(--color-bg-navy)] rounded-3xl p-8 relative overflow-hidden border border-[var(--color-border-dark)]">
                <div className="absolute -top-[30%] -right-[30%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center px-3 py-1 bg-[var(--color-success)]/15 text-[var(--color-success)] text-xs font-bold rounded-full border border-[var(--color-success)]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] mr-1.5 animate-pulse" />
                      Live
                    </span>
                    <span className="text-[var(--color-text-muted)] text-sm">Your Command Center</span>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {commandCenterFeatures.map((f) => (
                      <div key={f.title} className="bg-white/5 rounded-xl p-4 hover:bg-white/8 transition-colors">
                        <div className="text-xl mb-2">{f.icon}</div>
                        <div className="text-white font-semibold text-xs mb-1">{f.title}</div>
                        <div className="text-[var(--color-text-muted)] text-[11px] leading-snug">{f.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-[var(--color-success)]/10 rounded-xl border border-[var(--color-success)]/20 flex items-center gap-3">
                    <span className="text-[var(--color-success)]">✓</span>
                    <span className="text-[var(--color-text-light)] text-sm">Decoupled from frontend — zero risk of breaking your live site</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── WHY FULLY MANAGED ─── */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="why-managed">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)]">The Management Standard</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                  We Set It Up. We Manage It. <em className="text-gradient not-italic">You Relax.</em>
                </h2>
                <p className="mt-6 text-lg text-[var(--color-text-light)] leading-relaxed">
                  You shouldn\'t have to spend your time dealing with server patches, SSL certificates, email records, database backups, or firewall logs. That\'s what our engineering team is here for.
                </p>
                <p className="text-[var(--color-text-light)] leading-relaxed">
                  Every plan we deploy comes with proactive server maintenance and support. We configure your DNS records, install free SSLs, create email accounts, and keep your data secure from day one.
                </p>
                <div className="mt-10 space-y-8">
                  {features.map((f, i) => (
                    <FadeIn key={f.num} delay={i * 0.15}>
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center">
                          {f.num}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg mb-1">{f.title}</h4>
                          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Dashboard Mockup */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[var(--color-bg-dark)] to-[var(--color-bg-navy)] rounded-3xl p-8 relative overflow-hidden border border-[var(--color-border-dark)]">
                <div className="absolute -top-[30%] -right-[30%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="inline-flex items-center px-3 py-1 bg-[var(--color-success)]/15 text-[var(--color-success)] text-xs font-bold rounded-full border border-[var(--color-success)]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] mr-1.5 animate-pulse" />
                      Live
                    </span>
                    <span className="text-[var(--color-text-muted)] text-sm">System Dashboard</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Uptime', value: '99.98%', color: 'text-[var(--color-success)]' },
                      { label: 'Response', value: '142ms', color: 'text-[var(--color-accent-light)]' },
                      { label: 'Threats Blocked', value: '12.4K', color: 'text-[var(--color-warning)]' },
                      { label: 'Backups', value: 'Daily', color: 'text-[var(--color-success)]' },
                    ].map((m) => (
                      <div key={m.label} className="bg-white/5 rounded-xl p-5 hover:bg-white/8 transition-colors">
                        <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-[0.1em]">{m.label}</div>
                        <div className={`text-2xl font-extrabold mt-1 ${m.color}`}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-[var(--color-success)]/10 rounded-xl border border-[var(--color-success)]/20 flex items-center gap-3">
                    <span className="text-[var(--color-success)]">✓</span>
                    <span className="text-[var(--color-text-light)] text-sm">All systems operational — Last checked 2 min ago</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── INFRASTRUCTURE TRUST ─── */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="infrastructure">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Our Infrastructure"
              title="Enterprise Infrastructure,"
              titleGradient="Thoughtfully Managed"
              description="We layer our own management, monitoring, and engineering stack over tier-1 hardware providers. You get business-class security and speeds without the hosting headache."
              dark
            />
          </FadeIn>
          <StaggerContainer stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infra.map((item) => (
              <StaggerItem key={item.title}>
                <div className="text-center p-8 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <div className="inline-flex flex-wrap gap-3 justify-center">
                {trustBadges.map((b) => (
                  <span key={b} className="inline-flex items-center px-4 py-2 bg-[var(--color-success)]/10 text-[var(--color-success)] text-xs font-bold rounded-full border border-[var(--color-success)]/20">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="testimonials">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Client Testimonials"
              title="Trusted by Teams That"
              titleGradient="Demand Reliability"
              dark
            />
          </FadeIn>
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.initials}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/20 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-[var(--color-text-light)] text-sm leading-relaxed mb-6 flex-1 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-[var(--color-text-muted)] text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="faq">
        <div className="max-w-[800px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)]">FAQ</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FAQAccordion items={faq} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-[var(--color-text-muted)] text-sm mt-8">
              Still have questions?{' '}
              <Link to="/knowledge-base" className="text-[var(--color-accent-light)] hover:text-white transition-colors">
                Visit our Knowledge Base
              </Link>{' '}
              or{' '}
              <Link to="/about" className="text-[var(--color-accent-light)] hover:text-white transition-colors">
                talk to our team
              </Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <CTABanner
              title="Ready to Get Your Technical Relief?"
              description={<>Get started with fully managed hosting, VPS, or custom Next.js integrations. We set up, run, and manage your servers and software — with no setup fees and SLA-backed support. <strong className="text-white">30-day money-back guarantee.</strong></>}
              primaryText="View Plans & Pricing"
              primaryHref="/pricing"
              secondaryText="Talk to Our Team"
              secondaryOnClick={openBooking}
            />
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
