'use client'

import { useApp } from '@/context/AppContext'
import { Link } from '@/lib/navigation'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import FadeIn, { StaggerContainer, StaggerItem } from '../components/FadeIn'

const industryData = {
  doctors: {
    title: 'Medical Practitioners & Doctors',
    badge: 'HIPAA & POPIA Compliant',
    icon: '🩺',
    heroDesc: 'Secure, compliant, and automated patient booking and management systems. Zero technical hassle for your practice, fully managed by our team.',
    portalTitle: 'Secure Patient & Practice Command Center',
    portalDesc: 'We build your custom clinic website integrated with a secure administrative dashboard. Manage patients, appointment requests, and communication without compromising privacy regulations.',
    features: [
      { title: 'Strict Privacy Compliance', desc: 'Fully POPIA and HIPAA compliant servers. Complete patient data encryption at rest and in transit.' },
      { title: 'Automated Patient Booking', desc: 'Patients book slots online. Automated SMS and email reminders reduce no-shows by up to 40%.' },
      { title: 'Patient Intake Forms', desc: 'Digital intake forms filled out by patients prior to check-in, automatically synced into your clinic\'s secure records.' },
      { title: 'Practice Management Portal', desc: 'A clean dashboard for your administrative staff to view incoming appointments, update availability, and manage client communications.' }
    ]
  },
  construction: {
    title: 'Property Developers & Construction',
    badge: 'Client Portals & CRM',
    icon: '🏗️',
    heroDesc: 'Custom build tracking systems and automated client onboarding portals. Keep your projects on schedule and clients informed.',
    portalTitle: 'Tender & Client Build Management Hub',
    portalDesc: 'A custom public website to showcase your portfolio, backed by an interactive client portal where clients can track build stages, view photos, and approve contracts.',
    features: [
      { title: 'Interactive Client Portals', desc: 'Provide buyers or developers with a secure portal to monitor construction updates, view blueprints, and sign change requests.' },
      { title: 'Lead & Bid Pipelines', desc: 'Track incoming development tenders and builder quotes. Visual pipelines ensure no opportunity slips through.' },
      { title: 'Document & Contract Storage', desc: 'Secure repository for compliance certificates, site plans, and surveyor reports, accessible anywhere on-site.' },
      { title: 'Site Manager Dashboard', desc: 'Mobile-optimized portal for foremen to log daily progress, submit timesheets, and upload site photos.' }
    ]
  },
  coaches: {
    title: 'Online Coaches & Educators',
    badge: 'Course Delivery & Booking',
    icon: '🧠',
    heroDesc: 'All-in-one platforms for scheduling, payment integrations, course delivery, and client communication.',
    portalTitle: 'Coaching Portal & Client Dashboard',
    portalDesc: 'Deliver courses, track progress, and communicate with clients from a custom-tailored brand workspace. Let clients purchase packages and manage their own sessions.',
    features: [
      { title: 'Seamless Class Scheduling', desc: 'Syncs with your personal calendar to prevent double-bookings. Supports group classes and 1-on-1 discovery calls.' },
      { title: 'Integrated Client Portals', desc: 'A private space for clients to view homework tasks, download resources, watch recorded sessions, and message you directly.' },
      { title: 'Automated Reminders', desc: 'Automatic email and WhatsApp notifications for upcoming coaching sessions, billing cycles, or program deadlines.' },
      { title: 'Payment & Subscription Engine', desc: 'Accept credit cards, instant EFTs, and recurring coaching subscriptions seamlessly with South African gateways.' }
    ]
  },
  'lawyers-accountants': {
    title: 'Lawyers & Accountants',
    badge: 'Secure Document Exchange',
    icon: '⚖️',
    heroDesc: 'Certified POPIA-compliant portals for secure client file exchange, automated consultations, and audit logging.',
    portalTitle: 'Professional Client File Exchange & Ledger',
    portalDesc: 'A premium public presence backed by a secure client portal for sharing confidential legal briefs, audits, and balance sheets under strict audit logging.',
    features: [
      { title: 'Secure File Sharing', desc: 'Bank-level encrypted folder systems for sharing confidential financial audits, contracts, and legal briefs with clients.' },
      { title: 'Online Consult Booking', desc: 'Let clients book legal advice sessions or tax consults. Automated retainer agreement signing upon scheduling.' },
      { title: 'Audit Logs & History', desc: 'Every download, upload, and document signature is logged with detailed IP tracking for compliance requirements.' },
      { title: 'Unified Billing Interface', desc: 'Let clients view outstanding invoices, buy consultation packages, and check trust account ledger balances.' }
    ]
  },
  realtors: {
    title: 'Property Realtors & Agencies',
    badge: 'Lead Capture & Property CRM',
    icon: '🏠',
    heroDesc: 'Automated real estate lead response systems, property catalogs, and client engagement tools.',
    portalTitle: 'Property CRM & Buyer Matching Engine',
    portalDesc: 'Market listings on a bespoke property search site. Automate response triggers on popular SA listing portals to match buyers with new houses immediately.',
    features: [
      { title: 'Instant Lead Responder', desc: 'Automated follow-ups on Property24/PrivateProperty leads. Converts interest into viewings while you sleep.' },
      { title: 'Buyer & Seller Portals', desc: 'Let sellers view home-tour traffic stats, and buyers manage saved listings and schedule viewings.' },
      { title: 'Viewing Scheduler', desc: 'Interactive scheduling calendar for viewings, synchronized across all listing agents on your team.' },
      { title: 'Automated SMS Marketing', desc: 'Send new listing alerts to active property seekers on your database, segmented by area and price range.' }
    ]
  }
}

export default function IndustryPage({ slug }) {
  const { openBooking } = useApp()
  const data = industryData[slug]

  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Industry Not Found</h1>
          <p className="text-[var(--color-text-muted)] mb-8">The requested industry landing page does not exist.</p>
          <Link to="/" className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all no-underline">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[var(--color-bg-dark)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 py-2 px-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full">
              {data.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Websites & Software <br />
              <span className="text-gradient">for {data.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-light)] max-w-[800px] mx-auto mb-10 leading-relaxed">
              {data.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={openBooking} 
                className="px-8 py-4 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:bg-[var(--color-accent-hover)] transition-all hover:-translate-y-1 no-underline cursor-pointer"
              >
                📅 Book a Consultation
              </button>
              <Link 
                to="/pricing" 
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all no-underline backdrop-blur-sm"
              >
                View Base Pricing
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Platform Concept (GHL custom wrapper explanation) */}
      <section className="py-24 bg-[var(--color-bg-navy)] border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-4 inline-block">
                Unified Portal Integration
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {data.portalTitle}
              </h2>
              <p className="text-[var(--color-text-light)] text-lg mb-6 leading-relaxed">
                {data.portalDesc}
              </p>
              <p className="text-[var(--color-text-muted)] text-sm mb-8 leading-relaxed">
                Every client gets access to our secure client area. Here, you can review leads, manage appointment pipelines, send emails, trigger notifications, and monitor form submissions. We build the frontend web application and integrate it with your private workspace, so everything updates in real-time.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '100% Custom Frontend Web Design',
                  'Secure Back-end Portal and Database',
                  'Automated Email Notifications & Form Submissions',
                  'HIPAA & POPIA Compliant Infrastructure'
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <span className="text-[var(--color-accent)] text-xl font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-[var(--color-bg-dark)] to-[var(--color-bg-navy)] rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute -top-[30%] -right-[30%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white text-sm font-bold">Practice Command Center</span>
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)]">Active Session</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Total Leads Managed</div>
                      <div className="text-3xl font-extrabold text-white mt-1">1,482</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Submissions</div>
                        <div className="text-xl font-bold text-white mt-1">29 Today</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Reminders Sent</div>
                        <div className="text-xl font-bold text-emerald-400 mt-1">100%</div>
                      </div>
                    </div>
                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex items-center gap-3">
                      <span className="text-emerald-400 text-lg">🛡️</span>
                      <span className="text-white text-xs">Certified POPIA & HIPAA Data Privacy Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Specific Industry Features Grid */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Industry Solutions"
            title="Custom Features Built for"
            titleGradient={data.title}
            description="Our platforms are tailored to eliminate your operational overhead, manage your bookings, and capture leads automatically."
            dark
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 hover:border-[var(--color-accent)]/30 transition-all group h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-lg flex items-center justify-center mb-6">
                    {i + 1}
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

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title={`Ready to Automate Your ${data.title} System?`}
            description="Schedule a free consultation call with our team. We will design your website, build your portal, and configure all automation for you."
            primaryText="Book a Consultation Call"
            primaryOnClick={openBooking}
            secondaryText="Send General Enquiry"
            secondaryHref="/get-started"
          />
        </div>
      </section>
    </main>
  )
}
