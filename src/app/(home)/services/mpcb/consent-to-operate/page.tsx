'use client'
import React from 'react'

import SafetyAuditReportForm from '@/components/forms/safety-audit-report'
import ConsentToOperate from '@/components/forms/consent-to-operate'
type Props = {}

const ConsentToOperatePage = (props: Props) => {
  return (
    <div>
      <ConsentToOperate />
    </div>
  )
}

export default ConsentToOperatePage
