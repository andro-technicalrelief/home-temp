import { NextResponse } from 'next/server'

/**
 * GHL API Proxy — Catch-all route
 * 
 * Proxies requests to the GoHighLevel API v2.
 * Keeps GHL_API_KEY server-side (never exposed to browser).
 *
 * Example: /api/ghl/contacts → https://services.leadconnectorhq.com/contacts/
 */

const GHL_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'

function getHeaders() {
  const apiKey = process.env.GHL_API_KEY
  if (!apiKey) {
    throw new Error('GHL_API_KEY not configured')
  }
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Version': GHL_API_VERSION,
    'Content-Type': 'application/json',
  }
}

function buildGHLUrl(pathSegments, searchParams) {
  const path = pathSegments.join('/')
  const url = new URL(`${GHL_BASE}/${path}`)
  
  // Add locationId to all requests
  const locationId = process.env.GHL_LOCATION_ID
  if (locationId) {
    url.searchParams.set('locationId', locationId)
  }
  
  // Forward any query params
  if (searchParams) {
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'locationId') url.searchParams.set(key, value)
    }
  }
  
  return url.toString()
}

export async function GET(request, { params }) {
  try {
    const { path } = await params
    const { searchParams } = new URL(request.url)
    const ghlUrl = buildGHLUrl(path, searchParams)
    
    const response = await fetch(ghlUrl, {
      method: 'GET',
      headers: getHeaders(),
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('GHL API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'GHL API request failed' },
      { status: error.message?.includes('not configured') ? 503 : 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    const { path } = await params
    const body = await request.json().catch(() => null)
    const { searchParams } = new URL(request.url)
    const ghlUrl = buildGHLUrl(path, searchParams)
    
    // Inject locationId into body for create operations
    const locationId = process.env.GHL_LOCATION_ID
    if (body && locationId && !body.locationId) {
      body.locationId = locationId
    }
    
    const response = await fetch(ghlUrl, {
      method: 'POST',
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('GHL API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'GHL API request failed' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { path } = await params
    const body = await request.json().catch(() => null)
    const { searchParams } = new URL(request.url)
    const ghlUrl = buildGHLUrl(path, searchParams)
    
    const response = await fetch(ghlUrl, {
      method: 'PUT',
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('GHL API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'GHL API request failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { path } = await params
    const body = await request.json().catch(() => null)
    const { searchParams } = new URL(request.url)
    const ghlUrl = buildGHLUrl(path, searchParams)
    
    const response = await fetch(ghlUrl, {
      method: 'DELETE',
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    
    const data = await response.json().catch(() => ({}))
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('GHL API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'GHL API request failed' },
      { status: 500 }
    )
  }
}
