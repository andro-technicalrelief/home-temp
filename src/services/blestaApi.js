/**
 * Blesta API Service
 * 
 * Central client for communicating with the Blesta REST API.
 * In development, requests are proxied via Vite's dev server.
 * In production, they hit the Blesta installation directly.
 * 
 * Blesta API docs: https://docs.blesta.com/display/dev/API
 */

const API_BASE = import.meta.env.VITE_BLESTA_API_URL || '/api/blesta'

class BlestaApiError extends Error {
  constructor(message, status, response) {
    super(message)
    this.name = 'BlestaApiError'
    this.status = status
    this.response = response
  }
}

/**
 * Make a request to the Blesta API
 */
async function callBlestaApi(endpoint, { method = 'GET', params = {}, body = null } = {}) {
  const url = new URL(`${API_BASE}/${endpoint}`, window.location.origin)

  if (method === 'GET' && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })
  }

  const headers = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  const token = localStorage.getItem('blesta_token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = { method, headers }
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url.toString(), config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new BlestaApiError(
        errorData.message || `API request failed: ${response.statusText}`,
        response.status,
        errorData
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof BlestaApiError) throw error
    throw new BlestaApiError(error.message, 0, null)
  }
}

// ═══════════════════════════════════════════════════════
// PRICE FLOORS — Hard-coded minimums
// ═══════════════════════════════════════════════════════

const PRICE_FLOORS = {
  shared_hosting: 550,  // R550/mo minimum
  vps_hosting: 2500,    // R2,500/mo minimum
}

function enforceFloor(price, category) {
  const floor = PRICE_FLOORS[category]
  return floor ? Math.max(price, floor) : price
}

// ═══════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════

export async function validateLogin(email, password) {
  return callBlestaApi('users/login', {
    method: 'POST',
    body: { username: email, password },
  })
}

export async function registerClient(data) {
  return callBlestaApi('clients/create', {
    method: 'POST',
    body: data,
  })
}

export async function getClientDetails(clientId) {
  return callBlestaApi(`clients/get/${clientId}`)
}

export async function updateClient(clientId, data) {
  return callBlestaApi(`clients/edit/${clientId}`, {
    method: 'PUT',
    body: data,
  })
}

// ═══════════════════════════════════════════════════════
// SERVICES / PRODUCTS
// ═══════════════════════════════════════════════════════

export async function getClientServices(clientId, status = 'active') {
  const result = await callBlestaApi(`clients/services/${clientId}`, {
    params: { status },
  })
  // Enforce price floors
  if (result?.services) {
    result.services = result.services.map((service) => {
      if (service.package_group === 'shared_hosting') {
        service.price = enforceFloor(parseFloat(service.price), 'shared_hosting')
      } else if (service.package_group === 'vps_hosting') {
        service.price = enforceFloor(parseFloat(service.price), 'vps_hosting')
      }
      return service
    })
  }
  return result
}

export async function getPackages(groupId) {
  return callBlestaApi(`packages/getall`, { params: { group_id: groupId } })
}

// ═══════════════════════════════════════════════════════
// INVOICES & BILLING
// ═══════════════════════════════════════════════════════

export async function getInvoices(clientId, status) {
  return callBlestaApi(`invoices/getall/${clientId}`, {
    params: { status },
  })
}

export async function getInvoice(invoiceId) {
  return callBlestaApi(`invoices/get/${invoiceId}`)
}

export async function getTransactions(clientId) {
  return callBlestaApi(`transactions/getall/${clientId}`)
}

// ═══════════════════════════════════════════════════════
// DOMAINS
// ═══════════════════════════════════════════════════════

export async function domainWhoisLookup(domain) {
  return callBlestaApi(`domains/lookup`, {
    method: 'POST',
    body: { domain },
  })
}

export async function getDomainPricing() {
  return callBlestaApi('domains/pricing')
}

export async function initiateTransfer(domain, authCode) {
  return callBlestaApi('domains/transfer', {
    method: 'POST',
    body: { domain, auth_code: authCode },
  })
}

// ═══════════════════════════════════════════════════════
// SUPPORT TICKETS
// ═══════════════════════════════════════════════════════

export async function getTickets(clientId, status) {
  return callBlestaApi(`support/tickets/${clientId}`, {
    params: { status },
  })
}

export async function getTicket(ticketId) {
  return callBlestaApi(`support/tickets/get/${ticketId}`)
}

export async function openTicket(clientId, data) {
  return callBlestaApi('support/tickets/create', {
    method: 'POST',
    body: { client_id: clientId, ...data },
  })
}

export async function replyTicket(ticketId, data) {
  return callBlestaApi(`support/tickets/reply/${ticketId}`, {
    method: 'POST',
    body: data,
  })
}

// ═══════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════

export async function getOrders(clientId) {
  return callBlestaApi(`orders/getall/${clientId}`)
}

export async function createOrder(clientId, items) {
  return callBlestaApi('orders/create', {
    method: 'POST',
    body: { client_id: clientId, items },
  })
}

// ═══════════════════════════════════════════════════════
// PAYMENT METHODS (PayFast Tokens)
// ═══════════════════════════════════════════════════════

export async function getPaymentMethods(clientId) {
  return callBlestaApi(`payment_methods/getall/${clientId}`)
}

export async function addPaymentMethod(clientId, tokenData) {
  return callBlestaApi('payment_methods/create', {
    method: 'POST',
    body: { client_id: clientId, ...tokenData },
  })
}

export async function removePaymentMethod(clientId, methodId) {
  return callBlestaApi(`payment_methods/delete/${methodId}`, {
    method: 'DELETE',
    body: { client_id: clientId },
  })
}

export async function setDefaultPaymentMethod(clientId, methodId) {
  return callBlestaApi(`payment_methods/setdefault/${methodId}`, {
    method: 'PUT',
    body: { client_id: clientId },
  })
}

// ═══════════════════════════════════════════════════════
// SUBSCRIPTIONS (Auto-Pay)
// ═══════════════════════════════════════════════════════

export async function getSubscriptions(clientId) {
  return callBlestaApi(`subscriptions/getall/${clientId}`)
}

export async function createSubscription(clientId, data) {
  return callBlestaApi('subscriptions/create', {
    method: 'POST',
    body: { client_id: clientId, ...data },
  })
}

export async function cancelSubscription(subscriptionId) {
  return callBlestaApi(`subscriptions/cancel/${subscriptionId}`, {
    method: 'PUT',
  })
}

export async function updateSubscription(subscriptionId, data) {
  return callBlestaApi(`subscriptions/edit/${subscriptionId}`, {
    method: 'PUT',
    body: data,
  })
}

// ═══════════════════════════════════════════════════════
// PROVISIONING (DirectAdmin + HostAfrica trigger)
// ═══════════════════════════════════════════════════════

export async function provisionService(clientId, orderId) {
  return callBlestaApi('provisioning/provision', {
    method: 'POST',
    body: { client_id: clientId, order_id: orderId },
  })
}

export async function getProvisioningStatus(serviceId) {
  return callBlestaApi(`provisioning/status/${serviceId}`)
}

export { BlestaApiError, PRICE_FLOORS, enforceFloor }
