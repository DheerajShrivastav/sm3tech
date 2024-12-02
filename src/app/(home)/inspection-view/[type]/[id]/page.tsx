'use client'
// src/app/inspection-view/[type]/[id]/page.tsx

import { useEffect, useState } from 'react'
import { getAgency, getFactoryLicense } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IFactoryLicenseDetails } from '@/models/factoryLicenseDetails.model'
// import { useRouter } from 'next/router'

interface Params {
  type: string;
  id: string;
}

const InspectionView = ({ params }: { params: Params }) => {
  // const router = useRouter()
  // const { type, id } = router.query
  const type = params.type
  const id = params.id
  const [data, setData] = useState<IAgency | IFactoryLicenseDetails | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (type && id) {
      const fetchData = async () => {
        try {
          console.log('Fetching data for type:', type, 'and id:', id)
          let data
          if (type === 'agency') {
            data = await getAgency(id as string)
          } else if (type === 'factory-license') {
            data = await getFactoryLicense(id as string)
          }
          if (data) {
            console.log('Data fetched successfully:', data)
            setData(data)
          } else {
            console.log('No data found for id:', id)
            setError('No data found')
          }
        } catch (error) {
          console.error('Error fetching data:', error)
          setError(error instanceof Error ? error.message : String(error))
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    } else {
      console.log('Type or ID is missing:', { type, id })
      setLoading(false)
    }
  }, [type, id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>No data found</div>
  }

  return (
    <div>
      <h1>
        {type === 'agency' ? 'Agency Details' : 'Factory License Details'}
      </h1>
      {type === 'agency' && (
        <>
          <p>Name: {(data as IAgency).occupierDocuments.name}</p>
          <p>Photo: {(data as IAgency).occupierDocuments.photo}</p>
          <p>Signature: {(data as IAgency).occupierDocuments.signature}</p>
          {/* Render other agency details here */}
        </>
      )}
      {type === 'factory-license' && (
        <>
          <p>
            Industry Registration:{' '}
            {(data as IFactoryLicenseDetails).industryRegistration}
          </p>
          <p>
            Manufacturing Process:{' '}
            {(data as IFactoryLicenseDetails).manufacturingProcess}
          </p>
          {/* Render other factory license details here */}
        </>
      )}
    </div>
  )
}

export default InspectionView
