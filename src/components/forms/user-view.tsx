import React, { useEffect, useState, Key } from 'react'
import Link from 'next/link'
import {
  getAgenciesByUser,
  getPlanApprovalsByUser,
  getStabilityCertificatesByUser,
  getSafetyAuditReportsByUser,
  getConsentToEstablishByUser,
  getConsentToOperateByUser,
  getComplianceReportsByUser
} from '@/lib/queries'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Building2,
  FileCheck2,
  Shield,
  ClipboardCheck,
  Factory,
  Droplets,
  FileBarChart,
  Upload,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react'

type Props = {
  userId: string
}

const UserView: React.FC<Props> = ({ userId }) => {
  const [agencies, setAgencies] = useState<any[]>([])
  const [planApprovals, setPlanApprovals] = useState<any[]>([])
  const [stabilityCertificates, setStabilityCertificates] = useState<any[]>([])
  const [safetyAuditReports, setSafetyAuditReports] = useState<any[]>([])
  const [consentToEstablishDocs, setConsentToEstablishDocs] = useState<any[]>([])
  const [consentToOperateDocs, setConsentToOperateDocs] = useState<any[]>([])
  const [complianceReports, setComplianceReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const [
          fetchedAgencies,
          fetchedPlanApprovals,
          fetchedStabilityCertificates,
          fetchedSafetyAuditReports,
          fetchedConsentToEstablish,
          fetchedConsentToOperate,
          fetchedComplianceReports
        ] = await Promise.all([
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center p-6">Error: {error}</div>
  }

  const totalDocuments =
    agencies.length +
    planApprovals.length +
    stabilityCertificates.length +
    safetyAuditReports.length +
    consentToEstablishDocs.length +
    consentToOperateDocs.length +
    complianceReports.length

  const getStatusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle2 className="w-4 h-4 text-green-600" />
    if (status === 'rejected') return <XCircle className="w-4 h-4 text-red-600" />
    return <Clock className="w-4 h-4 text-yellow-600" />
  }

  const getStatusColor = (status: string) => {
    if (status === 'approved') return 'bg-green-100 text-green-800 border-green-200'
    if (status === 'rejected') return 'bg-red-100 text-red-800 border-red-200'
    return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }

  const DocumentCard = ({ icon: Icon, title, items, type, color }: any) => {
    if (items.length === 0) return null

    return (
      <Card className={`p-6 bg-gradient-to-br ${color} border-2 hover:shadow-xl transition-all duration-300`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white rounded-lg shadow-md">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{items.length} document{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <Link href={`/inspection-view/${type}/${item._id}`}>
                <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 backdrop-blur rounded-xl">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Documents</h1>
            <p className="text-indigo-100 mt-1">
              {totalDocuments > 0
                ? `You have ${totalDocuments} document${totalDocuments !== 1 ? 's' : ''} uploaded`
                : 'Upload your documents to get started'}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {totalDocuments === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-6 bg-indigo-50 rounded-full inline-block mb-6">
              <Upload className="w-16 h-16 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Documents Yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't uploaded any documents yet. Start by submitting your first document through the Services menu.
            </p>
            <Link href="/services">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      {totalDocuments > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DocumentCard
            icon={Building2}
            title="Agency Documents"
            items={agencies}
            type="agency"
            color="from-blue-50 to-cyan-50 border-blue-100"
          />

          <DocumentCard
            icon={FileCheck2}
            title="Plan Approvals"
            items={planApprovals}
            type="plan-approval"
            color="from-green-50 to-emerald-50 border-green-100"
          />

          <DocumentCard
            icon={Shield}
            title="Stability Certificates"
            items={stabilityCertificates}
            type="stability-certificate"
            color="from-purple-50 to-pink-50 border-purple-100"
          />

          <DocumentCard
            icon={ClipboardCheck}
            title="Safety Audit Reports"
            items={safetyAuditReports}
            type="safety-audit-report"
            color="from-orange-50 to-amber-50 border-orange-100"
          />

          <DocumentCard
            icon={Factory}
            title="Consent To Establish"
            items={consentToEstablishDocs}
            type="consent-to-establish"
            color="from-indigo-50 to-blue-50 border-indigo-100"
          />

          <DocumentCard
            icon={Droplets}
            title="Consent To Operate"
            items={consentToOperateDocs}
            type="consent-to-operate"
            color="from-teal-50 to-cyan-50 border-teal-100"
          />

          <DocumentCard
            icon={FileBarChart}
            title="Compliance Reports"
            items={complianceReports}
            type="compliance-report"
            color="from-rose-50 to-pink-50 border-rose-100"
          />
        </div>
      )}
    </div>
  )
}

export default UserView
