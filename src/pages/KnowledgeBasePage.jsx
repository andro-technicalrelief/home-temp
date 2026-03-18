import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const categories = [
  { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
  { id: 'hosting', label: 'Hosting & Servers', icon: '🖥️' },
  { id: 'domains', label: 'Domains & DNS', icon: '🌐' },
  { id: 'billing', label: 'Billing & Payments', icon: '💳' },
  { id: 'email', label: 'Email Setup', icon: '📧' },
  { id: 'security', label: 'Security & SSL', icon: '🛡️' },
]

const articles = [
  // Getting Started
  { id: 1, cat: 'getting-started', q: 'How do I get started with Technical Relief?', a: 'Simply choose a hosting or VPS plan that suits your needs, complete registration, and our team will set everything up for you — hosting, email, DNS, SSL, and backups. You never need to touch a server.' },
  { id: 2, cat: 'getting-started', q: 'What does "fully managed" mean?', a: 'Fully managed means our engineering team handles all server configuration, security, updates, backups, monitoring, and troubleshooting. You focus on your business — we handle the infrastructure.' },
  { id: 3, cat: 'getting-started', q: 'How do I access my hosting control panel?', a: 'You\'ll receive DirectAdmin login credentials after your hosting is set up. Access it via your server URL :2222 (e.g. server.yourdomain.co.za:2222). You can also access it from your dashboard under Quick Links.' },
  { id: 4, cat: 'getting-started', q: 'Do I need technical knowledge to use your services?', a: 'No. That\'s the point of Technical Relief. We handle all the technical work — you just provide your content, and we set everything up.' },

  // Hosting
  { id: 5, cat: 'hosting', q: 'What control panel do you use?', a: 'We use DirectAdmin — a powerful, user-friendly control panel for managing websites, email, databases, file manager, DNS zones, and more. All DirectAdmin licenses are included in our pricing at no extra cost.' },
  { id: 6, cat: 'hosting', q: 'What is the difference between shared hosting and VPS?', a: 'Shared hosting shares server resources with other clients (cost-effective for smaller sites). VPS provides dedicated CPU, RAM, and storage for your applications only — ideal for higher-traffic sites, APIs, and custom apps.' },
  { id: 7, cat: 'hosting', q: 'Can I upgrade my plan later?', a: 'Yes, you can upgrade at any time from your client dashboard. We handle the migration at no extra cost. Downgrades are also supported.' },
  { id: 8, cat: 'hosting', q: 'Where are your servers located?', a: 'All servers are hosted in Tier-1 South African data centres for low-latency performance across the region. We use HostAfrica infrastructure.' },
  { id: 9, cat: 'hosting', q: 'Do you offer staging environments?', a: 'Staging environments are available on Professional plans and above. This lets you test changes before they go live on your production site.' },

  // Domains
  { id: 10, cat: 'domains', q: 'How do I register a domain?', a: 'Use our Domain Registration page to search for available domains. Select the TLD you want, add it to your cart, and complete checkout. We handle all DNS configuration.' },
  { id: 11, cat: 'domains', q: 'Can I transfer my existing domain to Technical Relief?', a: 'Yes — go to our Domain Transfer page, enter your domain name and EPP/auth code from your current registrar, and we\'ll handle the rest. Most transfers complete within 5–7 days.' },
  { id: 12, cat: 'domains', q: 'Do you include WHOIS privacy?', a: 'Yes, free WHOIS privacy protection is included with every domain registration at no extra cost.' },
  { id: 13, cat: 'domains', q: 'How do I update my DNS records?', a: 'You can manage DNS through DirectAdmin, or simply let us know what records need updating and we\'ll handle it. Most clients never need to touch DNS — we configure it during setup.' },

  // Billing
  { id: 14, cat: 'billing', q: 'What payment methods do you accept?', a: 'We accept credit/debit cards (Visa, Mastercard), EFT/bank transfers, and PayFast. All billing is managed through our Blesta billing system.' },
  { id: 15, cat: 'billing', q: 'Are there any long-term contracts?', a: 'No. All plans are billed monthly with no long-term commitment. You can cancel at any time. Annual billing is available at a discount.' },
  { id: 16, cat: 'billing', q: 'Do your prices include VAT?', a: 'No, all listed prices exclude VAT (15%). VAT is added at checkout as per South African tax regulations.' },
  { id: 17, cat: 'billing', q: 'How do I view or pay my invoices?', a: 'Log into your client dashboard → Billing → Invoices. You can view, download, and pay invoices directly from there.' },

  // Email
  { id: 18, cat: 'email', q: 'How do I set up email with my domain?', a: 'Email is automatically configured during hosting setup. You\'ll receive your Webmail login details. We also configure IMAP/POP3/SMTP for desktop and mobile clients.' },
  { id: 19, cat: 'email', q: 'How many email accounts can I create?', a: 'This depends on your plan — from 5 accounts on Starter to unlimited on Business and Enterprise plans. See our hosting page for details.' },
  { id: 20, cat: 'email', q: 'Do you support email forwarding?', a: 'Yes, email forwarding is included free with every domain. You can forward emails from your domain to any existing inbox (e.g. Gmail, Outlook).' },

  // Security
  { id: 21, cat: 'security', q: 'Is SSL included with hosting?', a: 'Yes, free SSL certificates (Let\'s Encrypt) are automatically installed on every domain. Business and Enterprise plans include wildcard SSL certificates.' },
  { id: 22, cat: 'security', q: 'What security measures are in place?', a: 'All servers include firewall protection, malware scanning, DDoS mitigation, fail2ban intrusion detection, and automated security patching. We monitor 24/7.' },
  { id: 23, cat: 'security', q: 'Do you perform backups?', a: 'Yes — backup frequency depends on your plan (weekly on Starter, daily on Professional and above). We store backups offsite with configurable retention periods and offer one-click restore.' },
]

export default function KnowledgeBasePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openArticle, setOpenArticle] = useState(null)

  const filtered = articles.filter((a) => {
    const matchesCat = activeCategory === 'all' || a.cat === activeCategory
    const matchesSearch = !searchQuery || a.q.toLowerCase().includes(searchQuery.toLowerCase()) || a.a.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-bg-dark)]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[0.12em] uppercase text-[var(--color-accent-light)] mb-6 inline-block">
            Knowledge Base
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            How Can We <span className="text-gradient">Help?</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-[600px] mx-auto">
            Find answers to common questions about hosting, domains, billing, and more.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-[500px] mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-6 py-4 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl text-white text-base placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-[var(--color-bg-navy)]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[var(--color-accent)]/10 text-white border border-[var(--color-accent)]/20'
                  : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)] border border-transparent'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[var(--color-accent)]/10 text-white border border-[var(--color-accent)]/20'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)] border border-transparent'
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-[var(--color-bg-dark)]">
        <div className="max-w-[800px] mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-white font-bold text-lg mb-2">No articles found</h3>
              <p className="text-[var(--color-text-muted)] text-sm">Try a different search term or category.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((article) => (
                <div
                  key={article.id}
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/20 transition-all"
                >
                  <button
                    onClick={() => setOpenArticle(openArticle === article.id ? null : article.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-white font-medium text-sm pr-4">{article.q}</span>
                    <span className={`text-[var(--color-text-muted)] text-lg flex-shrink-0 transition-transform ${openArticle === article.id ? 'rotate-180' : ''}`}>
                      ▾
                    </span>
                  </button>
                  {openArticle === article.id && (
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-[var(--color-text-light)] text-sm leading-relaxed border-t border-[var(--color-border-dark)] pt-4">
                        {article.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-[var(--color-text-muted)] text-sm mt-10">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTABanner
            title="Still Need Help?"
            description="Our support team is here for you. Submit a ticket and we'll get back to you within 24 hours."
            primaryText="Submit a Ticket"
            primaryHref="/dashboard/support"
            secondaryText="Contact Us"
            secondaryHref="/get-started"
          />
        </div>
      </section>
    </main>
  )
}
