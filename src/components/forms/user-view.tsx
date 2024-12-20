import React, { useEffect, useState, Key } from 'react'
import Link from 'next/link'
import { getAgenciesByUser } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
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

type Props = {
  userId: string
}

const UserView: React.FC<Props> = ({ userId }) => {
  const [agencies, setAgencies] = useState<IAgency[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const fetchedAgencies = await getAgenciesByUser(userId)
        setAgencies(fetchedAgencies)
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    fetchAgencies()
  }, [userId])

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
          List of Your Agencies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Agency Name
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {agencies.map((agency) => (
            <TableRow key={agency._id as Key} className="border-t">
              <TableCell className="py-4 px-4 font-medium text-gray-900">
                {agency?.occupierDocuments.name || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Link href={`/inspection-view/agency/${agency?._id}`}>
                    View Details
                  </Link>
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Your Agencies
      </h2>
      {renderAgencies()}
    </div>
  )
}

export default UserView
