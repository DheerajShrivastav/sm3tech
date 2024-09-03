'use client'
import { getAgency } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { get } from 'http'
import React from 'react'

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
        <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-md rounded">
  <h2 className="text-lg font-bold mb-4">Agency Documents</h2>
  <table className="w-full border-collapse">
    <tbody>
      <tr>
        <th className="bg-gray-200 p-2">Document Type</th>
        <th className="bg-gray-200 p-2">Document Name</th>
        <th className="bg-gray-200 p-2">View</th>
      </tr>
      <tr>
        <td className="p-2">Occupier Documents</td>
        <td className="p-2">{agency?.occupierDocuments.name}</td>
        <td className="p-2">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <a href={agency?.occupierDocuments.photo} target="_blank">
              View Photo
            </a>
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <a href={agency?.occupierDocuments.signature} target="_blank">
              View Signature
            </a>
          </button>
        </td>
      </tr>
      <tr>
        <td className="p-2">Applicant ID Proof</td>
        <td className="p-2">
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
        </td>
        <td className="p-2">
          {agency?.applicantIdProof.electionId ? (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <a href={agency.applicantIdProof.electionId} target="_blank">
                View Election ID
              </a>
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <a href={agency?.applicantIdProof.drivingLicense} target="_blank">
                View Driving License
              </a>
            </button>
          )}
          {agency?.applicantIdProof.aadharCard ? (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <a href={agency?.applicantIdProof.aadharCard} target="_blank">
                View Aadhar Card
              </a>
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <a href={agency?.applicantIdProof.passport} target="_blank">
                View Passport
              </a>
            </button>
          )}
          {agency?.applicantIdProof.panCard ? (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <a href={agency?.applicantIdProof.panCard} target="_blank">
                View Pan Card
              </a>
            </button>
          ) : (
            <span></span>
          )}
        </td>
      </tr>
    </tbody>
  </table>
</div>



    </div>
  )
}

export default UserView