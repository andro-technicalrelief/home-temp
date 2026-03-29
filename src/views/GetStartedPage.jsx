'use client'

import { useState } from 'react'
import { Link } from '@/lib/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'

export default function GetStartedPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setSubmitting(true)
    setError('')

    // Simulate form submission — in production, this POSTs to n8n webhook or similar
    await new Promise((r) => setTimeout(r, 1500))

    setSubmitting(false)
    setSubmitted(true)
  }

  const inputClass =
    'w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all'

  return (
    <main className="min-h-screen bg-[var(--color-bg-dark)]">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
        <div className="max-w-[700px] mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 py-2 px-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full">
              Let's Talk
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Get <span className="text-gradient">Started</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[550px] mx-auto leading-relaxed">
              Tell us about your project, and we'll get back to you within 24 hours with a tailored solution.{' '}
              <strong className="text-white">No commitment, no pressure.</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24">
        <div className="max-w-[600px] mx-auto px-6">
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
                  <h2 className="text-2xl font-bold text-white mb-3">Email Received!</h2>
                  <p className="text-[var(--color-text-light)] text-base leading-relaxed mb-2">
                    Thank you, <span className="text-white font-semibold">{form.name}</span>. We've received your enquiry and our team will be in touch within <strong className="text-white">24 hours</strong>.
                  </p>
                  <p className="text-[var(--color-text-muted)] text-sm mb-8">
                    A confirmation has been sent to <span className="text-[var(--color-accent-light)]">{form.email}</span>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all no-underline text-sm"
                    >
                      Back to Home
                    </Link>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border-dark)] text-[var(--color-text-light)] font-semibold rounded-xl hover:text-white hover:border-white/20 transition-all no-underline text-sm"
                    >
                      View Pricing
                    </Link>
                  </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="gs_name" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Full Name *
                        </label>
                        <input id="gs_name" type="text" value={form.name} onChange={update('name')} className={inputClass} placeholder="John Doe" required />
                      </div>
                      <div>
                        <label htmlFor="gs_email" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Email Address *
                        </label>
                        <input id="gs_email" type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="john@company.co.za" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="gs_company" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Company <span className="text-[var(--color-text-muted)]">(optional)</span>
                        </label>
                        <input id="gs_company" type="text" value={form.company} onChange={update('company')} className={inputClass} placeholder="Acme Pty Ltd" />
                      </div>
                      <div>
                        <label htmlFor="gs_phone" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                          Phone <span className="text-[var(--color-text-muted)]">(optional)</span>
                        </label>
                        <input id="gs_phone" type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+27 82 000 0000" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="gs_message" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                        How can we help? *
                      </label>
                      <textarea
                        id="gs_message"
                        value={form.message}
                        onChange={update('message')}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your project, what services you're interested in, or any questions you have..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Send Enquiry'
                      )}
                    </button>

                    <p className="text-center text-[var(--color-text-muted)] text-xs">
                      We typically respond within 24 hours. Already have an account?{' '}
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
