import { NextResponse } from 'next/server'

/**
 * n8n Webhook Trigger
 * 
 * POST /api/webhooks/n8n
 * Triggers n8n workflows for email automation, notifications, etc.
 * 
 * Body: { workflow: "welcome-email", data: { ... } }
 */

export async function POST(request) {
  try {
    const { workflow, data } = await request.json()
    
    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow name required' },
        { status: 400 }
      )
    }
    
    const n8nUrl = process.env.N8N_WEBHOOK_URL
    if (!n8nUrl) {
      console.warn('N8N_WEBHOOK_URL not configured — skipping webhook')
      return NextResponse.json({ 
        success: true, 
        skipped: true, 
        message: 'n8n not configured' 
      })
    }
    
    const response = await fetch(`${n8nUrl}/${workflow}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data || {}),
    })
    
    const result = await response.json().catch(() => ({ status: response.status }))
    
    return NextResponse.json({
      success: response.ok,
      result,
    })
  } catch (error) {
    console.error('n8n Webhook Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'n8n webhook failed' },
      { status: 500 }
    )
  }
}
