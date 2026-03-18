import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'


/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const services = [
  { icon: '🖥️', title: 'Managed Hosting', desc: 'Fully managed shared hosting with automated backups, SSL, and enterprise-grade security. We set everything up — you just send us your content.', to: '/hosting' },
  { icon: '🐧', title: 'Linux VPS Hosting', desc: 'Managed Linux VPS servers optimized for Node.js, Next.js, and modern frameworks. Root access with full management included — from R5,000/mo.', to: '/vps' },
  { icon: '🌐', title: 'Domain Registration', desc: 'Register and manage your domains with DNS management, WHOIS privacy, and automated renewals. We handle all DNS configuration and pointing.', to: '/domains/register' },
  { icon: '💻', title: 'Full-Stack Development', desc: 'Custom web applications, APIs, and enterprise systems. From concept to deployment — we build it, deploy it, and maintain it for you.', to: '/pricing' },
  { icon: '🎨', title: 'Premium Web Design', desc: 'Conversion-focused UI/UX design with Figma prototyping, responsive layouts, and pixel-perfect implementation. Design that performs.', to: '/pricing' },
  { icon: '🛡️', title: 'We Handle Everything', desc: 'Every service is fully managed — server maintenance, security updates, performance optimization, email setup, SSL, DNS, monitoring. You focus on your business.', to: '/about' },
]

const stats = [
  { value: '99.9%', label: 'Guaranteed Uptime', icon: '🟢' },
  { value: '<200ms', label: 'Avg Response Time', icon: '⚡' },
  { value: '24/7', label: 'Active Monitoring', icon: '🛡️' },
  { value: '100%', label: 'Fully Managed', icon: '🤝' },
]

const features = [
  { num: '01', title: 'Complete Setup', desc: 'We handle the full setup — hosting, email, SSL, DNS, databases, and deployment. You get a ready-to-go system from day one.' },
  { num: '02', title: 'Proactive Monitoring', desc: 'Real-time server monitoring with automated alerts and response. Issues resolved before they impact your users.' },
  { num: '03', title: 'Ongoing Management', desc: 'Security updates, performance optimization, backups, and maintenance — all handled continuously by our team.' },
]

const infra = [
  { icon: '🏗️', title: 'Tier-1 Data Centres', desc: 'Enterprise-grade facilities in Johannesburg & Cape Town with redundant power, cooling, and network connectivity.' },
  { icon: '🔒', title: 'Defence in Depth', desc: 'Multi-layer security with WAF, IDS, encryption at rest, CSF firewall, fail2ban, and automated threat response.' },
  { icon: '🔄', title: 'Automated Backups', desc: 'Daily automated backups with off-site replication and one-click restore. Up to 60-day retention on enterprise plans.' },
  { icon: '📊', title: 'Real-time Monitoring', desc: '1-minute health checks, CPU/RAM/disk alerting, uptime tracking, and automated incident response with Slack/email notifications.' },
]

const testimonials = [
  { text: "Migrating to Technical Relief was the best infrastructure decision we've made. Their managed hosting eliminated our DevOps overhead entirely — they set everything up and we haven't touched a server config since.", name: 'James M.', role: 'CTO, TechVentures SA', initials: 'JM', stars: 5 },
  { text: "The development team delivered our custom platform ahead of schedule with incredible attention to detail. The ongoing hosting and management means we never worry about infrastructure — they handle absolutely everything.", name: 'Sarah K.', role: 'Founder, Digital Commerce Co', initials: 'SK', stars: 5 },
  { text: "We needed enterprise-level hosting without the enterprise price tag. Technical Relief delivered exactly that — 99.99% uptime over the past year and they set up everything from scratch for us.", name: 'David P.', role: 'Operations Director, LogiFlow', initials: 'DP', stars: 5 },
]

const trustBadges = ['✓ SLA-Backed', '✓ SSL Included', '✓ DDoS Protected', '✓ Daily Backups', '✓ Monitoring', '✓ Full Setup Included']

const partners = [
  { name: 'DirectAdmin', desc: 'Control Panel' },
  { name: 'HostAfrica', desc: 'Infrastructure' },
  { name: 'PayFast', desc: 'Payments' },
  { name: "Let's Encrypt", desc: 'SSL' },
  { name: 'CloudLinux', desc: 'OS' },
  { name: 'Imunify360', desc: 'Security' },
]

const faq = [
  { q: 'What does "fully managed" actually mean?', a: 'It means we handle everything — server setup, software installation, SSL certificates, email configuration, DNS pointing, backups, security updates, performance optimization, and monitoring. You never need to SSH into a server or learn any technical tools. We do it all for you.' },
  { q: 'Do I need technical knowledge to use your services?', a: 'Absolutely not. Our entire service model is designed for business owners who want reliable technology without the complexity. You tell us what you need, and we build, deploy, and manage it. Zero technical knowledge required.' },
  { q: 'What\'s the difference between Shared Hosting and VPS?', a: 'Shared Hosting (from R899/mo) is ideal for standard websites, blogs, and small applications. VPS Hosting (from R5,000/mo) provides dedicated Linux server resources for high-traffic sites, custom applications, and businesses that need root access with managed support.' },
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
              We don't just host your website — we engineer, manage, and scale your entire digital infrastructure. From
              high-performance hosting to custom application development.{' '}
              <strong className="text-white">Everything is set up, configured, and managed for you — zero technical knowledge required.</strong>
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
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-white/25 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/50 transition-all no-underline text-[17px]">
                How We Work
              </Link>
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
              label="Our Fully Managed Services"
              title="Everything You Need —"
              titleGradient="Set Up & Managed For You"
              description="From domain registration to custom application development — we provide the complete digital infrastructure stack. Every service is fully managed, so you never have to worry about the technical side."
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

      {/* ─── WHY FULLY MANAGED ─── */}
      <section className="py-24 bg-[var(--color-bg-light)]" id="why-managed">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent)]">Why Fully Managed?</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-text-dark)] tracking-tight leading-tight">
                  We Set It Up. We Manage It. <em>You Relax.</em>
                </h2>
                <p className="mt-6 text-lg text-[var(--color-text-body)] leading-relaxed">
                  You shouldn't have to worry about server patches, SSL renewals, backup schedules, email configuration, or
                  security monitoring. That's our job — and we do it all for you, from day one.
                </p>
                <p className="text-[var(--color-text-body)] leading-relaxed">
                  Every plan includes proactive management — we set up your hosting, configure your email, install your SSL,
                  point your domain, and monitor your infrastructure 24/7. You never have to touch a terminal or learn any
                  technical skills.
                </p>
                <div className="mt-10 space-y-8">
                  {features.map((f, i) => (
                    <FadeIn key={f.num} delay={i * 0.15}>
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center">
                          {f.num}
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--color-text-dark)] text-lg mb-1">{f.title}</h4>
                          <p className="text-[var(--color-text-body)] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Dashboard mockup */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[var(--color-bg-dark)] to-[var(--color-bg-navy)] rounded-3xl p-8 relative overflow-hidden">
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
              description="We partner with tier-1 infrastructure providers and layer our own engineering, monitoring, and management on top — so you get enterprise-grade reliability without any complexity on your end."
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
              description={<>Get started with fully managed hosting and development services. We set everything up for you — no setup fees, no hidden costs, no server management required. <strong className="text-white">30-day money-back guarantee.</strong></>}
              primaryText="View Plans & Pricing"
              primaryHref="/pricing"
              secondaryText="Talk to Our Team"
              secondaryHref="/about"
            />
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
