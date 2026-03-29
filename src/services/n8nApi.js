/**
 * N8N Automation Integrations
 *
 * All calls route through Next.js API routes at /api/webhooks/
 * to keep webhook URLs private and bypass browser CORS entirely.
 */

const API_BASE = '/api/webhooks'

export async function syncUserToN8N(userData) {
  try {
    const response = await fetch(`${API_BASE}/n8n-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`Sync failed with status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('N8N API Error:', error.message)
    throw error
  }
}
