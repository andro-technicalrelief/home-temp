import { NextResponse } from 'next/server'

/**
 * HostAfrica Reseller API Proxy — Catch-all route
 * 
 * Proxies requests to HostAfrica's reseller API (WHMCS-compatible).
 * Keeps API credentials server-side.
 *
 * Domain API: Uses API Email + API Key
 * VPS API: Uses API Key + Password
 */

function getDomainHeaders() {
  const email = process.env.HOSTAFRICA_API_EMAIL
  const apiKey = process.env.HOSTAFRICA_API_KEY
  if (!email || !apiKey) {
    throw new Error('HostAfrica domain API credentials not configured')
  }
  return {
    'Content-Type': 'application/json',
    'X-API-Email': email,
    'X-API-Key': apiKey,
  }
}

function getVPSHeaders() {
  const apiKey = process.env.HOSTAFRICA_VPS_API_KEY
  const password = process.env.HOSTAFRICA_VPS_API_PASSWORD
  if (!apiKey || !password) {
    throw new Error('HostAfrica VPS API credentials not configured')
  }
  return {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
    'X-API-Password': password,
  }
}

// Route to appropriate HostAfrica API based on path
function resolveEndpoint(pathSegments) {
  const type = pathSegments[0] // 'domains', 'vps', or 'account'
  const rest = pathSegments.slice(1).join('/')
  
  const DOMAIN_API_BASE = process.env.HOSTAFRICA_DOMAIN_API_URL || 'https://reseller.hostafrica.com/api'
  const VPS_API_BASE = process.env.HOSTAFRICA_VPS_API_URL || 'https://vps.hostafrica.com/api'
  
  if (type === 'vps') {
    return { url: `${VPS_API_BASE}/${rest}`, headers: getVPSHeaders() }
  }
  return { url: `${DOMAIN_API_BASE}/${type}${rest ? '/' + rest : ''}`, headers: getDomainHeaders() }
}

export async function GET(request, { params }) {
  try {
    const { path } = await params
    const { searchParams } = new URL(request.url)
    const { url: apiUrl, headers } = resolveEndpoint(path)
    
    const fullUrl = new URL(apiUrl)
    for (const [key, value] of searchParams.entries()) {
      fullUrl.searchParams.set(key, value)
    }
    
    const response = await fetch(fullUrl.toString(), {
      method: 'GET',
      headers,
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('HostAfrica API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'HostAfrica API request failed' },
      { status: error.message?.includes('not configured') ? 503 : 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    const { path } = await params
    const body = await request.json().catch(() => null)
    const { url: apiUrl, headers } = resolveEndpoint(path)
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('HostAfrica API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'HostAfrica API request failed' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { path } = await params
    const body = await request.json().catch(() => null)
    const { url: apiUrl, headers } = resolveEndpoint(path)
    
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('HostAfrica API Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'HostAfrica API request failed' },
      { status: 500 }
    )
  }
}
