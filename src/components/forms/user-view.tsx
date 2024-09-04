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
    id : string
}

const UserView = ({id}: Props) => {
    const [agency, setAgency] = React.useState<IAgency | null>(null)
    React.useEffect(() => {
        const fetchAgency = async () => {
            const response = await getAgency(id)
            setAgency(response)
        }
        fetchAgency()
    }, [id])
  return (
    <div>
      {/* <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-md rounded"> */}
        <div>
        <h2 className="text-lg font-bold mb-4">Agency Documents</h2>
        <Table className="w-full border-collapse">
          <TableCaption>A list of your uploaded Documents</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Document Type</TableHead>
              <TableHead >Document Name</TableHead>
              <TableHead >View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className=" font-medium">Agency Registration</TableCell>
              <TableCell >
                {agency?.occupierDocuments.name}
              </TableCell>
              <TableCell className="p-2">
                <Button >
                  <a href={agency?.occupierDocuments.photo} target="_blank">
                    View Photo
                  </a>
                </Button>
                <Button >
                  <a href={agency?.occupierDocuments.signature} target="_blank">
                    View Signature
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          <TableRow>
              <TableCell className=" font-medium">Occupier Documents</TableCell>
              <TableCell >{agency?.occupierDocuments.name}</TableCell>
              <TableCell >
                <Button >
                  <a href={agency?.occupierDocuments.photo} target="_blank">
                    View Photo
                  </a>
                </Button>
                <Button >
                  <a href={agency?.occupierDocuments.signature} target="_blank">
                    View Signature
                  </a>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" font-medium">Applicant ID Proof</TableCell>
              <TableCell >
                {agency?.applicantIdProof.electionId ? (
                  <span>Election ID</span>
                ) : (
                  <span>Driving License</span>
                )}
                {agency?.applicantIdProof.aadharCard ? (
                  <span>Aadhar Card</span>
                ) : (
                  <span>Passport</span>
                )}
                {agency?.applicantIdProof.panCard ? (
                  <span>Pan Card</span>
                ) : (
                  <span></span>
                )}
              </TableCell>
              <TableCell >
                {agency?.applicantIdProof.electionId ? (
                  <Button >
                    <a
                      href={agency.applicantIdProof.electionId}
                      target="_blank"
                    >
                      View Election ID
                    </a>
                  </Button>
                ) : (
                  <Button >
                    <a
                      href={agency?.applicantIdProof.drivingLicense}
                      target="_blank"
                    >
                      View Driving License
                    </a>
                  </Button>
                )}
                {agency?.applicantIdProof.aadharCard ? (
                  <Button >
                    <a
                      href={agency?.applicantIdProof.aadharCard}
                      target="_blank"
                    >
                      View Aadhar Card
                    </a>
                  </Button>
                ) : (
                  <Button >
                    <a href={agency?.applicantIdProof.passport} target="_blank">
                      View Passport
                    </a>
                  </Button>
                )}
                {agency?.applicantIdProof.panCard ? (
                  <Button >
                    <a href={agency?.applicantIdProof.panCard} target="_blank">
                      View Pan Card
                    </a>
                  </Button>
                ) : (
                  <span></span>
                )}
              </TableCell>
            </TableRow> 
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UserView