'use client'

import { useLocation } from '@/lib/navigation'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'

const LEGAL_CONTENT = {
  '/terms': {
    title: 'Terms & Conditions',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content: 'By accessing and using Technical Relief services, you agree to be bound by these Terms & Conditions. These terms apply to all visitors, users, and others who access our services.'
      },
      {
        heading: '2. Services Provided',
        content: 'Technical Relief provides managed web hosting, VPS solutions, and full-stack development services. We reserve the right to modify or discontinue any service with reasonable notice.'
      },
      {
        heading: '3. User Responsibilities',
        content: 'Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.'
      },
      {
        heading: '4. Payment Terms',
        content: 'Fees for our services are billed in advance on a monthly or annual basis. Failure to pay may result in suspension of services.'
      }
    ]
  },
  '/privacy': {
    title: 'Privacy Policy',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: '1. Information Collection',
        content: 'We collect information you provide directly to us when creating an account, such as your name, email address, and billing information.'
      },
      {
        heading: '2. Use of Information',
        content: 'We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account.'
      },
      {
        heading: '3. Data Security',
        content: 'We implement industry-standard security measures to protect your personal information from unauthorized access.'
      },
      {
        heading: '4. Third-Party Services',
        content: 'Our services utilize third-party providers for billing (PayFast/Paystack) and infrastructure (Netlify/DirectAdmin). These providers have their own privacy policies.'
      }
    ]
  },
  '/sla': {
    title: 'Service Level Agreement (SLA)',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: '1. Uptime Commitment',
        content: 'Technical Relief guarantees a 99.9% monthly uptime for all managed hosting and VPS services.'
      },
      {
        heading: '2. Support Response Times',
        content: 'We aim to respond to high-priority tickets within 2 hours and standard-priority tickets within 6 hours during business hours.'
      },
      {
        heading: '3. Maintenance Windows',
        content: 'Regular maintenance is performed during off-peak hours (GMT+2). We provide at least 24 hours notice for scheduled maintenance.'
      },
      {
        heading: '4. Remedies',
        content: 'In the event of a breach of our uptime guarantee, clients may be eligible for service credits as defined in our full SLA documentation.'
      }
    ]
  },
  '/acceptable-use': {
    title: 'Acceptable Use Policy',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: '1. Prohibited Activities',
        content: 'Our services may not be used for illegal activities, including but not limited to hosting malware, sending unsolicited bulk email (SPAM), or copyright infringement.'
      },
      {
        heading: '2. Resource Usage',
        content: 'While we offer scalable resources, excessive usage that negatively impacts other clients on shared infrastructure is prohibited.'
      },
      {
        heading: '3. Security Actions',
        content: 'We reserves the right to suspend any account that poses a security risk to our network or other users.'
      },
      {
        heading: '4. Content Standards',
        content: 'Content hosted on our platform must comply with South African law and international conventions regarding prohibited content.'
      }
    ]
  }
}

export default function LegalPage() {
  const location = useLocation()
  const content = LEGAL_CONTENT[location.pathname] || LEGAL_CONTENT['/terms']

  return (
    <main className="min-h-screen bg-[var(--color-bg-dark)] pt-32 pb-24">
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)] pointer-events-none opacity-20 z-0" />
      
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold tracking-wider uppercase mb-6">
            Legal Document
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {content.title}
          </h1>
          <p className="text-[var(--color-text-muted)] mb-12">
            Last updated: {content.lastUpdated}
          </p>
        </FadeIn>

        <div className="space-y-12">
          {content.sections.map((section, idx) => (
            <FadeIn key={idx} delay={0.1 * idx}>
              <div className="bg-[var(--color-bg-navy)]/40 border border-[var(--color-border-dark)] rounded-2xl p-8 hover:bg-[var(--color-bg-card)]/50 transition-colors">
                <h2 className="text-xl font-bold text-white mb-4">{section.heading}</h2>
                <p className="text-[var(--color-text-light)] leading-relaxed">
                  {section.content}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-16 pt-8 border-t border-[var(--color-border-dark)] text-center text-sm text-[var(--color-text-muted)]">
            Questions? Contact our legal department at <a href="mailto:legal@technicalrelief.co.za" className="text-[var(--color-accent)] no-underline hover:underline">legal@technicalrelief.co.za</a>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
