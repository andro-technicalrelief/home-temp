/**
 * GoHighLevel (GHL) CRM API Client
 *
 * All calls route through Next.js API routes at /api/ghl/*
 * to keep API keys server-side. 
 *
 * GHL API v2 Reference: https://highlevel.stoplight.io/docs/integrations
 * Base URL: https://services.leadconnectorhq.com
 */

const API_BASE = '/api/ghl'

class GHLApiError extends Error {
  constructor(message, status, response) {
    super(message)
    this.name = 'GHLApiError'
    this.status = status
    this.response = response
  }
}

async function callGHL(endpoint, { method = 'GET', body = null, params = {} } = {}) {
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
      throw new GHLApiError(err.message || `GHL API failed: ${res.statusText}`, res.status, err)
    }
    return await res.json()
  } catch (error) {
    if (error instanceof GHLApiError) throw error
    throw new GHLApiError(error.message, 0, null)
  }
}

// ═══════════════════════════════════════════════════════
// CONTACTS
// ═══════════════════════════════════════════════════════

/** Create a GHL contact (on user registration) */
export async function createContact(data) {
  return callGHL('contacts', {
    method: 'POST',
    body: {
      firstName: data.firstName || data.first_name,
      lastName: data.lastName || data.last_name,
      email: data.email,
      phone: data.phone || '',
      tags: data.tags || ['new-client'],
      source: 'Technical Relief Portal',
      customFields: data.customFields || [],
    },
  })
}

/** Get a contact by ID */
export async function getContact(contactId) {
  return callGHL(`contacts/${contactId}`)
}

/** Search contacts by email or query */
export async function searchContacts(query, options = {}) {
  return callGHL('contacts/search', {
    method: 'POST',
    body: {
      query,
      ...options,
    },
  })
}

/** Update a contact */
export async function updateContact(contactId, data) {
  return callGHL(`contacts/${contactId}`, {
    method: 'PUT',
    body: data,
  })
}

/** Add tag(s) to a contact */
export async function addTag(contactId, tags) {
  return callGHL(`contacts/${contactId}/tags`, {
    method: 'POST',
    body: { tags: Array.isArray(tags) ? tags : [tags] },
  })
}

/** Remove a tag from a contact */
export async function removeTag(contactId, tag) {
  return callGHL(`contacts/${contactId}/tags`, {
    method: 'DELETE',
    body: { tags: [tag] },
  })
}

/** Add a note to a contact */
export async function addNote(contactId, body) {
  return callGHL(`contacts/${contactId}/notes`, {
    method: 'POST',
    body: { body },
  })
}

/** Get notes for a contact */
export async function getNotes(contactId) {
  return callGHL(`contacts/${contactId}/notes`)
}

// ═══════════════════════════════════════════════════════
// PIPELINES & OPPORTUNITIES
// ═══════════════════════════════════════════════════════

/** Get all pipelines */
export async function getPipelines() {
  return callGHL('opportunities/pipelines')
}

/** Search opportunities in a pipeline */
export async function searchOpportunities(pipelineId, options = {}) {
  return callGHL('opportunities/search', {
    method: 'GET',
    params: { pipeline_id: pipelineId, ...options },
  })
}

/** Create an opportunity (e.g., new hosting order) */
export async function createOpportunity(data) {
  return callGHL('opportunities', {
    method: 'POST',
    body: data,
  })
}

/** Update an opportunity (move pipeline stage) */
export async function updateOpportunity(opportunityId, data) {
  return callGHL(`opportunities/${opportunityId}`, {
    method: 'PUT',
    body: data,
  })
}

/** Move a contact/opportunity to a pipeline stage */
export async function moveToPipelineStage(opportunityId, pipelineId, stageId) {
  return updateOpportunity(opportunityId, {
    pipelineId,
    pipelineStageId: stageId,
  })
}

// ═══════════════════════════════════════════════════════
// CONVERSATIONS (Support)
// ═══════════════════════════════════════════════════════

/** Get conversations for a contact */
export async function getConversations(contactId) {
  return callGHL(`conversations/search`, {
    method: 'GET',
    params: { contactId },
  })
}

/** Send a message in a conversation */
export async function sendMessage(conversationId, data) {
  return callGHL(`conversations/messages`, {
    method: 'POST',
    body: {
      conversationId,
      type: data.type || 'Email',
      message: data.message,
      subject: data.subject,
    },
  })
}

export { GHLApiError }
