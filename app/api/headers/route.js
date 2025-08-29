import { NextResponse } from 'next/server'

export async function GET(request) {
  // Get all headers from the request
  const headers = {}
  
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value
  })

  // Add some additional useful information
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   request.headers.get('cf-connecting-ip') ||
                   'Unknown'

  return NextResponse.json({
    headers: {
      ...headers,
      'x-client-ip': clientIP,
      'x-request-method': request.method,
      'x-request-url': request.url
    },
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url
  })
}
