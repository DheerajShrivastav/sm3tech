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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Card className="bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-sora text-gray-900">Admin View: All Users</h1>
                <p className="text-gray-600 mt-1">Click on any user to view all their submitted documents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card
                  key={user._id}
                  onClick={() => router.push(`/admin/users/${user._id}`)}
                  className="p-6 cursor-pointer bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {user.name && user.name.trim() !== '' && !user.name.toLowerCase().includes('null')
                          ? user.name
                          : user.email}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {user.role}
                        </span>
                        <span className="text-xs text-gray-500">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {users.length === 0 && (
              <div className="text-center py-16 bg-blue-50/50 rounded-xl border border-blue-100">
                <div className="inline-block p-6 bg-blue-100 rounded-full mb-4">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <p className="text-gray-600 text-lg">No users found</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
