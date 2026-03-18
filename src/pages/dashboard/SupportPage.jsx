import { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTickets } from '../../context/TicketContext'

// ═══════════════════════════════════════════════════════
// CLIENT SUPPORT PAGE
// Uses shared TicketContext so admin replies appear here.
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

export default function SupportPage() {
  const { user } = useAuth()
  const { getClientTickets, addTicket, addReply } = useTickets()
  const clientId = user?.id || 'client-001'

  const tickets = getClientTickets(clientId)
  const [filter, setFilter] = useState('All')
  const [activeTicket, setActiveTicket] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ subject: '', department: 'Technical', priority: 'Medium', message: '' })
  const [reply, setReply] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const filteredTickets = useMemo(() => {
    return filter === 'All' ? tickets : tickets.filter((t) => t.status === filter)
  }, [tickets, filter])

  const statusCounts = useMemo(() => ({
    All: tickets.length,
    Open: tickets.filter((t) => t.status === 'Open').length,
    'In Progress': tickets.filter((t) => t.status === 'In Progress').length,
    Resolved: tickets.filter((t) => t.status === 'Resolved').length,
  }), [tickets])

  const handleSubmitTicket = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))

    const clientName = `${user?.first_name || 'Client'} ${user?.last_name || ''}`.trim()
    const newTicket = {
      id: `TK-${Date.now().toString().slice(-4)}`,
      clientId,
      clientName,
      clientEmail: user?.email || '',
      subject: form.subject,
      status: 'Open',
      priority: form.priority,
      department: form.department,
      created: new Date().toISOString().split('T')[0],
      updated: new Date().toISOString().split('T')[0],
      messages: [
        {
          from: 'client',
          name: clientName,
          time: new Date().toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
          text: form.message,
        },
      ],
    }

    addTicket(newTicket)
    setSubmitting(false)
    setShowForm(false)
    setForm({ subject: '', department: 'Technical', priority: 'Medium', message: '' })
    setActiveTicket(newTicket)
  }

  const handleReply = async (e) => {
    e.preventDefault()
    if (!reply.trim() || !activeTicket) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 500))

    const clientName = `${user?.first_name || 'Client'} ${user?.last_name || ''}`.trim()
    addReply(activeTicket.id, {
      from: 'client',
      name: clientName,
      time: new Date().toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      text: reply,
    })

    setReply('')
    setSubmitting(false)
    // Refresh active ticket reference
    setActiveTicket((prev) => ({ ...prev }))
  }

  const inputClass = "w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
  const selectClass = `${inputClass} appearance-none cursor-pointer`

  // ─── Ticket Detail View ───
  if (activeTicket) {
    // Always read from context for latest messages
    const ticket = getClientTickets(clientId).find((t) => t.id === activeTicket.id) || activeTicket
    return (
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
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
                <span>{ticket.department}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityStyle[ticket.priority]}`}>
                  {ticket.priority}
                </span>
                <span>Opened {ticket.created}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden mb-6">
          <div className="p-5 border-b border-[var(--color-border-dark)]">
            <h3 className="text-sm font-bold text-white">Conversation</h3>
            <span className="text-[var(--color-text-muted)] text-xs">{ticket.messages.length} messages</span>
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

        {/* Reply form */}
        {ticket.status !== 'Resolved' && ticket.status !== 'Closed' ? (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5">
            <form onSubmit={handleReply} className="flex flex-col gap-3">
              <label className="text-sm font-bold text-white">Reply</label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className={`${inputClass} min-h-[100px] resize-y`}
                placeholder="Type your reply..."
                required
              />
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)] text-xs">Our team typically responds within 30 minutes during business hours.</span>
                <button
                  type="submit"
                  disabled={submitting || !reply.trim()}
                  className="px-6 py-2.5 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 text-center">
            <span className="text-emerald-400 text-sm">This ticket has been resolved. Need more help? Open a new ticket.</span>
          </div>
        )}
      </div>
    )
  }

  // ─── Ticket List View ───
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Support</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">View and manage your support tickets.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          {showForm ? 'Cancel' : '+ New Ticket'}
        </button>
      </div>

      {/* New Ticket Form */}
      {showForm && (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Submit a New Ticket</h3>
          <form onSubmit={handleSubmitTicket} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Subject</label>
              <input type="text" value={form.subject} onChange={update('subject')} className={inputClass} placeholder="Brief description of your issue" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Department</label>
                <select value={form.department} onChange={update('department')} className={selectClass}>
                  <option value="Technical">Technical Support</option>
                  <option value="Billing">Billing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Priority</label>
                <select value={form.priority} onChange={update('priority')} className={selectClass}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-light)] mb-2">Message</label>
              <textarea value={form.message} onChange={update('message')} className={`${inputClass} min-h-[120px] resize-y`} placeholder="Describe your issue in detail..." required />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="self-start px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
              filter === status
                ? 'bg-[var(--color-accent)]/15 text-white border border-[var(--color-accent)]/20'
                : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-dark)] hover:text-white hover:border-[var(--color-accent)]/20'
            }`}
          >
            {status}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              filter === status ? 'bg-[var(--color-accent)]/20' : 'bg-white/5'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Ticket list */}
      {filteredTickets.length === 0 ? (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">🎫</div>
          <h3 className="text-white font-bold mb-1">No tickets found</h3>
          <p className="text-[var(--color-text-muted)] text-sm">
            {filter === 'All' ? "You haven't opened any support tickets yet." : `No ${filter.toLowerCase()} tickets.`}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => setActiveTicket(ticket)}
              className="w-full text-left bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-bg-card-hover)] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-white font-bold text-sm group-hover:text-[var(--color-accent-light)] transition-colors">{ticket.subject}</span>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[ticket.status]}`}>
                      {ticket.status}
                    </span>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityStyle[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--color-text-muted)] text-xs">
                    <span>{ticket.id}</span>
                    <span>{ticket.department}</span>
                    <span>{ticket.messages.length} message{ticket.messages.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[var(--color-text-muted)] text-xs">{ticket.updated}</div>
                  {ticket.messages.length > 0 && ticket.messages[ticket.messages.length - 1].from === 'support' && ticket.status !== 'Resolved' && (
                    <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                      Awaiting reply
                    </span>
                  )}
                </div>
              </div>
              {/* Preview of last message */}
              <div className="mt-3 text-[var(--color-text-muted)] text-xs leading-relaxed truncate">
                <span className="text-[var(--color-text-light)] font-medium">
                  {ticket.messages[ticket.messages.length - 1].from === 'support' ? 'TR Support: ' : 'You: '}
                </span>
                {ticket.messages[ticket.messages.length - 1].text.slice(0, 120)}
                {ticket.messages[ticket.messages.length - 1].text.length > 120 ? '...' : ''}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
