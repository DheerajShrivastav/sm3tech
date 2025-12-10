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
    <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{count} document{count !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
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
    <div className="max-w-7xl mx-auto p-6">
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Users
      </Button>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {userData?.name && userData.name.trim() !== '' && !userData.name.toLowerCase().includes('null')
                ? userData.name
                : userData?.email || 'User'}
            </h1>
            <p className="text-gray-600">{userData?.email}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 ml-20">
          All submitted documents and forms
        </p>
      </div>

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
  )
}
