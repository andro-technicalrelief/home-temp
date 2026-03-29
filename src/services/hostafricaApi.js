/**
 * HostAfrica Reseller API Client
 *
 * Handles domain registration/transfer and VPS provisioning via
 * HostAfrica's WHMCS-compatible reseller API.
 * 
 * All calls route through Next.js API routes at /api/hostafrica/*
 * to keep API credentials server-side.
 *
 * Two separate APIs:
 * 1. Domain Reseller — API Email + API Key auth
 * 2. VPS Reseller — API Key + Password auth
 */

const API_BASE = '/api/hostafrica'

class HostAfricaApiError extends Error {
  constructor(message, status, response) {
    super(message)
    this.name = 'HostAfricaApiError'
    this.status = status
    this.response = response
  }
}

async function callHostAfrica(endpoint, { method = 'GET', body = null, params = {} } = {}) {
  const url = new URL(`${API_BASE}/${endpoint}`, window.location.origin)
  
  if (method === 'GET' && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) url.searchParams.append(key, val)
    })
  }

  const config = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body && method !== 'GET') config.body = JSON.stringify(body)

  try {
    const res = await fetch(url.toString(), config)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new HostAfricaApiError(err.message || `HostAfrica API failed: ${res.statusText}`, res.status, err)
    }
    return await res.json()
  } catch (error) {
    if (error instanceof HostAfricaApiError) throw error
    throw new HostAfricaApiError(error.message, 0, null)
  }
}

// ═══════════════════════════════════════════════════════
// DOMAIN OPERATIONS
// ═══════════════════════════════════════════════════════

/** Check domain availability (WHOIS lookup) */
export async function checkDomainAvailability(domain) {
  return callHostAfrica('domains/check', {
    method: 'GET',
    params: { domain },
  })
}

/** Get TLD pricing from reseller account */
export async function getDomainPricing() {
  return callHostAfrica('domains/pricing')
}

/** Register a new domain */
export async function registerDomain(domain, contactData, nameservers) {
  return callHostAfrica('domains/register', {
    method: 'POST',
    body: {
      domain,
      contact: contactData,
      nameservers: nameservers || [
        'ns1.technicalrelief.co.za',
        'ns2.technicalrelief.co.za',
      ],
    },
  })
}

/** Transfer a domain to HostAfrica */
export async function transferDomain(domain, authCode) {
  return callHostAfrica('domains/transfer', {
    method: 'POST',
    body: { domain, authCode },
  })
}

/** Get domain info (expiry, nameservers, status) */
export async function getDomainInfo(domain) {
  return callHostAfrica(`domains/${encodeURIComponent(domain)}`)
}

/** Renew a domain */
export async function renewDomain(domain, years = 1) {
  return callHostAfrica('domains/renew', {
    method: 'POST',
    body: { domain, years },
  })
}

/** Update nameservers for a domain */
export async function updateNameservers(domain, nameservers) {
  return callHostAfrica(`domains/${encodeURIComponent(domain)}/nameservers`, {
    method: 'PUT',
    body: { nameservers },
  })
}

// ═══════════════════════════════════════════════════════
// VPS OPERATIONS
// ═══════════════════════════════════════════════════════

/** Get available VPS plans */
export async function getVPSPlans() {
  return callHostAfrica('vps/plans')
}

/** Order a new VPS */
export async function orderVPS(planId, hostname, os, location = 'johannesburg') {
  return callHostAfrica('vps/order', {
    method: 'POST',
    body: { planId, hostname, os, location },
  })
}

/** Get VPS status */
export async function getVPSStatus(vpsId) {
  return callHostAfrica(`vps/${vpsId}/status`)
}

/** Get all VPS instances for the reseller */
export async function getVPSInstances() {
  return callHostAfrica('vps/instances')
}

/** Perform VPS action (start, stop, restart, rebuild) */
export async function vpsAction(vpsId, action) {
  return callHostAfrica(`vps/${vpsId}/action`, {
    method: 'POST',
    body: { action },
  })
}

// ═══════════════════════════════════════════════════════
// RESELLER ACCOUNT
// ═══════════════════════════════════════════════════════

/** Get reseller account balance */
export async function getResellerBalance() {
  return callHostAfrica('account/balance')
}

export { HostAfricaApiError }
