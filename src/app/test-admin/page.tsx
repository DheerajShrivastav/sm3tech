'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, User, Database, Settings } from 'lucide-react'

const TestPage = () => {
  const { user, isLoaded } = useUser()
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [setupResult, setSetupResult] = useState<any>(null)
  const [adminEmail, setAdminEmail] = useState('')

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setLoading(true)
    try {
      const result = await testFunction()
      setTestResults(prev => ({
        ...prev,
        [testName]: { success: true, data: result }
      }))
    } catch (error: any) {
      setTestResults(prev => ({
        ...prev,
        [testName]: { success: false, error: error.message }
      }))
    }
    setLoading(false)
  }

  const setupUserInDatabase = async () => {
    const response = await fetch('/api/user/setup', { method: 'POST' })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Setup failed')
    }
    return await response.json()
  }

  const fetchAllUsers = async () => {
    const response = await fetch('/api/admin/users')
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch users')
    }
    return await response.json()
  }

  const makeUserAdmin = async () => {
    if (!adminEmail) {
      throw new Error('Please enter an email address')
    }
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, role: 'Admin' })
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to make user admin')
    }
    return await response.json()
  }

  const syncCurrentUser = async () => {
    const response = await fetch('/api/user/sync', { method: 'POST' })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Sync failed')
    }
    return await response.json()
  }

  if (!isLoaded) {
    return <div className="p-8">Loading...</div>
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>🧪 Admin System Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-red-800">
                    Please sign in first to test the admin system.
                  </p>
                  <Button asChild className="mt-2">
                    <a href="/agency/sign-in">Sign In</a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              🧪 Admin System Test Page - Localhost Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Current User Info:</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</div>
                  <div><strong>Name:</strong> {user.firstName} {user.lastName}</div>
                  <div><strong>Clerk ID:</strong> {user.id}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Database Setup Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* Step 1: Setup User */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step 1: Create User in Database</h3>
                <p className="text-sm text-gray-600 mb-3">
                  This creates your Clerk user in our MongoDB database with default &quot;User&quot; role.
                </p>
                <Button 
                  onClick={() => runTest('setup', setupUserInDatabase)}
                  disabled={loading}
                  className="mr-2"
                >
                  Setup User in Database
                </Button>
                {testResults.setup && (
                  <div className={`mt-2 p-2 rounded text-sm ${
                    testResults.setup.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {testResults.setup.success ? (
                      <div>
                        ✅ User created! Role: {testResults.setup.data.user.role}
                      </div>
                    ) : (
                      <div>❌ Error: {testResults.setup.error}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Sync User */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step 2: Sync Current User</h3>
                <p className="text-sm text-gray-600 mb-3">
                  This syncs your current Clerk session with the database.
                </p>
                <Button 
                  onClick={() => runTest('sync', syncCurrentUser)}
                  disabled={loading}
                  variant="outline"
                >
                  Sync User
                </Button>
                {testResults.sync && (
                  <div className={`mt-2 p-2 rounded text-sm ${
                    testResults.sync.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {testResults.sync.success ? (
                      <div>✅ Synced! Current role: {testResults.sync.data.user.role}</div>
                    ) : (
                      <div>❌ Error: {testResults.sync.error}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Step 3: Make Admin */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step 3: Promote User to Admin</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Enter an email address to promote that user to Admin role.
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter email to make admin"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => runTest('admin', makeUserAdmin)}
                    disabled={loading || !adminEmail}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Make Admin
                  </Button>
                </div>
                <Button 
                  onClick={() => setAdminEmail(user.emailAddresses[0]?.emailAddress)}
                  variant="link"
                  className="text-xs"
                >
                  Use my email
                </Button>
                {testResults.admin && (
                  <div className={`mt-2 p-2 rounded text-sm ${
                    testResults.admin.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {testResults.admin.success ? (
                      <div>✅ User promoted to Admin!</div>
                    ) : (
                      <div>❌ Error: {testResults.admin.error}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Step 4: View All Users */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step 4: View All Users</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Fetch all users from the database to see roles.
                </p>
                <Button 
                  onClick={() => runTest('users', fetchAllUsers)}
                  disabled={loading}
                  variant="outline"
                >
                  Fetch All Users
                </Button>
                {testResults.users && (
                  <div className={`mt-2 p-2 rounded text-sm ${
                    testResults.users.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {testResults.users.success ? (
                      <div>
                        <div>✅ Found {testResults.users.data.users.length} users:</div>
                        <div className="mt-2 space-y-1">
                          {testResults.users.data.users.map((user: any, index: number) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-white p-2 rounded">
                              <span>{user.email}</span>
                              <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>❌ Error: {testResults.users.error}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>1. ✅ Run all the tests above</div>
              <div>2. ✅ Make yourself an admin using Step 3</div>
              <div>3. ✅ Visit the <Button asChild variant="link" className="h-auto p-0 font-normal"><a href="/dashboard">Dashboard</a></Button> to see admin features</div>
              <div>4. ✅ Create more test users and promote/demote them</div>
              <div>5. ✅ Test the full admin panel functionality</div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default TestPage