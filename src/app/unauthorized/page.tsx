import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home } from 'lucide-react'
import Link from 'next/link'

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-lg shadow-xl border border-red-100">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            You don&apos;t have permission to access this page. This area is restricted to administrators only.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard">
                <Home className="w-4 h-4 mr-2" />
                Return to Dashboard
              </Link>
            </Button>
            
            <div className="text-sm text-gray-500">
              Need admin access? Contact your system administrator.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UnauthorizedPage