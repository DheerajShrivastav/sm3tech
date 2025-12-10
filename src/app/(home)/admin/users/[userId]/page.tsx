'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  getAgenciesByUser,
  getPlanApprovalsByUser,
  getStabilityCertificatesByUser,
  getSafetyAuditReportsByUser,
  getConsentToEstablishByUser,
  getConsentToOperateByUser,
  getComplianceReportsByUser,
  getUser,
  getUserById
} from '@/lib/queries'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  FileText,
  User as UserIcon,
  ArrowLeft,
  Building2,
  FileCheck2,
  Shield,
  ClipboardCheck,
  Factory,
  Droplets,
  FileBarChart
} from 'lucide-react'

export default function UserDocumentsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string

  const [userData, setUserData] = useState<any>(null)
  const [agencies, setAgencies] = useState<any[]>([])
  const [planApprovals, setPlanApprovals] = useState<any[]>([])
  const [stabilityCertificates, setStabilityCertificates] = useState<any[]>([])
  const [safetyAuditReports, setSafetyAuditReports] = useState<any[]>([])
  const [consentToEstablish, setConsentToEstablish] = useState<any[]>([])
  const [consentToOperate, setConsentToOperate] = useState<any[]>([])
  const [complianceReports, setComplianceReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser()
        setCurrentUser(user)

        if (user?.role !== 'Admin') {
          router.push('/inspection-view')
          return
        }

        // Fetch user details using getUserById
        const fetchedUser = await getUserById(userId)
        setUserData(fetchedUser)

        // Fetch all documents for this user
        const [
          agenciesData,
          planApprovalsData,
          stabilityCertificatesData,
          safetyAuditReportsData,
          consentToEstablishData,
          consentToOperateData,
          complianceReportsData
        ] = await Promise.all([
          getAgenciesByUser(userId),
          getPlanApprovalsByUser(userId),
          getStabilityCertificatesByUser(userId),
          getSafetyAuditReportsByUser(userId),
          getConsentToEstablishByUser(userId),
          getConsentToOperateByUser(userId),
          getComplianceReportsByUser(userId)
        ])

        setAgencies(agenciesData || [])
        setPlanApprovals(planApprovalsData || [])
        setStabilityCertificates(stabilityCertificatesData || [])
        setSafetyAuditReports(safetyAuditReportsData || [])
        setConsentToEstablish(consentToEstablishData || [])
        setConsentToOperate(consentToOperateData || [])
        setComplianceReports(complianceReportsData || [])
      } catch (error) {
        console.error('Error fetching user documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (currentUser?.role !== 'Admin') {
    return <div>Unauthorized Access</div>
  }

  const DocumentCard = ({ icon: Icon, title, count, items, type }: any) => (
    <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-sora text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{count} document{count !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'approved' ? 'bg-green-100 text-green-800' :
                  item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Link href={`/inspection-view/${type}/${item._id}`}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  View
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm py-4">No documents submitted</p>
      )}
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-6 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>

        <Card className="bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

          <div className="p-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <UserIcon className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-sora text-gray-900">
                  {userData?.name && userData.name.trim() !== '' && !userData.name.toLowerCase().includes('null')
                    ? userData.name
                    : userData?.email || 'User'}
                </h1>
                <p className="text-gray-600 mt-1">{userData?.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  All submitted documents and forms
                </p>
              </div>
            </div>
          </div>
        </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DocumentCard
          icon={Building2}
          title="Agency Documents"
          count={agencies.length}
          items={agencies}
          type="agency"
        />

        <DocumentCard
          icon={FileCheck2}
          title="Plan Approvals"
          count={planApprovals.length}
          items={planApprovals}
          type="plan-approval"
        />

        <DocumentCard
          icon={Shield}
          title="Stability Certificates"
          count={stabilityCertificates.length}
          items={stabilityCertificates}
          type="stability-certificate"
        />

        <DocumentCard
          icon={ClipboardCheck}
          title="Safety Audit Reports"
          count={safetyAuditReports.length}
          items={safetyAuditReports}
          type="safety-audit-report"
        />

        <DocumentCard
          icon={Factory}
          title="Consent To Establish"
          count={consentToEstablish.length}
          items={consentToEstablish}
          type="consent-to-establish"
        />

        <DocumentCard
          icon={Droplets}
          title="Consent To Operate"
          count={consentToOperate.length}
          items={consentToOperate}
          type="consent-to-operate"
        />

        <DocumentCard
          icon={FileBarChart}
          title="Compliance Reports"
          count={complianceReports.length}
          items={complianceReports}
          type="compliance-report"
        />
      </div>
      </div>
    </div>
  )
}
