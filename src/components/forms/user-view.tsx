'use client'
import { getAgency } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'

type Props = {
    id: string
}

const UserView = ({ id }: Props) => {
  const [agency, setAgency] = React.useState<IAgency | null>(null)

  React.useEffect(() => {
    const fetchAgency = async () => {
      const response = await getAgency(id)
      setAgency(response)
    }
    fetchAgency()
  }, [id])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg font-sora">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agency Documents</h2>
      
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
        <TableCaption className="text-left text-gray-600 font-light">A list of your uploaded Documents</TableCaption>
        
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">Document Type</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">Document Name</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="border-t">
            <TableCell className="py-4 px-4 font-medium text-gray-900">Agency Registration</TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {agency?.occupierDocuments.name || 'N/A'}
            </TableCell>
            <TableCell className="py-4 px-4 text-right">
              <Button className="mr-2 bg-blue-600 text-white hover:bg-indigo-700 rounded-lg">
                <a href={agency?.occupierDocuments.photo} target="_blank" rel="noopener noreferrer">View Photo</a>
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                <a href={agency?.occupierDocuments.signature} target="_blank" rel="noopener noreferrer">View Signature</a>
              </Button>
            </TableCell>
          </TableRow>

          <TableRow className="border-t">
            <TableCell className="py-4 px-4 font-medium text-gray-900">Occupier Documents</TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {agency?.occupierDocuments.name || 'N/A'}
            </TableCell>
            <TableCell className="py-4 px-4 text-right">
              <Button className="mr-2 bg-blue-600 text-white hover:bg-indigo-700 rounded-lg">
                <a href={agency?.occupierDocuments.photo} target="_blank" rel="noopener noreferrer">View Photo</a>
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                <a href={agency?.occupierDocuments.signature} target="_blank" rel="noopener noreferrer">View Signature</a>
              </Button>
            </TableCell>
          </TableRow>

          <TableRow className="border-t">
            <TableCell className="py-4 px-4 font-medium text-gray-900">Applicant ID Proof</TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {agency?.applicantIdProof.electionId ? 'Election ID' : 'Driving License'}
              <br />
              {agency?.applicantIdProof.aadharCard ? 'Aadhar Card' : 'Passport'}
              <br />
              {agency?.applicantIdProof.panCard && 'Pan Card'}
            </TableCell>
            <TableCell className="py-4 px-4 text-right flex flex-col md:flex-row md:justify-end">
              {agency?.applicantIdProof.electionId ? (
                <Button className="mr-2 mb-2 md:mb-0 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                  <a href={agency.applicantIdProof.electionId} target="_blank" rel="noopener noreferrer">View Election ID</a>
                </Button>
              ) : (
                <Button className="mr-2 mb-2 md:mb-0 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                  <a href={agency?.applicantIdProof.drivingLicense} target="_blank" rel="noopener noreferrer">View Driving License</a>
                </Button>
              )}

              {agency?.applicantIdProof.aadharCard ? (
                <Button className="mr-2 mb-2 md:mb-0 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                  <a href={agency?.applicantIdProof.aadharCard} target="_blank" rel="noopener noreferrer">View Aadhar Card</a>
                </Button>
              ) : (
                <Button className="mr-2 mb-2 md:mb-0 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                  <a href={agency?.applicantIdProof.passport} target="_blank" rel="noopener noreferrer">View Passport</a>
                </Button>
              )}

              {agency?.applicantIdProof.panCard && (
                <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                  <a href={agency?.applicantIdProof.panCard} target="_blank" rel="noopener noreferrer">View Pan Card</a>
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default UserView
