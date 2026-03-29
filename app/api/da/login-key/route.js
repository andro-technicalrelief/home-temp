import { NextResponse } from 'next/server'

/**
 * DirectAdmin SSO Login Key Generator
 * 
 * Generates a temporary login key for DirectAdmin SSO.
 * Allows clients to auto-login to DirectAdmin without re-entering credentials.
 * 
 * POST /api/da/login-key
 * Body: { username: "client_da_username" }
 * Returns: { loginUrl: "https://server:2222/CMD_LOGIN_KEY/<key>" }
 */

export async function POST(request) {
  try {
    const { username } = await request.json()
    
    if (!username) {
      return NextResponse.json(
        { error: 'DirectAdmin username required' },
        { status: 400 }
      )
    }
    
    const daUrl = process.env.DA_SERVER_URL
    const daAdmin = process.env.DA_ADMIN_USER
    const daPass = process.env.DA_ADMIN_PASS
    
    if (!daUrl || !daAdmin || !daPass) {
      return NextResponse.json(
        { error: 'DirectAdmin credentials not configured' },
        { status: 503 }
      )
    }
    
    // Generate login key via DirectAdmin API
    const authHeader = 'Basic ' + Buffer.from(`${daAdmin}:${daPass}`).toString('base64')
    
    const formData = new URLSearchParams({
      action: 'create',
      user: username,
      expire: '300', // 5 minutes
      clear: 'yes',
    })
    
    const response = await fetch(`${daUrl}/CMD_API_LOGIN_KEYS`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
    
    if (!response.ok) {
      throw new Error(`DirectAdmin API returned ${response.status}`)
    }
    
    const text = await response.text()
    
    // Parse DirectAdmin's key=value response format
    const params = new URLSearchParams(text)
    const key = params.get('key')
    
    if (!key) {
      throw new Error('Failed to generate login key')
    }
    
    return NextResponse.json({
      loginUrl: `${daUrl}/CMD_LOGIN_KEY/${key}`,
      expiresIn: 300,
    })
  } catch (error) {
    console.error('DirectAdmin SSO Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to generate DirectAdmin login key' },
      { status: 500 }
    )
  }
}
