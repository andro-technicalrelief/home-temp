import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Pass the body to the n8n webhook
    // Using environment variables or hardcoded for now, based on the chat
    const n8nWebhookUrl = process.env.N8N_CLIENT_SIGNUP_WEBHOOK || 'https://n8n.technicalrelief.co.za/webhook/user-signup'
    
    // N8N expects the webhook to be fired.
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error(`n8n webhook responded with status ${response.status}`)
    }

    const data = await response.json().catch(() => ({ success: true }))
    
    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('n8n Sync Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to sync with n8n' },
      { status: 500 }
    )
  }
}
