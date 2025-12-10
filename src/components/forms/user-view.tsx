import React, { useEffect, useState, Key } from 'react'
import Link from 'next/link'
import { getAgenciesByUser, getPlanApprovalsByUser, getStabilityCertificatesByUser, getSafetyAuditReportsByUser, getConsentToEstablishByUser, getConsentToOperateByUser, getComplianceReportsByUser } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IPlanApproval } from '@/models/planApproval.model'
import { IStabilityCertificate } from '@/models/stabilityCertificate.model'
import { ISafetyAuditReport } from '@/models/safetyAuditReport.model'
import { IConsentToEstablish } from '@/models/consentToEstablish.model'
import { IConsentToOperate } from '@/models/consentToOperate.model'
import { IComplianceReport } from '@/models/complianceReport.model'
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
  const [planApprovals, setPlanApprovals] = useState<IPlanApproval[]>([])
  const [stabilityCertificates, setStabilityCertificates] = useState<IStabilityCertificate[]>([])
  const [safetyAuditReports, setSafetyAuditReports] = useState<ISafetyAuditReport[]>([])
  const [consentToEstablishDocs, setConsentToEstablishDocs] = useState<IConsentToEstablish[]>([])
  const [consentToOperateDocs, setConsentToOperateDocs] = useState<IConsentToOperate[]>([])
  const [complianceReports, setComplianceReports] = useState<IComplianceReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const [fetchedAgencies, fetchedPlanApprovals, fetchedStabilityCertificates, fetchedSafetyAuditReports, fetchedConsentToEstablish, fetchedConsentToOperate, fetchedComplianceReports] = await Promise.all([
          getAgenciesByUser(userId),
          getPlanApprovalsByUser(userId),
          getStabilityCertificatesByUser(userId),
          getSafetyAuditReportsByUser(userId),
          getConsentToEstablishByUser(userId),
          getConsentToOperateByUser(userId),
          getComplianceReportsByUser(userId)
        ])
        setAgencies(fetchedAgencies)
        setPlanApprovals(fetchedPlanApprovals)
        setStabilityCertificates(fetchedStabilityCertificates)
        setSafetyAuditReports(fetchedSafetyAuditReports)
        setConsentToEstablishDocs(fetchedConsentToEstablish)
        setConsentToOperateDocs(fetchedConsentToOperate)
        setComplianceReports(fetchedComplianceReports)
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

  const renderPlanApprovals = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">
          Your Plan Approvals
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
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
          {planApprovals.map((planApproval) => (
            <TableRow key={planApproval._id as Key} className="border-t">
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
          Your Stability Certificates
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
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
          {stabilityCertificates.map((cert) => (
            <TableRow key={cert._id as Key} className="border-t">
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
          Your Safety Audit Reports
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
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
          {safetyAuditReports.map((report) => (
            <TableRow key={report._id as Key} className="border-t">
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
          Your Consent To Establish Documents
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
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
          {consentToEstablishDocs.map((doc) => (
            <TableRow key={doc._id as Key} className="border-t">
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

  const renderConsentToOperate = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">Your Consent To Operate Documents</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">Status</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">Created Date</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consentToOperateDocs.map((doc) => (
            <TableRow key={doc._id as Key} className="border-t">
              <TableCell className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                  doc.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.status}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {new Date((doc as any).createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Link href={`/inspection-view/consent-to-operate/${doc._id}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderComplianceReports = () => {
    return (
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm font-sora">
        <TableCaption className="text-left text-gray-600 font-light">Your Compliance Reports</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 font-medium text-gray-700">Status</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700">Created Date</TableHead>
            <TableHead className="py-3 px-4 font-medium text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complianceReports.map((report) => (
            <TableRow key={report._id as Key} className="border-t">
              <TableCell className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  report.status === 'approved' ? 'bg-green-100 text-green-800' :
                  report.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </span>
              </TableCell>
              <TableCell className="py-4 px-4 text-gray-600">
                {new Date((report as any).createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <Button className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Link href={`/inspection-view/compliance-report/${report._id}`}>View Details</Link>
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
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Agencies</h2>
        {renderAgencies()}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Plan Approvals</h2>
        {renderPlanApprovals()}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Stability Certificates</h2>
        {renderStabilityCertificates()}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Safety Audit Reports</h2>
        {renderSafetyAuditReports()}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Consent To Establish Documents</h2>
        {renderConsentToEstablish()}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Consent To Operate Documents</h2>
        {renderConsentToOperate()}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Compliance Reports</h2>
        {renderComplianceReports()}
      </div>
    </div>
  )
}

export default UserView
