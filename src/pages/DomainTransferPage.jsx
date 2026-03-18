import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const steps = [
  { num: '01', title: 'Unlock Your Domain', desc: 'Log into your current registrar, disable the domain lock (also called "transfer lock" or "registrar lock"), and request your EPP/Auth code.', icon: '🔓' },
  { num: '02', title: 'Enter Your Auth Code', desc: 'Enter your domain name and the EPP/Auth code below. We verify domain eligibility and begin the transfer process.', icon: '🔑' },
  { num: '03', title: 'Approve the Transfer', desc: "You'll receive a confirmation email at your domain's admin contact address. Click the approval link to authorize the transfer.", icon: '✉️' },
  { num: '04', title: 'We Handle the Rest', desc: 'Once approved, the transfer completes within 5–7 days. We configure DNS, set up email, install SSL, and ensure zero downtime.', icon: '✅' },
]

const faqs = [
  { q: 'How long does a domain transfer take?', a: 'Most transfers complete within 5–7 business days. .co.za domains can transfer in as little as 24 hours.' },
  { q: 'Will my website go down during the transfer?', a: 'No. Your DNS records transfer with the domain, so your website and email continue working throughout the process.' },
  { q: 'Do I need to renew my domain before transferring?', a: 'No, but your domain must have at least 15 days before expiry. The transfer adds a year of registration to your domain.' },
  { q: 'What is an EPP/Auth code?', a: "An EPP (Extensible Provisioning Protocol) code is a unique authorization code assigned to your domain. You can get it from your current registrar's control panel or by contacting their support." },
  { q: 'Can I transfer a .co.za domain?', a: 'Yes! .co.za domains can be transferred to us. The process is slightly different — contact our team and we handle the entire process for you.' },
  { q: 'What if my transfer fails?', a: "We'll diagnose the issue and guide you through resolution. Common causes include domain lock still active, expired auth code, or domain too recently registered (60-day lockout)." },
]

export default function DomainTransferPage() {
  const [domain, setDomain] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!domain || !authCode) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 inline-block">
            Domain Transfers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Transfer Your <span className="text-gradient">Domain</span> to Us
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[700px] mx-auto">
            Move your domain to Technical Relief and let us manage everything — DNS, email, SSL, and renewals.
            Zero downtime during transfer.
          </p>
        </div>
      </section>

      {/* Transfer Steps */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="How It Works"
            title="Transfer in"
            titleGradient="4 Simple Steps"
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8 text-center relative">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="absolute top-4 right-4 text-[var(--color-accent)] text-xs font-bold">{step.num}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transfer Form */}
      <section className="py-24 bg-[var(--color-bg-dark)]" id="transfer-form">
        <div className="max-w-[600px] mx-auto px-6">
          <SectionHeader
            label="Start Your Transfer"
            title="Enter Your"
            titleGradient="Domain Details"
            dark
          />

          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-white mb-2">Transfer Initiated!</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-4">
                  We've received your transfer request for <span className="text-white font-semibold">{domain}</span>.
                  You'll receive a confirmation email within 24 hours with next steps.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setDomain(''); setAuthCode('') }}
                  className="text-[var(--color-accent)] text-sm font-medium hover:text-[var(--color-accent-hover)] cursor-pointer"
                >
                  Transfer another domain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="transfer_domain" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Domain Name</label>
                  <input
                    id="transfer_domain"
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.co.za"
                    className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="auth_code" className="block text-sm font-medium text-[var(--color-text-light)] mb-2">
                    EPP / Auth Code
                  </label>
                  <input
                    id="auth_code"
                    type="text"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="Enter your transfer authorization code"
                    className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
                    required
                  />
                  <p className="text-[var(--color-text-muted)] text-xs mt-2">
                    Get this from your current domain registrar's control panel.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Initiating Transfer...' : 'Start Transfer'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[var(--color-bg-navy)]">
        <div className="max-w-[800px] mx-auto px-6">
          <SectionHeader
            label="FAQ"
            title="Domain Transfer"
            titleGradient="Questions"
            dark
          />
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                  <span className={`text-[var(--color-text-muted)] text-lg transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title="Need Help with Your Transfer?"
            description="Our team handles the entire transfer process for you. Just provide us your domain details and we'll take care of the rest."
            primaryText="Start Transfer"
            primaryHref="#transfer-form"
            secondaryText="Contact Support"
            secondaryHref="/get-started"
          />
        </div>
      </section>
    </main>
  )
}
