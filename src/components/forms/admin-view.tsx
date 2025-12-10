'use client'
import React, { useEffect, useState, Key } from 'react'
import { getAgencies, getUser, getPlanApprovals, getStabilityCertificates, getSafetyAuditReports, getConsentToEstablishDocuments } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IUser } from '@/models/user.model'
import { IPlanApproval } from '@/models/planApproval.model'
import { IStabilityCertificate } from '@/models/stabilityCertificate.model'
import { ISafetyAuditReport } from '@/models/safetyAuditReport.model'
import { IConsentToEstablish } from '@/models/consentToEstablish.model'
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
  const [planApprovals, setPlanApprovals] = useState<IPlanApproval[] | {} | [{}]>([])
  const [stabilityCertificates, setStabilityCertificates] = useState<IStabilityCertificate[] | {} | [{}]>([])
  const [safetyAuditReports, setSafetyAuditReports] = useState<ISafetyAuditReport[] | {} | [{}]>([])
  const [consentToEstablishDocs, setConsentToEstablishDocs] = useState<IConsentToEstablish[] | {} | [{}]>([])
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
          const [agenciesResponse, planApprovalsResponse, stabilityCertificatesResponse, safetyAuditReportsResponse, consentToEstablishResponse] = await Promise.all([
            getAgencies(),
            getPlanApprovals(),
            getStabilityCertificates(),
            getSafetyAuditReports(),
            getConsentToEstablishDocuments()
          ])
          setAgencies(agenciesResponse)
          setPlanApprovals(planApprovalsResponse)
          setStabilityCertificates(stabilityCertificatesResponse)
          setSafetyAuditReports(safetyAuditReportsResponse)
          setConsentToEstablishDocs(consentToEstablishResponse)
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
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Agency Name
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Agency Email
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Agency Address
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Agency Phone
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">
              Actions
            </TableHead>
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

  const renderPlanApprovals = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">
          List of Plan Approvals
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              User Email
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Status
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Created Date
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(planApprovals as IPlanApproval[]).map((planApproval) => (
            <TableRow key={planApproval._id as Key} className="border-t">
              <TableCell className="py-4 px-4 font-medium text-gray-900">
                {(planApproval.user as any)?.email || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    planApproval.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : planApproval.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {planApproval.status}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {new Date((planApproval as any).createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Link href={`/inspection-view/plan-approval/${planApproval._id}`}>
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

  const renderStabilityCertificates = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">
          List of Stability Certificates
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              User Email
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Status
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Created Date
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(stabilityCertificates as IStabilityCertificate[]).map((cert) => (
            <TableRow key={cert._id as Key} className="border-t">
              <TableCell className="py-4 px-4 font-medium text-gray-900">
                {(cert.user as any)?.email || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    cert.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : cert.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {cert.status}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {new Date((cert as any).createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Link href={`/inspection-view/stability-certificate/${cert._id}`}>
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

  const renderSafetyAuditReports = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">
          List of Safety Audit Reports
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              User Email
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Status
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Created Date
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(safetyAuditReports as ISafetyAuditReport[]).map((report) => (
            <TableRow key={report._id as Key} className="border-t">
              <TableCell className="py-4 px-4 font-medium text-gray-900">
                {(report.user as any)?.email || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    report.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {report.status}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {new Date((report as any).createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Link href={`/inspection-view/safety-audit-report/${report._id}`}>
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

  const renderConsentToEstablish = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">
          List of Consent To Establish Documents
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              User Email
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Status
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">
              Created Date
            </TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(consentToEstablishDocs as IConsentToEstablish[]).map((doc) => (
            <TableRow key={doc._id as Key} className="border-t">
              <TableCell className="py-4 px-4 font-medium text-gray-900">
                {(doc.user as any)?.email || 'N/A'}
              </TableCell>
              <TableCell className="py-4 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    doc.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : doc.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {doc.status}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {new Date((doc as any).createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Link href={`/inspection-view/consent-to-establish/${doc._id}`}>
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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Agencies Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin View: Agencies
        </h2>
        {renderAgencies()}
      </div>

      {/* Plan Approvals Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Plan Approvals
        </h2>
        {renderPlanApprovals()}
      </div>

      {/* Stability Certificates Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Stability Certificates
        </h2>
        {renderStabilityCertificates()}
      </div>

      {/* Safety Audit Reports Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Safety Audit Reports
        </h2>
        {renderSafetyAuditReports()}
      </div>

      {/* Consent To Establish Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Consent To Establish
        </h2>
        {renderConsentToEstablish()}
      </div>
    </div>
  )
}

export default AdminView
