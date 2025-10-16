import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/models/user.model'
import { connectDB } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
        { status: 400 }
      )
    }

    if (!['Admin', 'User'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be Admin or User' },
        { status: 400 }
      )
    }

    await connectDB()

    // Find user by email and update role
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { role },
      { new: true }
    )

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()

    const users = await User.find({}, {
      clerkId: 1,
      name: 1,
      email: 1,
      role: 1,
      createdAt: 1
    }).sort({ createdAt: -1 })

    return NextResponse.json({ users })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}