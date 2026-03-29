'use client'

import { useState, useMemo } from 'react'
import { useTickets } from '../../context/TicketContext'

// ═══════════════════════════════════════════════════════
// ADMIN TICKET QUEUE
// Shows ALL tickets across ALL clients.
// Staff can reply, change status, change priority.
// ═══════════════════════════════════════════════════════

const statusStyle = {
  Open: 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]',
  'In Progress': 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
  Resolved: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
  Closed: 'bg-white/10 text-[var(--color-text-muted)]',
}

const priorityStyle = {
  Low: 'bg-white/5 text-[var(--color-text-muted)]',
  Medium: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  High: 'bg-[var(--color-error)]/10 text-[var(--color-error)]',
}

const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed']
const PRIORITIES = ['Low', 'Medium', 'High']

export default function AdminTicketsPage() {
  const { getAllTickets, addReply, updateTicketStatus, updateTicketPriority } = useTickets()
  const allTickets = getAllTickets()

  const [filter, setFilter] = useState('All')
  const [deptFilter, setDeptFilter] = useState('All')
  const [activeTicket, setActiveTicket] = useState(null)
  const [reply, setReply] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Counts
  const statusCounts = useMemo(() => ({
    All: allTickets.length,
    Open: allTickets.filter((t) => t.status === 'Open').length,
    'In Progress': allTickets.filter((t) => t.status === 'In Progress').length,
    Resolved: allTickets.filter((t) => t.status === 'Resolved').length,
    Closed: allTickets.filter((t) => t.status === 'Closed').length,
  }), [allTickets])

  const departments = useMemo(() => {
    const depts = new Set(allTickets.map((t) => t.department))
    return ['All', ...Array.from(depts)]
  }, [allTickets])

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    let result = allTickets
    if (filter !== 'All') result = result.filter((t) => t.status === filter)
    if (deptFilter !== 'All') result = result.filter((t) => t.department === deptFilter)
    return result.sort((a, b) => {
      // Sort by: Open first, then by updated desc
      const statusOrder = { Open: 0, 'In Progress': 1, Resolved: 2, Closed: 3 }
      if (statusOrder[a.status] !== statusOrder[b.status]) return statusOrder[a.status] - statusOrder[b.status]
      return b.updated.localeCompare(a.updated)
    })
  }, [allTickets, filter, deptFilter])

  // Staff reply
  const handleStaffReply = async (e) => {
    e.preventDefault()
    if (!reply.trim() || !activeTicket) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 500))

    addReply(activeTicket.id, {
      from: 'support',
      name: 'Technical Relief Support',
      time: new Date().toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      text: reply,
    })

    // Auto-set to In Progress if currently Open
    if (activeTicket.status === 'Open') {
      updateTicketStatus(activeTicket.id, 'In Progress')
    }

    setReply('')
    setSubmitting(false)
    // Refresh active ticket reference
    setActiveTicket((prev) => ({ ...prev }))
  }

  const handleStatusChange = (ticketId, newStatus) => {
    updateTicketStatus(ticketId, newStatus)
    if (activeTicket?.id === ticketId) {
      setActiveTicket((prev) => ({ ...prev, status: newStatus }))
    }
  }

  const handlePriorityChange = (ticketId, newPriority) => {
    updateTicketPriority(ticketId, newPriority)
    if (activeTicket?.id === ticketId) {
      setActiveTicket((prev) => ({ ...prev, priority: newPriority }))
    }
  }

  const inputClass = "w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
  const selectClass = `${inputClass} appearance-none cursor-pointer`

  // ─── Ticket Detail (Admin View) ───
  if (activeTicket) {
    const ticket = getAllTickets().find((t) => t.id === activeTicket.id) || activeTicket
    return (
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <button
              onClick={() => setActiveTicket(null)}
              className="mt-1 w-9 h-9 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-accent)]/30 flex items-center justify-center transition-all cursor-pointer text-sm"
            >
              &larr;
            </button>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold text-white">{ticket.subject}</h1>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[ticket.status]}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-[var(--color-text-muted)]">
                <span>{ticket.id}</span>
                <span className="text-[var(--color-accent-light)] font-medium">{ticket.clientName}</span>
                <span className="opacity-60">{ticket.clientEmail}</span>
                <span>{ticket.department}</span>
                <span>Opened {ticket.created}</span>
              </div>
            </div>
          </div>

          {/* Admin controls */}
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] mb-1">Status</label>
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                className="px-3 py-2 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-lg text-white text-xs cursor-pointer appearance-none"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] mb-1">Priority</label>
              <select
                value={ticket.priority}
                onChange={(e) => handlePriorityChange(ticket.id, e.target.value)}
                className="px-3 py-2 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-lg text-white text-xs cursor-pointer appearance-none"
              >
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Conversation */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden mb-6">
          <div className="p-5 border-b border-[var(--color-border-dark)] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Conversation</h3>
              <span className="text-[var(--color-text-muted)] text-xs">{ticket.messages.length} messages</span>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${priorityStyle[ticket.priority]}`}>
              {ticket.priority} Priority
            </span>
          </div>
          <div className="divide-y divide-[var(--color-border-dark)]">
            {ticket.messages.map((msg, i) => (
              <div key={i} className={`p-5 ${msg.from === 'support' ? 'bg-[var(--color-accent)]/[0.02]' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    msg.from === 'support'
                      ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                      : 'bg-emerald-500/15 text-emerald-400'
                  }`}>
                    {msg.from === 'support' ? 'TR' : msg.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white text-sm font-medium">{msg.name}</span>
                    {msg.from === 'support' && (
                      <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">Staff</span>
                    )}
                    {msg.from === 'client' && (
                      <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Client</span>
                    )}
                  </div>
                  <span className="text-[var(--color-text-muted)] text-[11px] flex-shrink-0">{msg.time}</span>
                </div>
                <div className="ml-11 text-[var(--color-text-light)] text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Reply form */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-accent)]/20 rounded-2xl p-5">
          <form onSubmit={handleStaffReply} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] flex items-center justify-center text-[10px] font-bold">TR</div>
              <label className="text-sm font-bold text-white">Reply as Staff</label>
            </div>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y`}
              placeholder="Type your staff reply..."
              required
            />
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-muted)] text-xs">Replying as <strong className="text-[var(--color-accent-light)]">Technical Relief Support</strong></span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleStatusChange(ticket.id, 'Resolved')}
                  className="px-4 py-2 border border-[var(--color-success)]/30 text-[var(--color-success)] text-xs font-medium rounded-xl hover:bg-[var(--color-success)]/10 transition-all cursor-pointer"
                >
                  ✓ Resolve
                </button>
                <button
                  type="submit"
                  disabled={submitting || !reply.trim()}
                  className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Send Staff Reply'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // ─── Ticket Queue View ───
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-white">Ticket Queue</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">All support tickets across all clients. Reply as staff and manage ticket status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Open', count: statusCounts.Open, color: 'text-[var(--color-accent)]', bg: 'bg-[var(--color-accent)]/10' },
          { label: 'In Progress', count: statusCounts['In Progress'], color: 'text-[var(--color-warning)]', bg: 'bg-[var(--color-warning)]/10' },
          { label: 'Resolved', count: statusCounts.Resolved, color: 'text-[var(--color-success)]', bg: 'bg-[var(--color-success)]/10' },
          { label: 'Total', count: statusCounts.All, color: 'text-white', bg: 'bg-white/5' },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-4">
            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{s.label}</div>
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.count}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                filter === status
                  ? 'bg-[var(--color-accent)]/15 text-white border border-[var(--color-accent)]/20'
                  : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-dark)] hover:text-white'
              }`}
            >
              {status}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${filter === status ? 'bg-[var(--color-accent)]/20' : 'bg-white/5'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl text-[var(--color-text-light)] text-xs cursor-pointer appearance-none"
        >
          {departments.map((d) => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
        </select>
      </div>

      {/* Ticket list */}
      {filteredTickets.length === 0 ? (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">📭</div>
          <h3 className="text-white font-bold mb-1">No tickets found</h3>
          <p className="text-[var(--color-text-muted)] text-sm">
            {filter === 'All' ? 'The queue is empty.' : `No ${filter.toLowerCase()} tickets.`}
          </p>
        </div>
      ) : (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  <th className="text-left py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Ticket</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Client</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Subject</th>
                  <th className="text-center py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Priority</th>
                  <th className="text-center py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Status</th>
                  <th className="text-center py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Dept</th>
                  <th className="text-right py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => {
                  const lastMsg = ticket.messages[ticket.messages.length - 1]
                  const awaitingStaff = lastMsg?.from === 'client' && ticket.status !== 'Resolved' && ticket.status !== 'Closed'
                  return (
                    <tr
                      key={ticket.id}
                      onClick={() => setActiveTicket(ticket)}
                      className={`border-b border-[var(--color-border-dark)] hover:bg-[var(--color-bg-card-hover)] transition-colors cursor-pointer ${
                        awaitingStaff ? 'bg-[var(--color-accent)]/[0.03]' : ''
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <span className="text-white text-xs font-mono font-medium">{ticket.id}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="text-white text-sm font-medium">{ticket.clientName}</div>
                        <div className="text-[var(--color-text-muted)] text-[11px]">{ticket.clientEmail}</div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="text-[var(--color-text-light)] text-sm max-w-[250px] truncate">{ticket.subject}</div>
                        <div className="text-[var(--color-text-muted)] text-[11px] mt-0.5 flex items-center gap-2">
                          <span>{ticket.messages.length} msg{ticket.messages.length !== 1 ? 's' : ''}</span>
                          {awaitingStaff && (
                            <span className="inline-flex px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-400">
                              Needs reply
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityStyle[ticket.priority]}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[ticket.status]}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span className="text-[var(--color-text-muted)] text-xs">{ticket.department}</span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <span className="text-[var(--color-text-muted)] text-xs">{ticket.updated}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
