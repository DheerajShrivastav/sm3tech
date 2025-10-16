import { auth } from '@clerk/nextjs/server'
import { User } from '@/models/user.model'
import { connectDB } from '@/lib/db'

export interface UserRole {
  userId: string
  email: string
  role: 'Admin' | 'User'
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  try {
    await connectDB()
    
    const user = await User.findOne({ clerkId: userId })
    
    if (!user) {
      return null
    }
    
    return {
      userId: user.clerkId,
      email: user.email,
      role: user.role as 'Admin' | 'User'
    }
  } catch (error) {
    console.error('Error fetching user role:', error)
    return null
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const userRole = await getUserRole(userId)
  return userRole?.role === 'Admin'
}

export async function requireAuth() {
  const { userId } = auth()
  
  if (!userId) {
    throw new Error('Unauthorized: No user session')
  }
  
  return userId
}

export async function requireAdmin() {
  const userId = await requireAuth()
  const isUserAdmin = await isAdmin(userId)
  
  if (!isUserAdmin) {
    throw new Error('Unauthorized: Admin access required')
  }
  
  return userId
}

export async function createOrUpdateUser(userData: {
  clerkId: string
  email: string
  name: string
  avatar: string
  role?: 'Admin' | 'User'
}) {
  try {
    await connectDB()
    
    const existingUser = await User.findOne({ clerkId: userData.clerkId })
    
    if (existingUser) {
      // Update existing user, but preserve role unless explicitly provided
      const updateData = {
        ...userData,
        role: userData.role || existingUser.role
      }
      
      return await User.findOneAndUpdate(
        { clerkId: userData.clerkId },
        updateData,
        { new: true, upsert: true }
      )
    } else {
      // Create new user with default 'User' role
      return await User.create({
        ...userData,
        role: userData.role || 'User'
      })
    }
  } catch (error) {
    console.error('Error creating/updating user:', error)
    throw error
  }
}