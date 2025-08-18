'use client'
import React from 'react'

import SafetyAuditReport from '@/components/forms/safety-audit-report'
type Props = {}

const factoryLicense = (props: Props) => {
  return (
    <div>
      <SafetyAuditReport />
    </div>
  )
}

export default factoryLicense
