'use client'
// src/app/inspection-view/[type]/[id]/page.tsx

import { useEffect, useState } from 'react'
import { getAgency, getFactoryLicense } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IFactoryLicenseDetails } from '@/models/factoryLicenseDetails.model'
// import { useRouter } from 'next/router'

interface Params {
  type: string
  id: string
}

const InspectionView = ({ params }: { params: Params }) => {
  // const router = useRouter()
  // const { type, id } = router.query
  const type = params.type
  const id = params.id
  const [data, setData] = useState<
    IAgency | IFactoryLicenseDetails | null | []
  >(null)
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
          <h2>Applicant ID Proof</h2>
          <p>Election ID: {(data as IAgency).applicantIdProof.electionId}</p>
          <p>
            Driving License: {(data as IAgency).applicantIdProof.drivingLicense}
          </p>
          <p>Aadhar Card: {(data as IAgency).applicantIdProof.aadharCard}</p>
          <p>Passport: {(data as IAgency).applicantIdProof.passport}</p>
          <p>PAN Card: {(data as IAgency).applicantIdProof.panCard}</p>

          <h2>Previous Factory License</h2>
          <p>
            Previous Factory License:{' '}
            {(data as IAgency).previousFactoryLicense.previousFactoryLicense}
          </p>
          <p>
            Plan Approval Letter:{' '}
            {(data as IAgency).previousFactoryLicense.planApprovalLetter}
          </p>

          <h2>Private Limited Company</h2>
          <p>
            List of Directors:{' '}
            {(data as IAgency).privateLimitedCompany?.listOfDirectors}
          </p>
          <p>MOA: {(data as IAgency).privateLimitedCompany?.moa}</p>
          <p>
            Board Resolution:{' '}
            {(data as IAgency).privateLimitedCompany?.boardResolution}
          </p>
          <p>Form 32: {(data as IAgency).privateLimitedCompany?.form32}</p>

          <h2>List of Raw Materials</h2>
          <p>
            List of Raw Materials:{' '}
            {(data as IAgency).listOfRawMaterials.listOfRawMaterials}
          </p>

          <h2>Ownership Documents</h2>
          <p>
            Leave and License Agreement:{' '}
            {(data as IAgency).ownershipDocuments.leaveAndLicenseAgreement}
          </p>
          <p>
            MIDC Allotment Letter:{' '}
            {(data as IAgency).ownershipDocuments.midcAllotmentLetter}
          </p>
          <p>
            7/12 Extract:{' '}
            {(data as IAgency).ownershipDocuments.sevenTwelveExtract}
          </p>
          <p>Tax Receipt: {(data as IAgency).ownershipDocuments.taxReceipt}</p>

          <h2>Local Authority NoC</h2>
          <p>
            Local Authority NoC:{' '}
            {(data as IAgency).localAuthorityNoC.localAuthorityNoC}
          </p>
          <p>
            Corporation NoC:{' '}
            {(data as IAgency).localAuthorityNoC.corporationNoC}
          </p>
          <p>
            Grampanchayat NoC:{' '}
            {(data as IAgency).localAuthorityNoC.grampanchayatNoC}
          </p>
          <p>MIDC NoC: {(data as IAgency).localAuthorityNoC.midcNoC}</p>

          <h2>MPCB Consent</h2>
          <p>MPCB Consent: {(data as IAgency).mpcbConsent.mpcbConsent}</p>
          <h2>Sketch Factory</h2>
          <p>Sketch: {(data as IAgency).sketchFactory.sketch}</p>

          <h2>Electricity Bill</h2>
          <p>
            Electricity Bill:{' '}
            {(data as IAgency).electricityBill.electricityBill}
          </p>
          <p>
            Load Sanction Letter:{' '}
            {(data as IAgency).electricityBill.loadSanctionletter}
          </p>

          <h2>Acceptance Letter</h2>
          <p>
            Acceptance Letter:{' '}
            {(data as IAgency).acceptanceLetter.acceptanceLetter}
          </p>

          <h2>Flow Chart</h2>
          <p>Flow Chart: {(data as IAgency).flowChart.flowChart}</p>

          <h2>Status</h2>
          <p>Status: {(data as IAgency).status}</p>
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
          <p>
            Land Ownership Certificate:{' '}
            {(data as IFactoryLicenseDetails).landOwnershipCertificate}
          </p>
          <p>
            Detailed Proposal of Pollution Control System:{' '}
            {
              (data as IFactoryLicenseDetails)
                .detailedProposalOfPollutionControlSystem
            }
          </p>
          <p>
            Previous Consent Copy:{' '}
            {(data as IFactoryLicenseDetails).previousConsentCopy}
          </p>
          <p>Fixed Assets: {(data as IFactoryLicenseDetails).fixedAssets}</p>
          <p>
            Audited Balance Sheet:{' '}
            {(data as IFactoryLicenseDetails).auditedBalanceSheet}
          </p>
          <p>Visit Report: {(data as IFactoryLicenseDetails).visitReport}</p>
          <p>JVS Report: {(data as IFactoryLicenseDetails).jvsReport}</p>
          <p>Local Body NOC: {(data as IFactoryLicenseDetails).localBodyNoc}</p>
          <p>Other: {(data as IFactoryLicenseDetails).other}</p>
          <p>
            Company&apos;s Authorization Letter:{' '}
            {(data as IFactoryLicenseDetails).companysAuthorizationLetter}
          </p>
          <p>
            PAN Card Copy of Industry:{' '}
            {(data as IFactoryLicenseDetails).panCardCopyOfIndustry}
          </p>
          <p>
            Aadhaar Card or PAN Card Copy of Authorized Person:{' '}
            {
              (data as IFactoryLicenseDetails)
                .aadhaarCardOrPanCardCopyOfAuthorizedPerson
            }
          </p>
          <p>
            Industry Board of Resolution List of Directors:{' '}
            {
              (data as IFactoryLicenseDetails)
                .industryBoardOfResolutionListofDirectors
            }
          </p>
          <p>
            No Increase in Pollution Load Certificate:{' '}
            {
              (data as IFactoryLicenseDetails)
                .noIncreaseInPollutionLoadCertificate
            }
          </p>
          <p>
            Environment Clearance Copy of Existing Product:{' '}
            {
              (data as IFactoryLicenseDetails)
                .environmentClearanceCopyOfExistingProduct
            }
          </p>
          <p>
            Warning Notice: {(data as IFactoryLicenseDetails).WarningNotice}
          </p>
          <p>
            Show Cause Notice:{' '}
            {(data as IFactoryLicenseDetails).ShowCauseNotice}
          </p>
          <p>
            Proposed Directions:{' '}
            {(data as IFactoryLicenseDetails).ProposedDirections}
          </p>
          <p>
            Interim Directions:{' '}
            {(data as IFactoryLicenseDetails).InterimDirections}
          </p>
          <p>
            Closure Directions:{' '}
            {(data as IFactoryLicenseDetails).ClosureDirections}
          </p>
        </>
      )}
    </div>
  )
}

export default InspectionView
