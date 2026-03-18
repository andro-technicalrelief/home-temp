import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════
   DATA — LAYERED COSTS
   ═══════════════════════════════════════════════════════ */

const softwareLicenses = [
  {
    name: 'DirectAdmin',
    role: 'Server Control Panel',
    icon: '🖥️',
    description: 'Full server management — file manager, DNS editor, email accounts, databases, SSL, and backups. Billed directly to ensure client ownership.',
    pricing: 'Included in VPS plans',
    billingModel: 'Fixed License',
    link: 'https://directadmin.com',
  },
  {
    name: 'Blesta',
    role: 'Billing & Support Platform',
    icon: '💳',
    description: 'Automated invoicing, payment processing, support tickets, and client management. Powers the entire billing lifecycle.',
    pricing: 'Included in all plans',
    billingModel: 'Fixed License',
    link: 'https://blesta.com',
  },
]

const variableUsage = [
  {
    name: 'GPT-4 API',
    role: 'AI-Powered Assistance',
    icon: '🧠',
    description: 'Intelligent support responses, content generation, and code analysis. Billed per token on a pay-as-you-go basis.',
    pricing: 'Pay-as-you-go',
    unit: 'per 1K tokens',
    rate: 'R0.45',
  },
  {
    name: 'n8n Workflows',
    role: 'Automation Engine',
    icon: '⚡',
    description: 'Background workflow automation — scheduled backups, monitoring alerts, email routing, and webhook processing.',
    pricing: 'Pay-as-you-go',
    unit: 'per execution',
    rate: 'R0.02',
  },
]

const hostingLayers = [
  {
    provider: 'Netlify',
    role: 'Static Frontends',
    icon: '🌐',
    description: 'Global CDN for marketing sites, landing pages, and static assets. Provides sub-100ms load times worldwide.',
    benefits: ['Global edge network', '99.99% uptime', 'Automatic SSL', 'Instant rollbacks'],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    provider: 'Render',
    role: 'Python Apps & Web Services',
    icon: '⚙️',
    description: 'Managed compute for API servers, background workers, cron jobs, and web services. Auto-scaling with zero-downtime deploys.',
    benefits: ['Auto-scaling', 'Zero-downtime deploys', 'Background workers', 'Managed databases'],
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    provider: 'Dedicated VPS',
    role: 'Databases & Private Infrastructure',
    icon: '🔒',
    description: 'Dedicated Linux servers for databases, heavy computation, private APIs, and sensitive workloads. Full root access with managed security.',
    benefits: ['Dedicated resources', 'Root access', 'NVMe storage', 'Private networking'],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
]

const independentCosts = [
  { label: 'Raw Compute', desc: 'CPU & RAM allocated to your services', note: 'Billed at cost — no markup' },
  { label: 'Bandwidth', desc: 'Data transfer across all providers', note: 'Billed at cost — no markup' },
  { label: 'Storage', desc: 'NVMe disk and backup storage', note: 'Billed at cost — no markup' },
  { label: 'Domain Renewals', desc: 'Registry fees for TLD renewals', note: 'Direct registry pricing' },
]

/* ═══════════════════════════════════════════════════════
   SETUP GUIDE MODAL
   ═══════════════════════════════════════════════════════ */

const setupSteps = [
  {
    step: 1,
    title: 'Link Your Payment Method',
    icon: '💳',
    description: 'Add a credit or debit card via PayFast tokenization. Your card details are stored securely by PayFast — we never see or store raw card data.',
    action: 'Go to Wallet',
    to: '/dashboard/wallet',
  },
  {
    step: 2,
    title: 'Enable Auto-Pay',
    icon: '🔄',
    description: 'Activate automatic billing for your subscriptions. This enables pro-rata charging when you add or upgrade services mid-cycle.',
    action: 'Manage Subscriptions',
    to: '/dashboard/subscriptions',
  },
  {
    step: 3,
    title: 'Access DirectAdmin',
    icon: '🖥️',
    description: 'Once your VPS is provisioned, you\'ll receive a DirectAdmin login. Use it to manage files, databases, and email accounts.',
    action: 'View Infrastructure',
    to: '/dashboard/infrastructure',
  },
  {
    step: 4,
    title: 'Configure Blesta Profile',
    icon: '📋',
    description: 'Ensure your billing profile is complete — name, address, and payment method. This is used for invoices and service provisioning.',
    action: 'Open Settings',
    to: '/dashboard/settings',
  },
]

function SetupGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[var(--color-bg-navy)] border border-[var(--color-border-dark)] rounded-2xl w-full max-w-[600px] max-h-[85vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[var(--color-bg-navy)] p-6 pb-4 border-b border-[var(--color-border-dark)] z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Setup Guide</h2>
                <p className="text-[var(--color-text-muted)] text-sm mt-1">Link your payment methods to our billing providers</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)] transition-all cursor-pointer text-lg"
              >
                ×
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="p-6 flex flex-col gap-4">
            {setupSteps.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{s.icon}</span>
                    <h4 className="text-white font-bold text-sm">{s.title}</h4>
                  </div>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed mb-2">{s.description}</p>
                  <a
                    href={s.to}
                    className="inline-flex items-center gap-1 text-[var(--color-accent-light)] text-xs font-medium hover:text-white transition-colors no-underline"
                  >
                    {s.action} →
                  </a>
                </div>
              </div>
            ))}

            {/* Security note */}
            <div className="mt-2 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl">
              <div className="flex items-start gap-2">
                <span className="text-[var(--color-success)] text-sm mt-0.5">🔒</span>
                <div>
                  <div className="text-[var(--color-success)] text-xs font-bold mb-1">Zero-Trust Security</div>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed">
                    No raw card data touches our servers. All payments are tokenized through PayFast's PCI-DSS certified infrastructure. API keys are encrypted at rest and rotated automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function BillingTransparencyPage() {
  const [showSetupGuide, setShowSetupGuide] = useState(false)

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Infrastructure & Billing Transparency</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            A complete breakdown of how your infrastructure is architected and billed. No hidden costs.
          </p>
        </div>
        <button
          onClick={() => setShowSetupGuide(true)}
          className="px-5 py-2.5 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all cursor-pointer shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
        >
          📋 Setup Guide
        </button>
      </div>

      {/* ── Software & Licensing ── */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🖥️</span>
          <h2 className="text-lg font-bold text-white">Software & Licensing</h2>
          <span className="ml-auto text-xs font-bold text-[var(--color-accent-light)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full border border-[var(--color-accent)]/20">
            Fixed Licenses
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {softwareLicenses.map((lic) => (
            <div key={lic.name} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 hover:border-[var(--color-accent)]/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lic.icon}</span>
                <div>
                  <h3 className="text-white font-bold">{lic.name}</h3>
                  <span className="text-[var(--color-text-muted)] text-xs">{lic.role}</span>
                </div>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-3">{lic.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-2.5 py-1 rounded-full">{lic.pricing}</span>
                <a href={lic.link} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-light)] text-xs hover:text-white transition-colors no-underline">
                  Learn more ↗
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[var(--color-text-muted)] text-xs mt-3 italic">
          Licenses are billed directly to your account to ensure full client ownership. You retain access to all tools and data.
        </p>
      </section>

      {/* ── Variable Usage (AI & API) ── */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🧠</span>
          <h2 className="text-lg font-bold text-white">Variable Usage — AI & API</h2>
          <span className="ml-auto text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Pay-as-you-go
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {variableUsage.map((item) => (
            <div key={item.name} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 hover:border-amber-500/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-bold">{item.name}</h3>
                  <span className="text-[var(--color-text-muted)] text-xs">{item.role}</span>
                </div>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-3">{item.description}</p>
              <div className="flex items-center gap-4">
                <div className="bg-[var(--color-bg-dark)] rounded-lg px-3 py-2">
                  <span className="text-white font-bold text-sm">{item.rate}</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-1">{item.unit}</span>
                </div>
                <span className="text-xs text-amber-400 font-medium">{item.pricing}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[var(--color-text-muted)] text-xs mt-3 italic">
          AI and automation usage is metered and appears as a separate line item on your monthly invoice. Usage is tracked in real-time.
        </p>
      </section>

      {/* ── Distributed Hosting Breakdown ── */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🏗️</span>
          <h2 className="text-lg font-bold text-white">Distributed Hosting Architecture</h2>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm mb-4">
          Your infrastructure is distributed across specialized providers. Each layer is chosen for a specific purpose — speed, reliability, or security.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {hostingLayers.map((layer) => (
            <div key={layer.provider} className={`bg-[var(--color-bg-card)] border rounded-2xl p-6 ${layer.borderColor} hover:-translate-y-1 transition-all duration-300`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${layer.bgColor} rounded-lg mb-4`}>
                <span className="text-lg">{layer.icon}</span>
                <span className={`text-sm font-bold ${layer.color}`}>{layer.provider}</span>
              </div>
              <h3 className="text-white font-bold text-base mb-1">{layer.role}</h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">{layer.description}</p>
              <ul className="flex flex-col gap-1.5">
                {layer.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[var(--color-text-light)] text-xs">
                    <span className={`${layer.color} text-[10px]`}>●</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Architecture diagram */}
        <div className="mt-4 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
          <h4 className="text-white font-bold text-sm mb-4">Request Flow</h4>
          <div className="flex items-center gap-2 flex-wrap justify-center text-sm">
            <span className="px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg font-bold border border-emerald-500/20">Client Browser</span>
            <span className="text-[var(--color-text-muted)]">→</span>
            <span className="px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg font-medium border border-emerald-500/20">Netlify CDN</span>
            <span className="text-[var(--color-text-muted)]">→</span>
            <span className="px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg font-medium border border-blue-500/20">Render API</span>
            <span className="text-[var(--color-text-muted)]">→</span>
            <span className="px-3 py-2 bg-purple-500/10 text-purple-400 rounded-lg font-medium border border-purple-500/20">VPS Database</span>
          </div>
          <p className="text-center text-[var(--color-text-muted)] text-xs mt-3">
            Static assets are served from the edge. API logic runs on managed compute. Data lives on your dedicated VPS.
          </p>
        </div>
      </section>

      {/* ── Independent Costs (At-Cost) ── */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📊</span>
          <h2 className="text-lg font-bold text-white">Independent Costs</h2>
          <span className="ml-auto text-xs font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-3 py-1 rounded-full border border-[var(--color-success)]/20">
            Zero Markup
          </span>
        </div>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Resource</th>
                  <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Description</th>
                  <th className="text-right py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Billing</th>
                </tr>
              </thead>
              <tbody>
                {independentCosts.map((cost) => (
                  <tr key={cost.label} className="border-b border-[var(--color-border-dark)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                    <td className="py-3.5 px-5 text-white text-sm font-medium">{cost.label}</td>
                    <td className="py-3.5 px-5 text-[var(--color-text-muted)] text-sm">{cost.desc}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="text-xs font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-2.5 py-1 rounded-full">{cost.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 p-4 bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/15 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-[var(--color-accent)] mt-0.5">ℹ️</span>
            <p className="text-[var(--color-text-light)] text-xs leading-relaxed">
              <strong className="text-white">Our transparency promise:</strong> Raw compute, bandwidth, and storage are billed at exact provider cost with zero markup. You can verify any line item against the provider's public pricing. Our revenue comes from management and engineering — not infrastructure arbitrage.
            </p>
          </div>
        </div>
      </section>

      {/* Setup Guide Modal */}
      <SetupGuideModal isOpen={showSetupGuide} onClose={() => setShowSetupGuide(false)} />
    </div>
  )
}
