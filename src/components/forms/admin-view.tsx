'use client'
import React, { useEffect, useState, Key } from 'react'
import { getAgencies, getUser } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IUser } from '@/models/user.model'

const AdminView = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [agencies, setAgencies] = useState<IAgency[] | {} | [{}]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser()
        console.log(user)
        if (!user) {
          setLoading(false)
          return
        }
        console.log(' insede the admin view', user?.role)
        if (user?.role !== 'Admin') {
          setUser(user)
          setLoading(false)
          return <div>Unauthorized Access</div>
        }
        if (user?.role === 'Admin') {
          const response = await getAgencies()
        
        console.log(response)
        setAgencies(response)}
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
    return <div>Error: {error as any}</div>
  }

  const renderAgencies = () => {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Agency Name</th>
              <th>Agency Email</th>
              <th>Agency Address</th>
              <th>Agency Phone</th>
            </tr>
          </thead>
          <tbody>
            {(agencies as IAgency[]).map((agency) => (
              <tr key={agency._id as Key}>
                {agency?.occupierDocuments.name ? (
                  <td>{agency?.occupierDocuments.name}</td>
                ) : (
                  <td>{agency?.occupierDocuments?.name}</td>
                )}
                {agency?.applicantIdProof.aadharCard ? (
                  <td>{agency?.applicantIdProof.aadharCard}</td>
                ) : (
                  <td>{agency?.applicantIdProof.electionId}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
  return <div>{renderAgencies()}</div>
}

export default AdminView
