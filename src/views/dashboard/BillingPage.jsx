'use client'

import { useState } from 'react'

const mockInvoices = [
  { id: '#1042', date: '2026-03-01', due: '2026-03-15', amount: 'R899.00', status: 'Paid', description: 'Professional Hosting — March 2026' },
  { id: '#1041', date: '2026-02-01', due: '2026-02-15', amount: 'R899.00', status: 'Paid', description: 'Professional Hosting — February 2026' },
  { id: '#1043', date: '2026-03-10', due: '2026-03-25', amount: 'R199.00', status: 'Unpaid', description: 'Domain Renewal — example.co.za' },
  { id: '#1040', date: '2026-01-01', due: '2026-01-15', amount: 'R899.00', status: 'Paid', description: 'Professional Hosting — January 2026' },
  { id: '#1039', date: '2025-12-01', due: '2025-12-15', amount: 'R899.00', status: 'Paid', description: 'Professional Hosting — December 2025' },
]

const mockOrders = [
  { id: '#ORD-301', date: '2025-09-15', items: 'Professional Web Hosting', status: 'Active', amount: 'R899.00/mo' },
  { id: '#ORD-289', date: '2025-06-10', items: 'Domain Registration — example.co.za', status: 'Active', amount: 'R99.00/yr' },
  { id: '#ORD-290', date: '2025-06-10', items: 'Domain Registration — mysite.com', status: 'Active', amount: 'R199.00/yr' },
]

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('invoices')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredInvoices = filterStatus === 'all'
    ? mockInvoices
    : mockInvoices.filter((inv) => inv.status.toLowerCase() === filterStatus)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Billing Center</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Manage your invoices, orders, and payment methods.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5">
          <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Balance Due</div>
          <div className="text-2xl font-extrabold text-[var(--color-warning)]">R199.00</div>
          <div className="text-[var(--color-text-muted)] text-xs mt-1">1 unpaid invoice</div>
        </div>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5">
          <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total This Month</div>
          <div className="text-2xl font-extrabold text-white">R1,098.00</div>
          <div className="text-[var(--color-text-muted)] text-xs mt-1">Hosting + Domain renewal</div>
        </div>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5">
          <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Payment Method</div>
          <div className="text-xl font-bold text-white">•••• 4242</div>
          <div className="text-[var(--color-text-muted)] text-xs mt-1">Visa ending 4242</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['invoices', 'orders', 'payment'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer capitalize ${
              activeTab === tab
                ? 'bg-[var(--color-accent)]/10 text-white border border-[var(--color-accent)]/20'
                : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)]'
            }`}
          >
            {tab === 'payment' ? 'Payment Methods' : tab}
          </button>
        ))}
      </div>

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div>
          <div className="flex gap-2 mb-4">
            {['all', 'paid', 'unpaid'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize ${
                  filterStatus === s ? 'bg-white/10 text-white' : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border-dark)]">
                    <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Invoice</th>
                    <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Description</th>
                    <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Date</th>
                    <th className="text-right py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Amount</th>
                    <th className="text-center py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-[var(--color-border-dark)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                      <td className="py-3.5 px-5 text-white text-sm font-medium">{inv.id}</td>
                      <td className="py-3.5 px-5 text-[var(--color-text-light)] text-sm">{inv.description}</td>
                      <td className="py-3.5 px-5 text-[var(--color-text-muted)] text-sm">{inv.date}</td>
                      <td className="py-3.5 px-5 text-white text-sm text-right font-medium">{inv.amount}</td>
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                          inv.status === 'Paid'
                            ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                            : 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Order</th>
                  <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Item</th>
                  <th className="text-left py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Date</th>
                  <th className="text-right py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Amount</th>
                  <th className="text-center py-3 px-5 text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--color-border-dark)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                    <td className="py-3.5 px-5 text-white text-sm font-medium">{order.id}</td>
                    <td className="py-3.5 px-5 text-[var(--color-text-light)] text-sm">{order.items}</td>
                    <td className="py-3.5 px-5 text-[var(--color-text-muted)] text-sm">{order.date}</td>
                    <td className="py-3.5 px-5 text-white text-sm text-right font-medium">{order.amount}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--color-success)]/15 text-[var(--color-success)]">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment' && (
        <div className="max-w-[500px]">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] text-xs font-bold">
                  VISA
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Visa ending in 4242</div>
                  <div className="text-[var(--color-text-muted)] text-xs">Expires 12/2028</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[var(--color-success)] bg-[var(--color-success)]/15 px-2 py-1 rounded-full">Default</span>
            </div>
          </div>
          <button className="w-full py-3 border-2 border-dashed border-[var(--color-border-dark)] rounded-2xl text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-accent)]/30 transition-all text-sm cursor-pointer">
            + Add Payment Method
          </button>
        </div>
      )}
    </div>
  )
}
