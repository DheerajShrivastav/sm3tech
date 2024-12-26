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
import Link from 'next/link'

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
    return <div className="flex justify-center items-center min-h-screen text-gray-600 font-sora ">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>
  }

  const renderAgencies = () => {
    return (
      <Table className="w-full border border-gray-100  shadow-lg rounded-lg  font-sora">
        <TableHeader>
          <TableRow className="bg-blue-600 text-white">
            <TableHead className="py-3 px-6 font-semibold text-base text-white">
              Agency Name
            </TableHead>
            <TableHead className="py-3 px-6 font-semibold text-white text-base text-center">
              View Agency
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(agencies as IAgency[]).map((agency) => (
            <TableRow
              key={agency._id as Key}
              className="border border-gray-100 shadow-sm hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <TableCell className="py-4 px-6 font-medium text-gray-900">
                {agency?.occupierDocuments.name || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-6 text-center">
                <Link href={`/inspection-view/agency/${agency?._id}`}>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold tracking-tight text-blue-800 mb-8 font-sora text-left">
        Admin View: Agencies
      </h2>
      {renderAgencies()}
    </div>
  )
}

export default AdminView
