import { createContext, useContext, useState, useCallback } from 'react'

// ═══════════════════════════════════════════════════════
// TICKET DATABASE — All tickets across all clients
// ═══════════════════════════════════════════════════════

const INITIAL_TICKETS = [
  {
    id: 'TK-1001', clientId: 'client-001', clientName: 'Admin User', clientEmail: 'admin@technicalrelief.co.za',
    subject: 'SSL Certificate Renewal Help', status: 'Resolved', priority: 'Medium', department: 'Technical',
    created: '2026-03-08', updated: '2026-03-10',
    messages: [
      { from: 'client', name: 'Admin User', time: '2026-03-08 09:15', text: 'Hi, our SSL certificate for technicalrelief.co.za is expiring in 5 days. Can you renew it before it expires?' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-08 09:42', text: 'Hi Admin, thanks for reaching out. We\'ve initiated the Let\'s Encrypt renewal for technicalrelief.co.za. It should be active within the next 15 minutes. We\'ll confirm once it\'s done.' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-08 10:01', text: 'SSL certificate has been renewed successfully. New expiry: 2026-06-06. Auto-renewal has been enabled so this won\'t require manual intervention going forward.' },
      { from: 'client', name: 'Admin User', time: '2026-03-10 08:30', text: 'Perfect, thank you for the quick turnaround! Closing this ticket.' },
    ],
  },
  {
    id: 'TK-1002', clientId: 'client-001', clientName: 'Admin User', clientEmail: 'admin@technicalrelief.co.za',
    subject: 'DNS Propagation Question', status: 'Open', priority: 'Low', department: 'Technical',
    created: '2026-03-14', updated: '2026-03-14',
    messages: [
      { from: 'client', name: 'Admin User', time: '2026-03-14 14:20', text: 'We changed the A record for a subdomain 2 hours ago but it\'s still pointing to the old IP. How long should DNS propagation take?' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-14 14:35', text: 'DNS propagation typically takes 1-24 hours depending on the TTL value and the DNS provider caching behavior. Your current TTL is set to 3600 (1 hour), so most resolvers should pick up the change within 1-2 hours. If it\'s still not resolving after 4 hours, let us know and we\'ll investigate further.' },
    ],
  },
  {
    id: 'TK-1003', clientId: 'client-001', clientName: 'Admin User', clientEmail: 'admin@technicalrelief.co.za',
    subject: 'Email Setup for New Domain', status: 'Resolved', priority: 'Low', department: 'Technical',
    created: '2026-02-20', updated: '2026-02-25',
    messages: [
      { from: 'client', name: 'Admin User', time: '2026-02-20 11:00', text: 'We\'ve registered a new domain — newproject.co.za. Can you set up email hosting for it? We need info@, hello@, and support@ addresses.' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-02-20 11:45', text: 'On it. We\'ll create the mailboxes, configure MX records, set up SPF/DKIM/DMARC, and test delivery. I\'ll send credentials once everything is verified.' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-02-21 09:15', text: 'All three mailboxes are live:\n\n- info@newproject.co.za\n- hello@newproject.co.za\n- support@newproject.co.za\n\nMX records configured, SPF/DKIM/DMARC all passing. Login credentials have been sent to your primary email. Webmail is accessible at the usual URL.' },
      { from: 'client', name: 'Admin User', time: '2026-02-25 10:00', text: 'All working perfectly. Thanks!' },
    ],
  },
  {
    id: 'TK-2001', clientId: 'client-002', clientName: 'James Mitchell', clientEmail: 'james@example.co.za',
    subject: 'VPS Running Slow After Update', status: 'In Progress', priority: 'High', department: 'Technical',
    created: '2026-03-15', updated: '2026-03-16',
    messages: [
      { from: 'client', name: 'James Mitchell', time: '2026-03-15 16:30', text: 'Our VPS has been noticeably slower since the OS update last night. Page load times went from ~200ms to ~800ms. Can you investigate?' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-15 16:48', text: 'Hi James, we\'re looking into this now. Initial checks show CPU usage spiking to 85% intermittently. We\'re checking if the kernel update changed any scheduler settings. Will update shortly.' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-15 17:30', text: 'Found it — the OS update reset the I/O scheduler from deadline to cfq. This affects disk-heavy workloads like yours significantly. We\'re reverting the scheduler now and adding it to our post-update checklist so this doesn\'t happen again.' },
      { from: 'client', name: 'James Mitchell', time: '2026-03-16 08:15', text: 'Speeds are back to normal this morning. Thanks for the fast diagnosis. Can you confirm the fix is persistent across reboots?' },
    ],
  },
  {
    id: 'TK-2002', clientId: 'client-002', clientName: 'James Mitchell', clientEmail: 'james@example.co.za',
    subject: 'Request Additional Backup Retention', status: 'Open', priority: 'Medium', department: 'Billing',
    created: '2026-03-13', updated: '2026-03-13',
    messages: [
      { from: 'client', name: 'James Mitchell', time: '2026-03-13 10:00', text: 'We\'d like to extend our backup retention from 14 days to 30 days. What would the additional cost be?' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-13 10:22', text: 'Hi James, extending to 30-day retention on your current plan would be an additional R450/month. This includes daily full backups with off-site replication. Want us to go ahead and enable it?' },
    ],
  },
  {
    id: 'TK-3001', clientId: 'client-003', clientName: 'Sarah Khumalo', clientEmail: 'sarah@digitalcommerce.co.za',
    subject: 'Website Migration to Your Platform', status: 'In Progress', priority: 'Medium', department: 'Technical',
    created: '2026-03-12', updated: '2026-03-15',
    messages: [
      { from: 'client', name: 'Sarah Khumalo', time: '2026-03-12 09:00', text: 'Hi, we\'re ready to migrate our WordPress site from our current host to your platform. The site is digitalcommerce.co.za. Current host is Afrihost. How do we proceed?' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-12 09:30', text: 'Hi Sarah! We\'ll handle the entire migration for you. Here\'s what we need:\n\n1. cPanel/FTP login to your current host\n2. WordPress admin login\n3. Confirmation of any custom configurations or plugins\n\nWe\'ll do a full backup, migrate everything, test it on a staging URL, then switch DNS once you approve. Zero downtime.' },
      { from: 'client', name: 'Sarah Khumalo', time: '2026-03-12 10:15', text: 'Amazing, sending the credentials now via your secure form. We have WooCommerce installed with about 400 products and a custom theme.' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-15 14:00', text: 'Migration is complete on staging: staging-dc.technicalrelief.co.za\n\nAll 400 products imported, WooCommerce configured, custom theme intact, SSL installed. Please review and let us know when you\'re ready to switch DNS.' },
    ],
  },
  {
    id: 'TK-4001', clientId: 'client-004', clientName: 'David Pretorius', clientEmail: 'david@logistics.co.za',
    subject: 'Custom API Development Quote', status: 'Open', priority: 'Medium', department: 'Sales',
    created: '2026-03-14', updated: '2026-03-14',
    messages: [
      { from: 'client', name: 'David Pretorius', time: '2026-03-14 11:00', text: 'We need a custom REST API built for our logistics tracking system. It needs to integrate with our existing fleet management software and provide real-time GPS updates to our clients. Can you provide a quote?' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-14 11:45', text: 'Hi David, that sounds like a great project. To give you an accurate quote, we\'d need:\n\n1. Expected number of API endpoints\n2. Estimated requests per minute\n3. Details on the fleet management software API/docs\n4. Whether you need a client-facing dashboard as well\n\nWould you be available for a 30-minute discovery call this week?' },
    ],
  },
  {
    id: 'TK-5001', clientId: 'client-005', clientName: 'Naledi Mokoena', clientEmail: 'naledi@greenleaf.co.za',
    subject: 'New Website Setup Request', status: 'In Progress', priority: 'Medium', department: 'Technical',
    created: '2026-03-11', updated: '2026-03-14',
    messages: [
      { from: 'client', name: 'Naledi Mokoena', time: '2026-03-11 13:00', text: 'Hi! We just signed up for the Professional Hosting plan. We need a website set up for greenleaf.co.za. We have a WordPress theme we purchased and the content is ready in a Google Doc.' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-11 13:20', text: 'Welcome to Technical Relief, Naledi! We\'ll get your site up and running. Please share:\n\n1. The theme files (zip)\n2. Link to the Google Doc with content\n3. Any logo/brand assets\n4. Your preferred email addresses (e.g., info@, hello@)\n\nWe\'ll handle everything from installation to going live.' },
      { from: 'client', name: 'Naledi Mokoena', time: '2026-03-12 09:30', text: 'Shared everything via the secure upload link. Logo files are in the zip as well. We need info@greenleaf.co.za and orders@greenleaf.co.za for email.' },
      { from: 'support', name: 'Technical Relief Support', time: '2026-03-14 16:00', text: 'Great progress — your site is up on staging: staging-gl.technicalrelief.co.za\n\nTheme installed, content populated, emails configured and tested. Take a look and let us know if any changes are needed before we point the live domain.' },
    ],
  },
]

// ═══════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════

const TicketContext = createContext(null)

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(INITIAL_TICKETS)

  // Get tickets for a specific client
  const getClientTickets = useCallback(
    (clientId) => tickets.filter((t) => t.clientId === clientId),
    [tickets]
  )

  // Get all tickets (admin view)
  const getAllTickets = useCallback(() => tickets, [tickets])

  // Get a single ticket by ID
  const getTicket = useCallback(
    (ticketId) => tickets.find((t) => t.id === ticketId),
    [tickets]
  )

  // Add a new ticket (client creates)
  const addTicket = useCallback((ticket) => {
    setTickets((prev) => [ticket, ...prev])
  }, [])

  // Add a reply to a ticket (client or staff)
  const addReply = useCallback((ticketId, message) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              messages: [...t.messages, message],
              updated: new Date().toISOString().split('T')[0],
            }
          : t
      )
    )
  }, [])

  // Update ticket status (admin)
  const updateTicketStatus = useCallback((ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: newStatus, updated: new Date().toISOString().split('T')[0] }
          : t
      )
    )
  }, [])

  // Update ticket priority (admin)
  const updateTicketPriority = useCallback((ticketId, newPriority) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, priority: newPriority, updated: new Date().toISOString().split('T')[0] }
          : t
      )
    )
  }, [])

  const value = {
    tickets,
    getClientTickets,
    getAllTickets,
    getTicket,
    addTicket,
    addReply,
    updateTicketStatus,
    updateTicketPriority,
  }

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export function useTickets() {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTickets must be used within a TicketProvider')
  return ctx
}
