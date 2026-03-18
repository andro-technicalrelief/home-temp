import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SCALING_UPGRADES = [
  {
    id: 'bf-scaling',
    icon: '🔥',
    name: 'Black Friday Mode',
    description: 'Temporarily double your VPS resources for high-traffic events. Auto-reverts after 72 hours.',
    price: 'R1,500',
    period: 'once-off',
    popular: true,
    category: 'scaling',
  },
  {
    id: 'extra-bw',
    icon: '📡',
    name: 'Extra Bandwidth Pack',
    description: 'Add 2 TB extra bandwidth to your current plan for this billing cycle.',
    price: 'R650',
    period: 'once-off',
    popular: false,
    category: 'scaling',
  },
  {
    id: 'extra-storage',
    icon: '💾',
    name: 'Storage Expansion',
    description: 'Add 50 GB NVMe SSD to any VPS or shared hosting plan. Persistent upgrade.',
    price: 'R450',
    period: '/mo',
    popular: false,
    category: 'scaling',
  },
  {
    id: 'ssl-upgrade',
    icon: '🔒',
    name: 'Wildcard SSL Upgrade',
    description: 'Upgrade to a wildcard SSL certificate covering all subdomains.',
    price: 'R350',
    period: '/yr',
    popular: false,
    category: 'scaling',
  },
]

const ADDON_SERVICES = [
  {
    id: 'n8n-tasks',
    icon: '⚙️',
    name: 'n8n Workflow Tasks',
    description: 'Automate business processes. Managed n8n instance with custom workflow design.',
    price: 'R0.05',
    period: '/ task',
    category: 'addon',
    features: ['Managed n8n Instance', 'Custom Workflows', 'API Integrations', 'Webhook Triggers'],
  },
  {
    id: 'ai-tokens',
    icon: '🤖',
    name: 'AI Token Credits',
    description: 'Integrate GPT, Claude, and other AI models into workflows and applications.',
    price: 'R0.10',
    period: '/ 1K tokens',
    category: 'addon',
    features: ['GPT-4 & Claude', 'RAG Pipelines', 'Chatbot Automation', 'Usage Dashboard'],
  },
  {
    id: 'extra-domain',
    icon: '🌐',
    name: 'Additional Domain',
    description: 'Register or transfer an additional domain and link it to your hosting plan.',
    price: 'R199',
    period: '/yr',
    category: 'addon',
    features: ['WHOIS Privacy', 'DNS Management', 'Auto-Renewal', 'Email Forwarding'],
  },
  {
    id: 'email-pack',
    icon: '📧',
    name: 'Extra Email Pack',
    description: 'Add 25 additional professional email accounts to your hosting plan.',
    price: 'R250',
    period: '/mo',
    category: 'addon',
    features: ['25 Mailboxes', 'IMAP & POP3', 'Spam Filtering', 'Webmail Access'],
  },
  {
    id: 'cdn',
    icon: '⚡',
    name: 'CDN Acceleration',
    description: 'Global CDN with edge caching for faster page loads worldwide.',
    price: 'R399',
    period: '/mo',
    category: 'addon',
    features: ['Global Edge Network', 'Auto Caching', 'DDoS Protection', 'Real-time Analytics'],
  },
  {
    id: 'monitoring',
    icon: '📊',
    name: 'Advanced Monitoring',
    description: 'Custom uptime monitoring, alerting, and performance analytics.',
    price: 'R299',
    period: '/mo',
    category: 'addon',
    features: ['1-Minute Checks', 'Slack/Email Alerts', 'Performance Graphs', 'Status Page'],
  },
]

export default function MarketplacePage() {
  const [addedItems, setAddedItems] = useState([])

  const handleAdd = (id) => {
    setAddedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Marketplace</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">One-click upgrades, scaling, and add-ons for your infrastructure.</p>
        </div>
        {addedItems.length > 0 && (
          <Link
            to="/dashboard/subscriptions"
            className="px-5 py-2.5 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all no-underline flex items-center gap-2"
          >
            Checkout ({addedItems.length}) →
          </Link>
        )}
      </div>

      {/* Pro-rata note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
        <span className="text-blue-400 text-lg mt-0.5">ℹ️</span>
        <p className="text-[var(--color-text-light)] text-sm">
          <strong className="text-white">Pro-rata billing:</strong> Mid-cycle additions are charged proportionally for the remaining days. Your next full charge will include the add-on at its regular price.
        </p>
      </div>

      {/* Scaling Upgrades */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          🚀 <span>Scaling & Upgrades</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {SCALING_UPGRADES.map((item) => {
            const isAdded = addedItems.includes(item.id)
            return (
              <motion.div
                key={item.id}
                layout
                className={`relative bg-[var(--color-bg-card)] border rounded-2xl p-6 transition-all flex flex-col ${
                  isAdded ? 'border-[var(--color-accent)]/40 ring-1 ring-[var(--color-accent)]/20' : 'border-[var(--color-border-dark)] hover:border-[var(--color-accent)]/20'
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-2 right-4 bg-amber-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full">HOT</span>
                )}
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{item.name}</h3>
                <p className="text-[var(--color-text-muted)] text-xs leading-relaxed mb-4 flex-1">{item.description}</p>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-white text-xl font-extrabold">R{item.price.replace('R', '')}</span>
                  <span className="text-[var(--color-text-muted)] text-xs pb-0.5">{item.period}</span>
                </div>
                <button
                  onClick={() => handleAdd(item.id)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                  }`}
                >
                  {isAdded ? '✓ Added to Plan' : 'Add to Plan'}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Add-on Services */}
      <div>
        <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          🧩 <span>Add-on Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ADDON_SERVICES.map((item) => {
            const isAdded = addedItems.includes(item.id)
            return (
              <div
                key={item.id}
                className={`bg-[var(--color-bg-card)] border rounded-2xl p-6 flex flex-col transition-all ${
                  isAdded ? 'border-[var(--color-accent)]/40 ring-1 ring-[var(--color-accent)]/20' : 'border-[var(--color-border-dark)] hover:border-[var(--color-accent)]/20'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-right">
                    <span className="text-white text-lg font-extrabold">R{item.price.replace('R', '')}</span>
                    <span className="text-[var(--color-text-muted)] text-xs ml-1">{item.period}</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{item.name}</h3>
                <p className="text-[var(--color-text-muted)] text-xs leading-relaxed mb-4">{item.description}</p>
                <ul className="flex flex-wrap gap-2 mb-5 flex-1">
                  {item.features.map((f) => (
                    <li key={f} className="text-[10px] px-2 py-1 bg-[var(--color-bg-dark)] text-[var(--color-text-light)] rounded-md">
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAdd(item.id)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white'
                  }`}
                >
                  {isAdded ? '✓ Added' : 'Add to Plan'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
