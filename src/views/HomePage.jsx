'use client'

import { useState } from 'react'
import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const stats = [
  { value: '<200ms', label: 'Edge Load Time', icon: '⚡' },
  { value: '100%', label: 'Edge-Deployed', icon: '🌐' },
  { value: '∞', label: 'Scalability', icon: '📈' },
  { value: '0', label: 'Server Vulnerabilities', icon: '🔒' },
]

const architectureSteps = [
  {
    num: '01',
    icon: '⚡',
    title: 'The Frontend Engine',
    subtitle: 'Next.js',
    desc: 'Your custom application frontend is built using Next.js — the framework powering the world\'s most recognizable digital platforms. By rendering your site to static, optimized code at the edge, we achieve flawless Core Web Vitals scores. Google indexes your site instantaneously, positioning your brand at the absolute top of search rankings.',
    highlights: ['Sub-200ms page loads', 'Perfect Lighthouse scores', 'Instant Google indexing'],
  },
  {
    num: '02',
    icon: '🔐',
    title: 'Version-Controlled Source',
    subtitle: 'GitHub',
    desc: 'Your entire digital system is compiled, versioned, and securely backed up inside your private GitHub repository. Your custom code is treated as clean, modular IP — ensuring your technical architecture remains organized, transparent, and scalable.',
    highlights: ['Enterprise-grade security', 'Full version history', 'Your code, your IP'],
  },
  {
    num: '03',
    icon: '🚀',
    title: 'Bulletproof Edge Hosting',
    subtitle: 'Netlify',
    desc: 'We deploy your application through Netlify\'s global CDN networks. This eliminates traditional hosting bottlenecks — offering 100% server uptime, active serverless scaling to handle millions of simultaneous visitors, and a site that is completely unhackable.',
    highlights: ['Global edge network', 'Zero-downtime deploys', 'Immune to traffic spikes'],
  },
  {
    num: '04',
    icon: '🎛️',
    title: 'Your Command Center',
    subtitle: 'Custom Backend',
    desc: 'Managing your database, uploading operational assets, and tracking leads shouldn\'t require fighting a bloated admin panel. We build a clean, custom administrative workspace tailored exactly to the features your business needs to operate.',
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

const testimonials = [
  { text: "Migrating to Technical Relief transformed our entire digital operation. Their custom frontend eliminated our speed issues overnight, and the Command Center they built lets our team manage everything without touching code.", name: 'James M.', role: 'CTO, TechVentures SA', initials: 'JM', stars: 5 },
  { text: "The development team delivered our custom platform ahead of schedule with incredible attention to detail. Having our own dedicated backend workspace means we never worry about breaking our site — it just works.", name: 'Sarah K.', role: 'Founder, Digital Commerce Co', initials: 'SK', stars: 5 },
  { text: "We needed enterprise-level infrastructure without the enterprise complexity. Technical Relief delivered exactly that — a blazing-fast frontend and a custom admin dashboard built specifically for our team's daily workflows.", name: 'David P.', role: 'Operations Director, LogiFlow', initials: 'DP', stars: 5 },
]

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
              Engineered For Technical SEO. Built For Scale.
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-gradient">Stop renting slow, fragile templates.</span>{' '}
              Deploy a custom digital asset designed to dominate.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-[var(--color-text-light)] leading-relaxed mb-4 max-w-2xl"
            >
              We build high-performance, custom Next.js web applications stored securely on GitHub,
              hosted on Netlify's ultra-fast global edge network, and paired with a{' '}
              <strong className="text-white">custom Command Center built specifically for your daily operations.</strong>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-[var(--color-text-muted)] mb-10 italic"
            >
              For established businesses with operational teams ready to scale.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link to="/get-started" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)] transition-all no-underline text-[17px]">
                Secure Your Architecture Session
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-white/25 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/50 transition-all no-underline text-[17px]">
                How We Engineer
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

      {/* ─── ARCHITECTURE DEEP DIVE ─── */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="architecture">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="The Technical Stack"
              title="Enterprise Engineering."
              titleGradient="Handled For You."
              description={<>We don't use drag-and-drop website builders. We engineer custom software systems built to last and scale. Here's exactly how your digital infrastructure is architected.</>}
              dark
            />
          </FadeIn>

          {/* Architecture Diagram */}
          <FadeIn delay={0.1}>
            <div className="mb-20 relative">
              <div className="max-w-[700px] mx-auto">
                {/* Visual flow diagram */}
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
      <section className="py-24 bg-[var(--color-bg-dark)]" id="command-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)]">Your Custom Backend</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                  A Command Center <em className="text-gradient not-italic">Built For Your Business</em>
                </h2>
                <p className="mt-6 text-lg text-[var(--color-text-light)] leading-relaxed">
                  Most content management systems are cluttered with hundreds of unused database fields, plugins, and buttons.
                  We build your dashboard from scratch — showing you{' '}
                  <strong className="text-white">only the metrics, inputs, and operational controls you need</strong>{' '}
                  to run your workflows.
                </p>
                <p className="mt-4 text-[var(--color-text-light)] leading-relaxed">
                  Because your backend is completely decoupled from the frontend, your staff can update content,
                  upload high-resolution imagery, and process data{' '}
                  <strong className="text-white">without any risk of breaking the live website layout or ruining its technical SEO.</strong>
                </p>
                <div className="mt-8">
                  <Link to="/get-started" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all no-underline text-sm">
                    Request Your Custom Build →
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Command Center Mockup */}
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

                  {/* Feature grid */}
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

      {/* ─── THE UNIFIED PORTAL ─── */}
      <section className="py-24 bg-[var(--color-bg-navy)]" id="portal">
        <div className="max-w-[900px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)]">The Gateway</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                One Secure Login. <span className="text-gradient">Your Entire Operation.</span>
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-light)] leading-relaxed max-w-[700px] mx-auto">
                Clients don't deal with complex, fragile backend hosting setups. Instead, you get secure login
                credentials to our central, high-security dashboard application.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-dark)] rounded-3xl overflow-hidden border border-[var(--color-border-dark)] relative">
              <div className="absolute -top-[20%] -left-[20%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none opacity-40" />

              {/* Login mockup header */}
              <div className="px-8 py-5 border-b border-[var(--color-border-dark)] bg-[var(--color-bg-dark)]/50 backdrop-blur-sm flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[var(--color-text-muted)] text-xs font-mono ml-2">app.technicalrelief.co.za</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 bg-[var(--color-success)]/15 text-[var(--color-success)] text-[10px] font-bold rounded">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-success)] mr-1 animate-pulse" />
                  SECURE
                </span>
              </div>

              {/* Portal content */}
              <div className="px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: '🗄️', label: 'Private Database', desc: 'Your dedicated, isolated database instance with automated backups and encryption at rest.' },
                    { icon: '☁️', label: 'Cloud Storage', desc: 'Secure cloud storage buckets for your operational assets, media, and documents.' },
                    { icon: '🎛️', label: 'Command Modules', desc: 'Your custom operational controls — content management, analytics, lead tracking, and more.' },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-6 rounded-2xl bg-white/5 border border-[var(--color-border-dark)] hover:border-[var(--color-accent)]/20 hover:bg-white/8 transition-all">
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h4 className="text-white font-bold mb-2">{item.label}</h4>
                      <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[var(--color-text-muted)] text-sm mt-8">
                  Everything is managed, monitored, and optimized from <strong className="text-white">one bulletproof workspace</strong>.
                </p>
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
              label="Client Results"
              title="Trusted by Teams That"
              titleGradient="Demand Performance"
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

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <CTABanner
              title="Ready to Deploy Your Custom Digital Asset?"
              description={<>Stop fighting bloated templates and fragile hosting. Let us architect a high-performance system built specifically for your business operations. <strong className="text-white">For established businesses ready to scale.</strong></>}
              primaryText="Secure Your Architecture Session"
              primaryHref="/get-started"
              secondaryText="Learn About Our Process"
              secondaryHref="/about"
            />
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
