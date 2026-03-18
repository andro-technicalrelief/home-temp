/**
 * PayFast Tokenization & Subscription API Client
 *
 * Implements PayFast's hosted card tokenization (ad-hoc payments)
 * and recurring subscription management.
 *
 * Security: Zero-Trust — no raw card data touches our server.
 * Only PayFast tokens are stored in the Blesta/Database layer.
 *
 * PayFast docs: https://developers.payfast.co.za/docs
 */

const PAYFAST_BASE = import.meta.env.VITE_PAYFAST_URL || 'https://sandbox.payfast.co.za'
const MERCHANT_ID = import.meta.env.VITE_PAYFAST_MERCHANT_ID || '10000100'
const MERCHANT_KEY = import.meta.env.VITE_PAYFAST_MERCHANT_KEY || '46f0cd694581a'

// ═══════════════════════════════════════════════════════
// SIGNATURE GENERATION (client-side for redirects)
// ═══════════════════════════════════════════════════════

/**
 * Generate PayFast MD5 signature from parameter object.
 * In production, this MUST happen server-side with the passphrase.
 * For sandbox/dev, we generate client-side without passphrase.
 */
function generateParamString(data) {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v).trim())}`)
    .join('&')
}

// ═══════════════════════════════════════════════════════
// CARD TOKENIZATION (PayFast Hosted)
// ═══════════════════════════════════════════════════════

/**
 * Build the PayFast tokenization redirect URL.
 * This sends the client to PayFast's hosted card capture page.
 * After successful capture, PayFast redirects back with a token.
 *
 * @param {object} options
 * @param {string} options.clientEmail - Client email
 * @param {string} options.clientName - Client first name
 * @param {string} options.clientSurname - Client last name
 * @param {string} options.returnUrl - URL to redirect after success
 * @param {string} options.cancelUrl - URL to redirect on cancel
 * @param {string} options.notifyUrl - Webhook URL for async notification
 * @returns {string} Full PayFast redirect URL
 */
export function buildTokenizationUrl({
  clientEmail,
  clientName,
  clientSurname,
  returnUrl = `${window.location.origin}/dashboard/wallet?status=success`,
  cancelUrl = `${window.location.origin}/dashboard/wallet?status=cancelled`,
  notifyUrl = `${window.location.origin}/api/payfast/notify`,
}) {
  const data = {
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: clientName,
    name_last: clientSurname,
    email_address: clientEmail,
    // Tokenization-specific
    subscription_type: 2,  // 2 = ad-hoc tokenization (charge when we want)
    amount: '0.00',        // R0 for tokenization-only (no initial charge)
    item_name: 'Card Tokenization — Technical Relief',
    item_description: 'Link your card for secure auto-billing',
  }

  const paramString = generateParamString(data)
  return `${PAYFAST_BASE}/eng/process?${paramString}`
}

/**
 * Initiate card tokenization by redirecting to PayFast.
 * @param {object} options - Same as buildTokenizationUrl
 */
export function initiateTokenization(options) {
  const url = buildTokenizationUrl(options)
  window.location.href = url
}

// ═══════════════════════════════════════════════════════
// TOKEN CHARGE (Ad-Hoc Recurring)
// ═══════════════════════════════════════════════════════

/**
 * Charge a tokenized card via the backend proxy.
 * The backend holds the passphrase and makes the server-to-server call.
 *
 * @param {string} token - PayFast token from tokenization
 * @param {number} amount - Amount in ZAR (e.g. 599.00)
 * @param {string} description - Charge description
 * @returns {Promise<object>} Charge result
 */
export async function chargeToken(token, amount, description) {
  const response = await fetch('/api/payfast/charge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, amount, description }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to process payment')
  }

  return response.json()
}

/**
 * Cancel a tokenized card subscription.
 * @param {string} token - PayFast token
 * @returns {Promise<object>}
 */
export async function cancelTokenSubscription(token) {
  const response = await fetch('/api/payfast/cancel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to cancel subscription')
  }

  return response.json()
}

// ═══════════════════════════════════════════════════════
// SUBSCRIPTION MANAGEMENT
// ═══════════════════════════════════════════════════════

/**
 * Build PayFast subscription URL for a fixed recurring plan.
 *
 * @param {object} options
 * @param {number} options.amount - Monthly amount in ZAR
 * @param {string} options.planName - Subscription plan name
 * @param {string} options.clientEmail
 * @param {string} options.clientName
 * @param {string} options.clientSurname
 * @param {'Monthly'|'Quarterly'|'Yearly'} options.frequency
 * @param {number} options.cycles - Number of billing cycles (0 = indefinite)
 * @returns {string} PayFast redirect URL
 */
export function buildSubscriptionUrl({
  amount,
  planName,
  clientEmail,
  clientName,
  clientSurname,
  frequency = 'Monthly',
  cycles = 0,
  returnUrl = `${window.location.origin}/dashboard/subscriptions?status=success`,
  cancelUrl = `${window.location.origin}/dashboard/subscriptions?status=cancelled`,
  notifyUrl = `${window.location.origin}/api/payfast/notify`,
}) {
  const frequencyMap = { Monthly: 3, Quarterly: 4, Biannual: 5, Annual: 6 }

  const data = {
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: clientName,
    name_last: clientSurname,
    email_address: clientEmail,
    amount: amount.toFixed(2),
    item_name: planName,
    item_description: `${planName} — Technical Relief`,
    subscription_type: 1,  // 1 = subscription (recurring on schedule)
    billing_date: new Date().toISOString().split('T')[0],
    recurring_amount: amount.toFixed(2),
    frequency: frequencyMap[frequency] || 3,
    cycles: cycles,
  }

  const paramString = generateParamString(data)
  return `${PAYFAST_BASE}/eng/process?${paramString}`
}

// ═══════════════════════════════════════════════════════
// MOCK DATA (for dev/testing before live PayFast)
// ═══════════════════════════════════════════════════════

export const MOCK_WALLET = {
  cards: [
    {
      id: 'card-001',
      token: 'pf_tok_test_xxxx1234',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/2028',
      isDefault: true,
      linkedAt: '2026-02-15',
    },
  ],
  billingConsent: true,
}

export const MOCK_SUBSCRIPTIONS = [
  {
    id: 'sub-001',
    planId: 'shared-professional',
    planName: 'Professional Web Hosting',
    status: 'active',
    amount: 949,
    userCount: 3,
    tier: 'SME',
    frequency: 'Monthly',
    nextBilling: '2026-04-01',
    cardLast4: '4242',
    createdAt: '2025-09-15',
  },
  {
    id: 'sub-002',
    planId: 'domain-coza',
    planName: 'Domain — example.co.za',
    status: 'active',
    amount: 199,
    userCount: 1,
    tier: 'SME',
    frequency: 'Annual',
    nextBilling: '2027-06-10',
    cardLast4: '4242',
    createdAt: '2025-06-10',
  },
]

export const MOCK_TRANSACTIONS = [
  { id: 'tx-001', date: '2026-03-01', amount: 949, description: 'Professional Hosting — March 2026', status: 'Completed', cardLast4: '4242' },
  { id: 'tx-002', date: '2026-02-01', amount: 949, description: 'Professional Hosting — February 2026', status: 'Completed', cardLast4: '4242' },
  { id: 'tx-003', date: '2026-01-01', amount: 949, description: 'Professional Hosting — January 2026', status: 'Completed', cardLast4: '4242' },
  { id: 'tx-004', date: '2025-12-01', amount: 949, description: 'Professional Hosting — December 2025', status: 'Completed', cardLast4: '4242' },
]
