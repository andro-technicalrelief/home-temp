'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════
// TOUR STEPS — all fullscreen for maximum reliability
// No spotlight positioning issues, works on all screens
// ═══════════════════════════════════════════════════════

const TOUR_STEPS = [
  {
    title: 'Welcome to Technical Relief! 🎉',
    description: 'This is your personal command center for managing hosting, servers, billing and support. Let us give you a quick tour — it only takes a minute.',
    icon: '🚀',
  },
  {
    title: 'Your Sidebar Navigation',
    description: 'On the left you\'ll find collapsible sections: Hosting & Infrastructure for managing your servers and domains, Billing & Payments for invoices and wallet, and quick access to Support and Settings.',
    icon: '📊',
  },
  {
    title: 'Billing & Payments',
    description: 'View all invoices, manage your wallet and payment cards, track subscriptions, and see detailed cost breakdowns. Everything is organised under the Billing section in the sidebar.',
    icon: '💳',
  },
  {
    title: 'Dashboard Overview',
    description: 'Your dashboard shows active services, unpaid invoices, open tickets, and active projects at a glance. Everything is zeroed out for now — they\'ll populate as you add services.',
    icon: '📈',
  },
  {
    title: 'VPS & Hosting',
    description: 'We offer shared hosting, VPS servers, and dedicated solutions. Configure your infrastructure from the Hosting & Infrastructure section. Each service is monitored 24/7.',
    icon: '🖥️',
  },
  {
    title: 'How Billing Works',
    description: 'Services are billed monthly via our Blesta billing system. Payments are processed securely through PayFast — South Africa\'s trusted payment gateway. You\'ll link a card in your Wallet when you add your first service.',
    icon: '🏦',
  },
  {
    title: 'Server Access',
    description: 'Quick links in the sidebar let you jump straight to your DirectAdmin control panel and Webmail. These connect directly to your hosting server for full control.',
    icon: '🔗',
  },
  {
    title: 'You\'re All Set! 🎯',
    description: 'Your account is ready. Browse the Marketplace to explore hosting packages, VPS plans, and add-on services. When you subscribe, everything will be provisioned automatically.',
    icon: '✨',
    cta: true,
  },
]

export default function OnboardingTour({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = TOUR_STEPS[currentStep]
  const isLastStep = currentStep === TOUR_STEPS.length - 1
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100

  // Block background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'auto' }}>
      {/* ── Dark blurred backdrop ── */}
      <div
        className="fixed inset-0"
        style={{ backgroundColor: 'rgba(0, 5, 20, 0.92)', backdropFilter: 'blur(12px)' }}
      />

      {/* ── Progress bar ── */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[10002]">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* ── Step counter ── */}
      <div className="fixed top-5 right-6 z-[10002]">
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/60 text-xs font-medium">
          {currentStep + 1} / {TOUR_STEPS.length}
        </span>
      </div>

      {/* ── Centered popup ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 flex items-center justify-center p-6 z-[10001]"
        >
          <div className="bg-[#0a1628] border border-blue-500/20 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(59,130,246,0.08)] max-w-md w-full p-10 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35, ease: 'easeOut' }}
              className="mb-6"
            >
              <span className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-4xl">
                {step.icon}
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl font-extrabold text-white mb-3">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-[#8899b4] text-sm leading-relaxed mb-8">
              {step.description}
            </p>

            {/* Next button */}
            <button
              onClick={handleNext}
              className={`w-full py-3.5 font-semibold text-sm rounded-xl transition-all cursor-pointer border-0 ${
                step.cta
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5'
                  : 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/20'
              }`}
            >
              {isLastStep ? '🚀 Start Exploring' : `Next →`}
            </button>

            {/* Step dots */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? 'w-6 h-1.5 bg-blue-500'
                      : i < currentStep
                        ? 'w-1.5 h-1.5 bg-blue-500/40'
                        : 'w-1.5 h-1.5 bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
