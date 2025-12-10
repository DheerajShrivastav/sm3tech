'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, getAllUsers } from '@/lib/queries'
import { Card } from '@/components/ui/card'
import { User, Users } from 'lucide-react'

interface UserData {
  _id: string
  email: string
  name?: string
  createdAt: Date
  role: string
}

export default function AdminUsersView() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser()
        setCurrentUser(user)

        if (user?.role !== 'Admin') {
          router.push('/inspection-view')
          return
        }

        // Fetch all users using the query function
        const allUsers = await getAllUsers()
        setUsers(allUsers || [])
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (currentUser?.role !== 'Admin') {
    return <div>Unauthorized Access</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Admin View: All Users</h1>
        </div>
        <p className="text-gray-600 mb-6">Click on any user to view all their submitted documents</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card
              key={user._id}
              onClick={() => router.push(`/admin/users/${user._id}`)}
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-300 bg-gradient-to-br from-white to-indigo-50"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {user.name && user.name.trim() !== '' && !user.name.toLowerCase().includes('null')
                      ? user.name
                      : user.email}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}
