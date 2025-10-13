import { NextRequest, NextResponse } from 'next/server'

// This endpoint is designed to be called by external cron services
// like Vercel Cron, GitHub Actions, or external cron services

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from an authorized source
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.log('🕐 Starting scheduled NEPSE data sync...')
    
    // Call the sync API
    const syncResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/nepse/sync?type=all`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!syncResponse.ok) {
      throw new Error(`Sync API failed: ${syncResponse.statusText}`)
    }
    
    const syncResult = await syncResponse.json()
    
    console.log('✅ NEPSE data sync completed:', syncResult.summary)
    
    return NextResponse.json({
      success: true,
      message: 'NEPSE data sync completed successfully',
      timestamp: new Date().toISOString(),
      syncResult
    })
  } catch (error) {
    console.error('❌ Error in scheduled NEPSE sync:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Scheduled sync failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, schedule } = body
    
    // This could be used to configure different sync schedules
    console.log(`📅 Configuring NEPSE sync schedule: ${type} - ${schedule}`)
    
    return NextResponse.json({
      success: true,
      message: 'Sync schedule configured',
      type,
      schedule,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error configuring sync schedule:', error)
    return NextResponse.json(
      { 
        error: 'Failed to configure schedule',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
