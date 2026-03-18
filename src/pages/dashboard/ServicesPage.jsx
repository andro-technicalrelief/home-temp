const mockServices = [
  {
    id: 1,
    name: 'Professional Web Hosting',
    domain: 'example.co.za',
    status: 'Active',
    plan: 'Professional',
    price: 'R899.00/mo',
    nextBilling: '2026-04-01',
    features: ['50 GB NVMe SSD', 'Unlimited Email', 'DirectAdmin', 'Daily Backups'],
  },
  {
    id: 2,
    name: 'Domain Registration',
    domain: 'example.co.za',
    status: 'Active',
    plan: '.co.za Domain',
    price: 'R99.00/yr',
    nextBilling: '2027-06-10',
    features: ['WHOIS Privacy', 'DNS Management', 'Auto-Renewal'],
  },
  {
    id: 3,
    name: 'Domain Registration',
    domain: 'mysite.com',
    status: 'Active',
    plan: '.com Domain',
    price: 'R199.00/yr',
    nextBilling: '2027-06-10',
    features: ['WHOIS Privacy', 'DNS Management', 'Auto-Renewal'],
  },
]

const statusColor = {
  Active: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
  Suspended: 'bg-[var(--color-error)]/15 text-[var(--color-error)]',
  Pending: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
}

export default function ServicesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">My Services</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">View and manage your active services, domains, and hosting plans.</p>
      </div>

      <div className="flex flex-col gap-4">
        {mockServices.map((service) => (
          <div key={service.id} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 hover:border-[var(--color-accent)]/20 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-bold text-lg">{service.name}</h3>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[service.status]}`}>
                    {service.status}
                  </span>
                </div>
                <p className="text-[var(--color-accent-light)] text-sm font-medium">{service.domain}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm font-medium rounded-xl hover:bg-[var(--color-accent)] hover:text-white transition-all cursor-pointer">
                  Upgrade
                </button>
                <button className="px-4 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-sm font-medium rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer">
                  Manage
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[var(--color-border-dark)]">
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Plan</div>
                <div className="text-white text-sm font-medium">{service.plan}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Price</div>
                <div className="text-white text-sm font-medium">{service.price}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Next Billing</div>
                <div className="text-white text-sm font-medium">{service.nextBilling}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Includes</div>
                <div className="text-[var(--color-text-light)] text-xs leading-relaxed">
                  {service.features.join(' · ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
