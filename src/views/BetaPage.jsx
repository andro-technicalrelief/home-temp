'use client'

import { useState } from 'react'
import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'

const products = [
  {
    icon: '📊',
    title: 'Agency CRM',
    tagline: 'Client management, built for agencies.',
    description: 'A modern CRM designed specifically for digital agencies and service businesses. Manage leads, client communication, projects, invoicing, and support — all in one platform integrated with your Technical Relief infrastructure.',
    features: [
      'Client & Lead Management',
      'Project Tracking & Milestones',
      'Integrated Invoicing',
      'Communication Timeline',
      'Team Collaboration',
      'Custom Pipelines',
      'Client Portal Access',
      'Reporting & Analytics',
    ],
    color: 'var(--color-accent)',
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    icon: '⚡',
    title: 'Automation Platform',
    tagline: 'Workflow automation, zero code.',
    description: 'Powerful workflow automation powered by n8n. Connect your tools, automate repetitive tasks, and build custom integrations — all managed by our team. From lead capture to invoice generation, we automate the work that slows you down.',
    features: [
      'Visual Workflow Builder',
      'API & Webhook Integrations',
      'Scheduled Automations',
      'Email & SMS Triggers',
      'Data Transformation',
      'Error Monitoring & Alerts',
      'Custom Connectors',
      'Managed Infrastructure',
    ],
    color: 'var(--color-secondary)',
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
]

export default function BetaPage() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleWaitlist = async (e) => {
    e.preventDefault()
    if (!email) return
    // Simulate — in production POST to n8n
    await new Promise((r) => setTimeout(r, 800))
    setJoined(true)
  }

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)] pointer-events-none" />

        <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-6 py-2 px-5 bg-purple-500/15 border border-purple-500/25 rounded-full text-purple-400"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Beta Program
            </motion.span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Software <span className="text-gradient">Coming Soon</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[650px] mx-auto leading-relaxed">
              We're building purpose-built software for agencies and service businesses — a{' '}
              <strong className="text-white">CRM</strong> and an{' '}
              <strong className="text-white">Automation Platform</strong> that integrate directly with your Technical Relief infrastructure.
            </p>
          </FadeIn>

          {/* Waitlist */}
          <FadeIn delay={0.35}>
            <div className="mt-10 max-w-[480px] mx-auto">
              {joined ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-2xl"
                >
                  <div className="flex items-center justify-center gap-2 text-[var(--color-success)] font-semibold">
                    <span className="text-lg">✓</span>
                    You're on the list! We'll notify you when beta access opens.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="flex-1 px-5 py-3.5 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-purple-600 text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:bg-purple-700 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Join Waitlist
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="What We're Building"
              title="Two Products,"
              titleGradient="One Mission"
              description="Purpose-built tools that work seamlessly with your managed infrastructure. Designed for agencies, built by engineers."
              dark
            />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, idx) => (
              <FadeIn key={product.title} delay={idx * 0.15}>
                <div className={`bg-gradient-to-br ${product.gradient} border border-[var(--color-border-dark)] rounded-2xl p-8 md:p-10 h-full flex flex-col hover:border-purple-500/20 transition-all duration-300`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{product.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/20">
                          Coming Soon
                        </span>
                      </div>
                      <p className="text-[var(--color-text-muted)] text-sm mt-0.5">{product.tagline}</p>
                    </div>
                  </div>

                  <p className="text-[var(--color-text-light)] text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 flex-1">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-[var(--color-text-light)]">
                        <span className="text-purple-400 mt-0.5 flex-shrink-0">✦</span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[700px] mx-auto px-6">
          <FadeIn>
            <SectionHeader
              label="Development Timeline"
              title="Our"
              titleGradient="Roadmap"
              description="We're building in public. Here's where we are and what's coming next."
              dark
            />
          </FadeIn>
          <StaggerContainer stagger={0.1} className="flex flex-col gap-4">
            {[
              { phase: 'Phase 1', title: 'Foundation & Architecture', status: 'active', desc: 'Core platform architecture, authentication, and database design.' },
              { phase: 'Phase 2', title: 'CRM Core Features', status: 'upcoming', desc: 'Client management, lead tracking, communication timeline, and pipeline builder.' },
              { phase: 'Phase 3', title: 'Automation Engine', status: 'upcoming', desc: 'n8n-powered workflow builder with visual editor and managed execution.' },
              { phase: 'Phase 4', title: 'Beta Launch', status: 'upcoming', desc: 'Invite-only beta for Technical Relief clients. Early access pricing available.' },
            ].map((item) => (
              <StaggerItem key={item.phase}>
                <div className={`flex gap-4 p-5 rounded-2xl border transition-all ${
                  item.status === 'active'
                    ? 'bg-purple-500/8 border-purple-500/20'
                    : 'bg-[var(--color-bg-card)]/50 border-[var(--color-border-dark)]'
                }`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                    item.status === 'active'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-white/5 text-[var(--color-text-muted)]'
                  }`}>
                    {item.phase.split(' ')[1]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-bold text-sm">{item.title}</h4>
                      {item.status === 'active' && (
                        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--color-text-muted)] text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Be First in Line?
            </h2>
            <p className="text-[var(--color-text-light)] text-lg mb-8 max-w-[500px] mx-auto">
              Beta users get early access, priority support, and special pricing. Join the waitlist or talk to our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:bg-purple-700 hover:-translate-y-0.5 transition-all no-underline text-[17px]">
                Join the Waitlist
              </a>
              <Link to="/get-started" className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-white/25 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/50 transition-all no-underline text-[17px]">
                Talk to Our Team
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
