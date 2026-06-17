'use client'

import { Link } from '@/lib/navigation'
import SectionHeader from '../components/SectionHeader'
import PricingCard from '../components/PricingCard'
import CTABanner from '../components/CTABanner'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'
import { useApp } from '@/context/AppContext'

const softwarePlans = [
  {
    tier: 'Essentials',
    price: '2,999',
    period: '/mo',
    description: 'The foundation for your business growth. Core CRM and communication tools.',
    features: [
      'Unified Customer Inbox',
      'Lead & Pipeline Management',
      'SMS & Email Marketing',
      'Mobile App Access',
      'Contact Management',
      'Basic Automation',
      'Appointment Scheduling',
      'Standard Support',
    ],
    ctaText: 'Book a Call',
  },
  {
    tier: 'Professional',
    price: '5,499',
    period: '/mo',
    featured: true,
    badge: 'Most Popular',
    description: 'Scale your operations with advanced automation and team collaboration.',
    features: [
      'Everything in Essentials',
      'Advanced Workflow Builder',
      'CRM Opportunity Tracking',
      'Membership Portals',
      'Survey & Form Builder',
      'Reputation Management',
      'Round-Robin Scheduling',
      'Priority Support',
    ],
    ctaText: 'Book a Call',
  },
  {
    tier: 'Premium',
    price: '8,999',
    period: '/mo',
    description: 'Complete business transformation suite with full white-label capabilities.',
    features: [
      'Everything in Professional',
      'Full Sales Forecasting',
      'Custom API Integrations',
      'Advanced Reporting',
      'Social Media Planner',
      'Affiliate Manager',
      'Dedicated Account Manager',
      '24/7 White-Glove Support',
    ],
    ctaText: 'Book a Call',
  },
]

const mainFeatures = [
  { 
    icon: '💬', 
    title: 'Unified Inbox', 
    desc: 'Respond to SMS, Email, WhatsApp, Facebook, and Instagram messages in one single, organized stream. Never miss a lead again.' 
  },
  { 
    icon: '🤖', 
    title: 'AI Workflows', 
    desc: 'Build and deploy automated follow-ups and business logic using our AI-assisted workflow builder. Automate until it hurts.' 
  },
  { 
    icon: '📈', 
    title: 'Marketing Pipelines', 
    desc: 'Visual Kanban boards to track opportunities from "New Lead" to "Closed Won". Monitor deal value and team performance.' 
  },
  { 
    icon: '📅', 
    title: 'Integrated Calendar', 
    desc: 'Seamless booking for appointments and events. Syncs with your existing calendars to ensure zero double-bookings.' 
  },
  { 
    icon: '🏗️', 
    title: 'Funnels & Portals', 
    desc: 'Create professional landing pages and secure membership portals for your clients. All fully integrated with your CRM.' 
  },
  { 
    icon: '⭐', 
    title: 'Reputation AI', 
    desc: 'Automatically request and manage customer reviews. Build trust on Google and Facebook on autopilot.' 
  },
]

const platformScreenshots = [
  { 
    image: '/images/platform/dashboard_custom.png', 
    title: 'Command Center', 
    desc: 'Monitor your R254,000+ monthly revenue and track 843+ monthly leads with high-precision analytics. 99.98% uptime guaranteed.' 
  },
  { 
    image: '/images/platform/crm_custom.png', 
    title: 'Visual Pipelines', 
    desc: 'Scale from Jane Doe to David Chen. Track R70k+ deals from Globex Inc and Innovate LLC with zero data leakage.' 
  },
  { 
    icon: '💬', 
    image: '/images/platform/inbox_custom.png', 
    title: 'Smarter Conversations', 
    desc: 'Unified chat with Alexander Croft and Maria Garcia across WhatsApp, SMS, and Email. integrated AI agents for instant replies.' 
  },
  { 
    image: '/images/platform/phone_custom.png', 
    title: 'Business Mobile', 
    desc: 'Manage Liam O\'Connor and Samantha Reed on the go. Full lead tracking dashboard with 68% win rate in your pocket.' 
  },
]

export default function SoftwarePage() {
  const { openBooking } = useApp()
  return (
    <main className="bg-[var(--color-bg-dark)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 inline-block">
              All-In-One CRM & Automation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              The <span className="text-gradient">Technical Relief</span> App
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-light)] max-w-[800px] mx-auto mb-10 leading-relaxed">
              Consolidate your entire tech stack into a single, powerful platform. From lead generation to automated fulfillment, manage your entire business on the go.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={openBooking} 
                className="px-8 py-4 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:bg-[var(--color-accent-hover)] transition-all hover:-translate-y-1 no-underline cursor-pointer"
              >
                Book a Call
              </button>
              <a 
                href="#plans" 
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all no-underline backdrop-blur-sm"
              >
                View Plans
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hero Mockup Overlap */}
      <section className="relative -mt-10 mb-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] group">
              <img 
                src="/images/platform/dashboard_custom.png" 
                alt="Technical Relief Command Center" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/40 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-24 border-t border-white/5" id="features">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Productivity Stack"
            title="Everything You Need to"
            titleGradient="Scale Your Business"
            description="Stop paying for 10 different subscriptions. Our platform integrates everything your team needs in one place."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/30 transition-all group h-full">
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform inline-block">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Platform Gallery */}
      <section className="py-24 bg-[var(--color-bg-navy)] border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Live Experience"
            title="A Truly Professional"
            titleGradient="Interface"
            description="Designed for high-performance teams. Every pixel is optimized for speed, clarity, and conversion."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {platformScreenshots.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-[var(--color-text-light)] leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Mobile Section */}
      <section className="py-24 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <FadeIn direction="left">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-4 inline-block">
                Flagship Mobile
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Control Everything <br />
                <span className="text-gradient">From The Palm</span>
              </h2>
              <p className="text-[var(--color-text-light)] text-lg mb-8 leading-relaxed">
                Take your business anywhere. Our flagship mobile app provides a unified lead tracking dashboard with detailed monthly analytics and win-rate forecasting.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Unified Inbox for Samantha Reed, Liam O\'Connor & more',
                  'Daily Lead Tracking Dashboard (18+ New Leads/day)',
                  '68% Average Win Rate across active deals',
                  'Real-time status updates for all active projects'
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <span className="text-[var(--color-accent)] text-xl font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button 
                  onClick={openBooking} 
                  className="px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all no-underline cursor-pointer"
                >
                  Book a Call
                </button>
              </div>
            </FadeIn>
          </div>
          <div className="flex-1 relative">
            <FadeIn direction="right">
              <div className="relative z-10">
                <img 
                  src="/images/platform/phone_custom.png" 
                  alt="Technical Relief Flagship Phone App" 
                  className="w-full max-w-[500px] mx-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Development Timeline Section */}
      <section className="py-24 bg-[var(--color-bg-navy)] border-y border-white/5">
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
              { phase: 'Phase 1', title: 'Foundation & Architecture', status: 'completed', desc: 'Core platform architecture, authentication, and database design.' },
              { phase: 'Phase 2', title: 'CRM Core Features', status: 'completed', desc: 'Client management, lead tracking, communication timeline, and pipeline builder.' },
              { phase: 'Phase 3', title: 'Automation Engine', status: 'completed', desc: 'n8n-powered workflow builder with visual editor and managed execution.' },
              { phase: 'Phase 4', title: 'Beta Launch', status: 'completed', desc: 'Invite-only beta for Technical Relief clients. Early access pricing available.' },
            ].map((item) => (
              <StaggerItem key={item.phase}>
                <div className={`flex gap-4 p-5 rounded-2xl border transition-all ${
                  item.status === 'completed'
                    ? 'bg-emerald-500/8 border-emerald-500/20'
                    : item.status === 'active'
                    ? 'bg-purple-500/8 border-purple-500/20'
                    : 'bg-[var(--color-bg-card)]/50 border-[var(--color-border-dark)]'
                }`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                    item.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : item.status === 'active'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-white/5 text-[var(--color-text-muted)]'
                  }`}>
                    {item.status === 'completed' ? '✓' : item.phase.split(' ')[1]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-bold text-sm">{item.title}</h4>
                      {item.status === 'completed' && (
                        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                          Completed
                        </span>
                      )}
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

      {/* Pricing Section */}
      <section className="py-24 bg-[var(--color-bg-dark)] border-t border-white/5" id="plans">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Pricing"
            title="Flexible Plans for"
            titleGradient="Digital Growth"
            description="Transparent pricing scaled for individual entrepreneurs up to enterprise-level organizations."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwarePlans.map((p, i) => (
              <PricingCard 
                key={p.tier} 
                {...p} 
                ctaOnClick={openBooking} 
              />
            ))}
          </div>
          <p className="text-center text-[var(--color-text-muted)] text-xs mt-10">
            * All prices exclude VAT. Billed monthly. Full managed setup included in all plans.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title="Start Your Digital Transformation"
            description="Talk to our team to see how Technical Relief can automate your sales, capture leads, and support your clients."
            primaryText="Talk to Our Team"
            primaryOnClick={openBooking}
            secondaryText="Learn More"
            secondaryHref="#features"
          />
        </div>
      </section>
    </main>
  )
}
