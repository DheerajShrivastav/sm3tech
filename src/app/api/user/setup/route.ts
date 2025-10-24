import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createOrUpdateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'No authenticated user found' },
        { status: 401 }
      )
    }

    // Create or update user in database when they first access the app
    const userData = {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User',
      avatar: user.imageUrl || '',
    }

    const dbUser = await createOrUpdateUser(userData)

    return NextResponse.json({
      success: true,
      message: 'User created/updated successfully',
      user: {
        id: dbUser._id,
        clerkId: dbUser.clerkId,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        createdAt: dbUser.createdAt
      }
    })

  } catch (error) {
    console.error('Error in user setup:', error)
    return NextResponse.json(
      { error: 'Failed to setup user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'No authenticated user found' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      clerkUser: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        avatar: user.imageUrl
      }
    })

  } catch (error) {
    console.error('Error getting user info:', error)
    return NextResponse.json(
      { error: 'Failed to get user info' },
      { status: 500 }
    )
  }
}