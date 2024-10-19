'use client'
import React, { useEffect, useState, Key } from 'react'
import { getAgencies, getUser } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IUser } from '@/models/user.model'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const AdminView = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [agencies, setAgencies] = useState<IAgency[] | {} | [{}]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser()
        if (!user) {
          setLoading(false)
          return
        }
        if (user?.role !== 'Admin') {
          setUser(user)
          setLoading(false)
          return <div>Unauthorized Access</div>
        }
        if (user?.role === 'Admin') {
          const response = await getAgencies()
          setAgencies(response)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const renderAgencies = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">
          List of Agencies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">Agency Name</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">Agency Email</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">Agency Address</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">Agency Phone</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(agencies as IAgency[]).map((agency) => (
            <TableRow key={agency._id as Key} className="border-t">
              <TableCell className="py-4 px-4 font-medium text-gray-900">
                {agency?.occupierDocuments.name || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {agency?.applicantIdProof.aadharCard || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {agency?.occupierDocuments.address || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {agency?.occupierDocuments.phone || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  View Details
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Edit Agency
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin View: Agencies</h2>
      {renderAgencies()}
    </div>
  )
}

export default AdminView
