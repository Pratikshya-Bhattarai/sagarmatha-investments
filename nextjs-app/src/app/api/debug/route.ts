import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing'
      },
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'Not set',
      vercel: {
        region: process.env.VERCEL_REGION || 'Not set',
        url: process.env.VERCEL_URL || 'Not set'
      }
    }

    return NextResponse.json(debugInfo)
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Debug failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
