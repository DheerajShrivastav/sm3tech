import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createOrUpdateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create or update user in database
    const userData = {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      avatar: user.imageUrl || '',
    }

    const dbUser = await createOrUpdateUser(userData)

    return NextResponse.json({
      message: 'User synced successfully',
      user: {
        id: dbUser._id,
        clerkId: dbUser.clerkId,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role
      }
    })

  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}